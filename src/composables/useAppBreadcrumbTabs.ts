import type { LabelValue } from '@/types/common';
import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';

export const useAppBreadcrumbTabs = () => {
  const page = usePage();

  // For Inertia.js, we'll get breadcrumbs and tabs from page props or generate them based on the current URL
  const breadcrumbs = computed(() => {
    // Check if breadcrumbs are passed from Laravel controller
    if (page.props.meta && (page.props.meta as any).breadcrumbs) {
      return (page.props.meta as any).breadcrumbs as LabelValue<any>[];
    }

    // Generate default breadcrumbs based on URL
    const url = page.url || '';
    const segments = url.split('/').filter(Boolean);
    const breadcrumbList: LabelValue<any>[] = [
      { label: 'Home', value: '/' }
    ];

    if (segments.length > 0) {
      // Add breadcrumbs based on URL segments
      if (url.includes('/bookmarks')) {
        breadcrumbList.push({ label: 'My Bookmarks', value: '/bookmarks' });
      } else if (url.includes('/dashboard')) {
        breadcrumbList.push({ label: 'Dashboard', value: '/dashboard' });
      }
    }

    return breadcrumbList;
  });

  const tabs = computed(() => {
    // Check if tabs are passed from Laravel controller
    if (page.props.meta && (page.props.meta as any).tabs) {
      return (page.props.meta as any).tabs as LabelValue<any>[];
    }

    // Return empty array if no tabs are defined
    return [] as LabelValue<any>[];
  });

  return {
    breadcrumbs,
    tabs
  }
};
