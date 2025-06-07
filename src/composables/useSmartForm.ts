import { reactive } from 'vue';
// import { useForm as useInertiaForm } from '@inertiajs/vue3';
import { useForm as useMobileForm } from '@/services/inertia-mobile-adapter';

// Environment detection
function isMobileApp(): boolean {
  // Check if we're in Tauri context
  if (typeof window !== 'undefined' && (window as any).__TAURI__) {
    return true;
  }

  // Check if we're using hash routing (mobile app indicator)
  if (typeof window !== 'undefined' && window.location.hash) {
    return true;
  }

  // Check for mobile app specific markers
  if (typeof window !== 'undefined' && window.location.port === '9001') {
    return true;
  }

  return false;
}

// Smart useForm that switches between Inertia and mobile API
export function useSmartForm(initialData: Record<string, any>) {
  const isMobile = isMobileApp();

  console.log('useSmartForm - Environment detected:', isMobile ? 'Mobile App' : 'Web App');

  // For mobile builds, always use mobile adapter
  console.log('Using mobile adapter for form handling');
  return useMobileForm(initialData);
}

// Export environment detection for other components
export { isMobileApp };
