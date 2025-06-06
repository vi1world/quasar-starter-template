import { inject } from 'vue';
import { isMobileApp } from './useSmartForm';

// Smart navigation that works in both web and mobile contexts
export function useSmartNavigation() {
  
  const navigateTo = (route: string, fallbackUrl?: string) => {
    if (isMobileApp()) {
      // Mobile app - use Vue Router
      const router = inject('router') as any;
      if (router && typeof router.push === 'function') {
        console.log('Using Vue Router to navigate to:', route);
        router.push(route);
      } else {
        console.log('Fallback: Using hash navigation to:', route);
        window.location.hash = `#${route}`;
      }
    } else {
      // Web app - use regular navigation
      const url = fallbackUrl || route;
      console.log('Using regular navigation to:', url);
      window.location.href = url;
    }
  };

  return {
    navigateTo,
    isMobileApp: isMobileApp()
  };
}
