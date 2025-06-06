// Compatibility layer for Inertia.js that works in both web and mobile contexts
import { inject } from 'vue';

// Check if we're in a mobile/Tauri environment
const isMobileApp = () => {
  return typeof window !== 'undefined' && 
         (window.__TAURI__ || 
          window.location.protocol === 'tauri:' ||
          window.navigator.userAgent.includes('Tauri'));
};

// Check if Inertia.js is available (web environment)
const isInertiaAvailable = () => {
  try {
    // Try to import Inertia - this will fail in mobile context
    require('@inertiajs/vue3');
    return true;
  } catch {
    return false;
  }
};

// Universal useForm that works in both environments
export function useForm(initialData: Record<string, any>) {
  if (isMobileApp() || !isInertiaAvailable()) {
    // Use mobile adapter
    const mobileUseForm = inject('useForm');
    if (mobileUseForm && typeof mobileUseForm === 'function') {
      return mobileUseForm(initialData);
    }
    
    // Fallback if injection fails
    console.warn('Mobile useForm not available, using fallback');
    return createFallbackForm(initialData);
  } else {
    // Use real Inertia.js in web environment
    try {
      const { useForm: inertiaUseForm } = require('@inertiajs/vue3');
      return inertiaUseForm(initialData);
    } catch (error) {
      console.warn('Inertia.js not available, using fallback');
      return createFallbackForm(initialData);
    }
  }
}

// Universal usePage that works in both environments
export function usePage() {
  if (isMobileApp() || !isInertiaAvailable()) {
    // Use mobile adapter
    const mobileUsePage = inject('usePage');
    if (mobileUsePage && typeof mobileUsePage === 'function') {
      return mobileUsePage();
    }
    
    // Fallback
    return {
      props: { value: {} },
      url: { value: window.location?.href || '' },
      component: { value: '' },
      version: { value: '1.0.0' }
    };
  } else {
    // Use real Inertia.js in web environment
    try {
      const { usePage: inertiaUsePage } = require('@inertiajs/vue3');
      return inertiaUsePage();
    } catch (error) {
      console.warn('Inertia.js not available, using fallback');
      return {
        props: { value: {} },
        url: { value: window.location?.href || '' },
        component: { value: '' },
        version: { value: '1.0.0' }
      };
    }
  }
}

// Fallback form implementation
function createFallbackForm(initialData: Record<string, any>) {
  const { reactive } = require('vue');
  
  return reactive({
    ...initialData,
    processing: false,
    errors: {} as Record<string, string>,
    
    reset(...fields: string[]) {
      if (fields.length === 0) {
        Object.keys(initialData).forEach(key => {
          (this as any)[key] = initialData[key];
        });
      } else {
        fields.forEach(field => {
          if (field in initialData) {
            (this as any)[field] = initialData[field];
          }
        });
      }
      this.errors = {};
    },
    
    async post(url: string, options: any = {}) {
      this.processing = true;
      this.errors = {};
      
      try {
        // Simple fetch implementation
        const formData: Record<string, any> = {};
        Object.keys(this).forEach(key => {
          if (key !== 'processing' && key !== 'errors' && typeof (this as any)[key] !== 'function') {
            formData[key] = (this as any)[key];
          }
        });
        
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
          body: JSON.stringify(formData),
        });
        
        if (!response.ok) {
          if (response.status === 422) {
            const errorData = await response.json();
            if (errorData.errors) {
              this.errors = errorData.errors;
            }
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (options.onFinish) {
          options.onFinish();
        }
        
        if (options.onSuccess) {
          options.onSuccess(result);
        }
        
        // Handle redirect
        if (result.redirect) {
          window.location.href = result.redirect;
        }
        
      } catch (error) {
        console.error('Form submission error:', error);
        
        if (options.onError) {
          options.onError(error);
        }
      } finally {
        this.processing = false;
      }
    }
  });
}

// Export environment detection utilities
export { isMobileApp, isInertiaAvailable };
