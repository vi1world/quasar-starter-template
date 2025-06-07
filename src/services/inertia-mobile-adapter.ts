import { reactive, ref } from 'vue';
import { apiService } from './api';

// Mobile adapter for Inertia.js functionality
// This allows the same Vue components to work in both web and mobile contexts

interface InertiaForm {
  [key: string]: any;
  processing: boolean;
  errors: Record<string, string>;
  reset: (...fields: string[]) => void;
  post: (url: string, options?: any) => Promise<void>;
}

// Create a form that mimics Inertia.js useForm
export function useForm(initialData: Record<string, any>): InertiaForm {
  const form = reactive({
    ...initialData,
    processing: false,
    errors: {} as Record<string, string>,

    reset(...fields: string[]) {
      if (fields.length === 0) {
        // Reset all fields to initial values
        Object.keys(initialData).forEach(key => {
          (form as any)[key] = initialData[key];
        });
      } else {
        // Reset specific fields
        fields.forEach(field => {
          if (field in initialData) {
            (form as any)[field] = initialData[field];
          }
        });
      }
      form.errors = {};
    },

    async post(url: string, options: any = {}) {
      form.processing = true;
      form.errors = {};

      try {
        // Extract form data (excluding methods and processing state)
        const formData: Record<string, any> = {};
        Object.keys(form).forEach(key => {
          if (key !== 'processing' && key !== 'errors' && typeof (form as any)[key] !== 'function') {
            formData[key] = (form as any)[key];
          }
        });

        let response;

        // Use the appropriate API method based on URL
        if (url.includes('/register')) {
          response = await apiService.submitRegistration(formData);
        } else if (url.includes('/login')) {
          response = await apiService.login(formData);
        } else {
          // Generic POST request
          response = await apiService.post(url, formData);
        }

        // Handle success
        if (options.onFinish) {
          options.onFinish();
        }

        if (options.onSuccess) {
          options.onSuccess(response);
        }

        // If there's a redirect in the response, handle it
        if (response && typeof response === 'object' && 'redirect' in response) {
          console.log('Login successful, redirect to:', response.redirect);

          if (response.success) {
            console.log('User authenticated:', response.user);
            console.log('OAuth token available:', (response as any).oauth_token ? 'Yes' : 'No');

            // Store authentication data for persistence
            if (response.user) {
              localStorage.setItem('mobile_auth', JSON.stringify(response.user));
              console.log('Stored user data in localStorage');
            }

            if ((response as any).oauth_token) {
              localStorage.setItem('oauth_token', (response as any).oauth_token);
              console.log('Stored OAuth token in localStorage');
            }

            // Navigate to dashboard within mobile app (stay in Tauri)
            console.log('Navigating to dashboard within mobile app (staying in Tauri)');
            if (typeof window !== 'undefined') {
              try {
                // Fetch dashboard data from the same DashboardController as web
                console.log('Fetching dashboard data from API...');
                apiService.getDashboardData().then((dashboardResponse) => {
                  console.log('Dashboard data received:', dashboardResponse);

                  // Store dashboard data for the feed layout
                  localStorage.setItem('mobile_dashboard_data', JSON.stringify(dashboardResponse));

                  // Navigate to dashboard within mobile app using hash
                  console.log('Navigating to dashboard hash within mobile app');
                  window.location.hash = '#/dashboard';

                  // Force page reload to load the dashboard with data
                  setTimeout(() => {
                    window.location.reload();
                  }, 100);

                }).catch((error) => {
                  console.error('Failed to fetch dashboard data:', error);
                  // Fallback: redirect to web dashboard
                  console.log('Fallback: redirecting to web dashboard');
                  window.location.href = 'http://my.localhost:8000/dashboard';
                });

              } catch (error) {
                console.error('Error in dashboard navigation:', error);
                // Fallback to regular web navigation
                console.log('Fallback: redirecting to web dashboard');
                window.location.href = 'http://my.localhost:8000/dashboard';
              }
            }
          }
        }

      } catch (error: any) {
        console.error('Form submission error:', error);

        // Handle validation errors
        if (error.response?.status === 422 && error.response?.data?.errors) {
          form.errors = error.response.data.errors;
        } else if (error.response?.data?.message) {
          form.errors.general = error.response.data.message;
        } else {
          form.errors.general = 'An error occurred. Please try again.';
        }

        if (options.onError) {
          options.onError(error);
        }

      } finally {
        form.processing = false;
      }
    }
  });

  return form as InertiaForm;
}

// Mock Inertia object for mobile
export const Inertia = {
  visit(url: string, options: any = {}) {
    // In mobile context, we handle navigation differently
    console.log('Inertia.visit called:', url, options);

    // You could use Vue Router here instead
    if (typeof window !== 'undefined' && window.location) {
      window.location.href = url;
    }
  },

  post(url: string, data: any = {}, options: any = {}) {
    // Handle POST requests
    return apiService.post(url, data);
  },

  get(url: string, data: any = {}, options: any = {}) {
    // Handle GET requests
    return apiService.get(url);
  }
};

// Page props management for mobile
const pageProps = ref({});

export function usePage() {
  // Check if we have dashboard data stored
  if (typeof window !== 'undefined') {
    const dashboardData = localStorage.getItem('mobile_dashboard_data');
    if (dashboardData && window.location.hash.includes('dashboard')) {
      try {
        const parsedData = JSON.parse(dashboardData);
        if (parsedData.props) {
          pageProps.value = parsedData.props;
          console.log('usePage: Using dashboard data from localStorage:', parsedData.props);
        }
      } catch (error) {
        console.error('Error parsing dashboard data:', error);
      }
    }
  }

  return {
    props: pageProps,
    url: ref(window.location?.href || ''),
    component: ref(''),
    version: ref('1.0.0')
  };
}

// Initialize page props from API
export async function initializePage(route: string) {
  try {
    let response;

    if (route.includes('/register')) {
      response = await apiService.getRegistrationData();
    } else {
      response = await apiService.getPageData(route);
    }

    if (response.props) {
      pageProps.value = response.props;
    }

    return response;
  } catch (error) {
    console.error('Failed to initialize page:', error);

    // Return default props for development when backend is not available
    const defaultProps = {
      appName: 'Gush Zone',
      appLogo: '/logo/logo-black.png',
      loginLeftImage: '',
      googleLoginStatus: 0,
      facebookLoginStatus: 0,
    };

    pageProps.value = defaultProps;
    return { props: defaultProps };
  }
}

// Mock router for mobile
export const router = {
  visit(url: string, options: any = {}) {
    console.log('router.visit called:', url, options);
    if (typeof window !== 'undefined') {
      if (options.replace) {
        window.location.replace(url);
      } else {
        window.location.href = url;
      }
    }
  },

  post(url: string, data: any = {}, options: any = {}) {
    return apiService.post(url, data);
  },

  get(url: string, data: any = {}, options: any = {}) {
    return apiService.get(url);
  }
};

// Mock createInertiaApp for mobile
export function createInertiaApp(config: any) {
  console.log('createInertiaApp called in mobile context:', config);
  // Return a mock app setup for mobile
  return {
    setup: config.setup || (() => {}),
    el: config.el || '#app',
    App: config.App
  };
}

// Export for global use
export default {
  useForm,
  Inertia,
  usePage,
  initializePage,
  router,
  createInertiaApp
};
