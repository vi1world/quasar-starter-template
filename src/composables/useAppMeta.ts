import { ref } from 'vue';
import { usePage } from '@inertiajs/vue3';
import { useMeta } from 'quasar';
import { useLang } from './useLang';
import type { UseMetaOptions } from '@/types/common';
export const useAppMeta = (options?: UseMetaOptions) => {
  const { t } = useLang();
  const page = usePage();

  // Get meta from Inertia page props instead of Vue Router
  const meta = page.props.meta as any;
  const title = ref(
    meta?.pageName
      ? t(`${meta.pageName}`) +
      `${options && options.additionalTitle
        ? ' - ' + options.additionalTitle
        : ''
      }`
      : meta?.title || t('app.name')
  );
  // if (route.meta.pageName && !options?.manualSet) {
  //   useMeta({
  //     title:
  //       t(`${route.meta.pageName}`) +
  //       `${
  //         options && options.additionalTitle
  //           ? ' - ' + options.additionalTitle
  //           : ''
  //       }`,
  //   });
  // }
  useMeta(() => {
    return {
      title: title.value,
    };
  });

  const setTitle = (message: string) => {
    // useMeta({
    //   title: title,
    // });
    title.value = message;
  };
  return {
    setTitle,
  };
};
