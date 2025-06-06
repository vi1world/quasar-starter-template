import { Cookies } from 'quasar';

// API Configuration
function getApiBaseUrl(): string {
    // Check if running in Tauri (native app)
    if (typeof window !== 'undefined' && (window as any).__TAURI__) {
        // For Tauri Android, use the computer's IP address
        // Using the detected IP address for this network
        return import.meta.env.VITE_API_BASE_URL || 'http://172.16.0.2:8000';
    }

    // For web browser (development)
    return import.meta.env.VITE_API_BASE_URL || 'http://my.localhost:8000';
}

const API_BASE_URL = getApiBaseUrl();
const TOKEN_KEY = 'auth_token';

interface ApiResponse<T = any> {
    component?: string;
    props?: T;
    data?: T;
    message?: string;
    errors?: Record<string, string[]>;
    redirect?: string;
    user?: any;
}

class ApiService {
    private baseURL: string;

    constructor() {
        this.baseURL = API_BASE_URL;
    }

    private getToken(): string | null {
        return Cookies.get(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY);
    }

    private setToken(token: string): void {
        Cookies.set(TOKEN_KEY, token, { expires: 30 }); // 30 days
        localStorage.setItem(TOKEN_KEY, token);
    }

    private removeToken(): void {
        Cookies.remove(TOKEN_KEY);
        localStorage.removeItem(TOKEN_KEY);
    }

    private getCSRFToken(): string | null {
        // Try to get CSRF token from meta tag (if available)
        if (typeof document !== 'undefined') {
            const metaTag = document.querySelector('meta[name="csrf-token"]');
            if (metaTag) {
                return metaTag.getAttribute('content');
            }
        }

        // Try to get from cookies (multiple possible names)
        const xsrfToken = Cookies.get('XSRF-TOKEN');
        if (xsrfToken) {
            // XSRF-TOKEN is usually base64 encoded, decode it
            try {
                return decodeURIComponent(xsrfToken);
            } catch {
                return xsrfToken;
            }
        }

        // Try other common CSRF cookie names
        return Cookies.get('laravel_session') ||
               Cookies.get('csrf_token') ||
               null;
    }

    private async request<T = any>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<ApiResponse<T>> {
        const url = `${this.baseURL}${endpoint}`;
        const token = this.getToken();

        const defaultHeaders: Record<string, string> = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        };

        if (token) {
            defaultHeaders['Authorization'] = `Bearer ${token}`;
        }

        // Add OAuth token if available (for mobile authentication)
        const oauthToken = localStorage.getItem('oauth_token');
        if (oauthToken && !token) {
            defaultHeaders['Authorization'] = `Bearer ${oauthToken}`;
            console.log('Added OAuth token to request headers');
        }

        // Add CSRF token for Laravel
        const csrfToken = this.getCSRFToken();
        if (csrfToken) {
            defaultHeaders['X-CSRF-TOKEN'] = csrfToken;
        }

        const config: RequestInit = {
            ...options,
            headers: {
                ...defaultHeaders,
                ...options.headers,
            },
            credentials: 'include',
        };

        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                if (response.status === 401) {
                    this.removeToken();
                    throw new Error('Authentication required');
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    // Authentication methods
    async login(credentials: any): Promise<ApiResponse> {
        console.log('Starting mobile login process...');

        // Use the dedicated mobile API authentication endpoint
        console.log('Making mobile login request to:', `${this.baseURL}/api/mobile/auth/login`);

        const response = await this.request('/api/mobile/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        });

        // Handle mobile API response with Sanctum token
        if ((response as any).token) {
            console.log('Mobile login successful, storing token');
            localStorage.setItem('oauth_token', (response as any).token);
            localStorage.setItem('mobile_auth', JSON.stringify((response as any).user));
        }

        return response;
    }

    async logout(): Promise<void> {
        try {
            await this.request('/api/auth/logout', { method: 'POST' });
        } finally {
            this.removeToken();
        }
    }

    async checkAuth(): Promise<boolean> {
        try {
            // First check if we have stored authentication data
            const storedAuth = localStorage.getItem('mobile_auth');
            const storedToken = localStorage.getItem('oauth_token');

            if (storedAuth && storedToken) {
                console.log('Found stored authentication data');

                // Test if the token is actually valid by making an API call
                try {
                    console.log('Testing OAuth token validity...');
                    await this.request('/api/mobile/dashboard');
                    console.log('OAuth token is valid');
                    return true;
                } catch (error) {
                    console.log('OAuth token test failed:', error);
                    // Token is invalid, clear stored data
                    localStorage.removeItem('mobile_auth');
                    localStorage.removeItem('oauth_token');
                    return false;
                }
            }

            // Fallback: check with server
            await this.request('/api/auth/user');
            return true;
        } catch {
            console.log('Auth check failed');
            return false;
        }
    }

    // Page data methods (mimicking Inertia.js)
    async getPageData(page: string): Promise<ApiResponse> {
        return this.request(`/api/pages/${page}`);
    }

    // Get dashboard data (existing mobile API endpoint with OAuth)
    async getDashboardData(): Promise<ApiResponse> {
        return this.request('/api/mobile/dashboard', {
            method: 'GET',
        });
    }

    // Registration methods
    async getRegistrationData(): Promise<ApiResponse> {
        return this.request('/api/user-aggregation/register/create');
    }

    async submitRegistration(data: any): Promise<ApiResponse> {
        return this.request('/api/user-aggregation/register', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    // Generic CRUD methods
    async get<T = any>(endpoint: string): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint);
    }

    async post<T = any>(endpoint: string, data: any): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async put<T = any>(endpoint: string, data: any): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    async delete<T = any>(endpoint: string): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: 'DELETE',
        });
    }

    // File upload method
    async uploadFile(endpoint: string, file: File, additionalData?: Record<string, any>): Promise<ApiResponse> {
        const formData = new FormData();
        formData.append('file', file);

        if (additionalData) {
            Object.entries(additionalData).forEach(([key, value]) => {
                formData.append(key, value);
            });
        }

        const token = this.getToken();
        const headers: Record<string, string> = {
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method: 'POST',
            headers,
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Upload failed: ${response.status}`);
        }

        return response.json();
    }
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService;
