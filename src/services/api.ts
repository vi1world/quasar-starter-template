import axios from 'axios';

// Configure axios defaults for mobile app
axios.defaults.headers.common['X-App-Type'] = 'mobile';
axios.defaults.headers.common['X-Requested-With'] = 'TauriApp';
axios.defaults.headers.common['Accept'] = 'application/json';

// API service for mobile adapter compatibility
export const apiService = {
  async login(formData: any) {
    try {
      const response = await axios.post('/login', formData, {
        headers: {
          'X-App-Type': 'mobile',
          'X-Requested-With': 'TauriApp',
          'Accept': 'application/json'
        }
      });
      return response.data;
    } catch (error: any) {
      console.error('Login API error:', error);
      throw error;
    }
  },

  async submitRegistration(formData: any) {
    try {
      const response = await axios.post('/register', formData);
      return response.data;
    } catch (error: any) {
      console.error('Registration API error:', error);
      throw error;
    }
  },

  async post(url: string, data: any) {
    try {
      const response = await axios.post(url, data);
      return response.data;
    } catch (error: any) {
      console.error('POST API error:', error);
      throw error;
    }
  },

  async get(url: string) {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error: any) {
      console.error('GET API error:', error);
      throw error;
    }
  },

  async getDashboardData() {
    try {
      const response = await axios.get('/dashboard');
      return response.data;
    } catch (error: any) {
      console.error('Dashboard API error:', error);
      throw error;
    }
  },

  async getRegistrationData() {
    try {
      const response = await axios.get('/register');
      return response.data;
    } catch (error: any) {
      console.error('Registration data API error:', error);
      throw error;
    }
  },

  async getPageData(route: string) {
    try {
      const response = await axios.get(route);
      return response.data;
    } catch (error: any) {
      console.error('Page data API error:', error);
      throw error;
    }
  }
};

export default apiService;
