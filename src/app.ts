import '../../resources/js/bootstrap-inertia';
import '../../resources/js/error-handler';
import { createApp, h, DefineComponent } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';

import { Quasar, Loading, Notify, Dialog, Meta, Cookies, LoadingBar, LocalStorage } from 'quasar';

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/bootstrap-icons/bootstrap-icons.css';

// Import Quasar css
import 'quasar/src/css/index.sass';

// Import modern design system with Tailwind CSS
import './css/tailwind.css';

// Import template dependencies
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import en from './i18n/en';
import { DefaultLocale, LocaleKey } from './libs/constant';

// Create messages object with all translation files
const messages = {
    en
};

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title: string) => `${title} - ${appName}`,
    resolve: async (name: string) => {
        // Try to resolve from pages first
        const pages = import.meta.glob<DefineComponent>('./pages/**/*.vue');

        // Special handling for auth/login - use working login page
        if (name === 'auth/login') {
            const loginPageLoader = pages['./pages/auth/login.vue'];
            if (loginPageLoader) {
                const loginPage = await loginPageLoader();
                const layouts = import.meta.glob<DefineComponent>('./layouts/**/*.vue');
                const blankLayoutLoader = layouts['./layouts/blank.vue'];
                if (blankLayoutLoader) {
                    const blankLayout = await blankLayoutLoader();
                    loginPage.default.layout = blankLayout.default;
                }
                return loginPage;
            }
        }

        const pagePath = `./pages/${name}.vue`;

        if (pages[pagePath]) {
            const page = await pages[pagePath]();

            // Auto-assign layout based on page path
            if (name.startsWith('alumni/')) {
                const layouts = import.meta.glob<DefineComponent>('./layouts/**/*.vue');
                const alumniLayout = await layouts['./layouts/alumni.vue']();
                page.default.layout = alumniLayout.default;
            } else if (name.startsWith('admin/')) {
                const layouts = import.meta.glob<DefineComponent>('./layouts/**/*.vue');
                const adminLayout = await layouts['./layouts/admin.vue']();
                page.default.layout = adminLayout.default;
            } else if (name.startsWith('super-admin/')) {
                const layouts = import.meta.glob<DefineComponent>('./layouts/**/*.vue');
                const adminLayout = await layouts['./layouts/admin.vue']();
                page.default.layout = adminLayout.default;
            } else if (name.startsWith('auth/')) {
                // Auth pages (login, register, etc.) use a blank layout
                const layouts = import.meta.glob<DefineComponent>('./layouts/**/*.vue');
                const blankLayoutLoader = layouts['./layouts/blank.vue'];
                if (blankLayoutLoader) {
                    const blankLayout = await blankLayoutLoader();
                    page.default.layout = blankLayout.default;
                }
            }

            return page;
        }

        // Try to resolve from layouts
        const layouts = import.meta.glob<DefineComponent>('./layouts/**/*.vue');
        const layoutPath = `./layouts/${name}.vue`;

        if (layouts[layoutPath]) {
            return layouts[layoutPath]();
        }

        // Fallback: throw error if page not found
        throw new Error(`Page not found: ${name}`);
    },
    setup({ el, App, props, plugin }) {
        // Create Pinia store
        const pinia = createPinia();

        // Create i18n instance (same as boot/i18n.ts)
        console.log('i18n messages:', messages);
        console.log('en messages:', messages.en);
        if (messages.en) {
            console.log('en.base:', messages.en.base);
        }

        const i18n = createI18n({
            locale: Cookies.get(LocaleKey) || DefaultLocale,
            legacy: false,
            messages,
        });

        const app = createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(pinia)
            .use(i18n)
            .use(Quasar, {
                plugins: {
                    Loading,
                    Notify,
                    Dialog,
                    Meta,
                    Cookies,
                    LoadingBar,
                    LocalStorage
                },
                config: {
                    brand: {
                        primary: '#1976D2',
                        secondary: '#26A69A',
                        accent: '#9C27B0',
                        dark: '#1D1D1D',
                        positive: '#21BA45',
                        negative: '#C10015',
                        info: '#31CCEC',
                        warning: '#F2C037'
                    }
                }
            });

        app.mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});
