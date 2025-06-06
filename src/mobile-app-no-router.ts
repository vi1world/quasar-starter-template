import { createApp, h } from 'vue';
import { Quasar, Loading, Notify, Dialog, Meta, Cookies, LoadingBar, LocalStorage } from 'quasar';

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/bootstrap-icons/bootstrap-icons.css';

// Import Quasar css
import 'quasar/src/css/index.sass';
import './css/app.scss';

// Import template dependencies
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import en from './i18n/en';
import { DefaultLocale, LocaleKey } from './libs/constant';

// Import components
import AggregationRegister from './pages/auth/AggregationRegister.vue';
import AggregationLogin from './pages/auth/AggregationLogin.vue';
import FeedLayout from './layouts/feed.vue';

// Import Inertia adapter for mobile
import inertiaAdapter from './services/inertia-mobile-adapter';

const messages = { en };

console.log('Starting mobile app without router...');
console.log('Available messages:', Object.keys(messages));
console.log('English messages structure:', Object.keys(messages.en || {}));
console.log('Error messages available:', !!messages.en?.error);
console.log('validateRequireField available:', !!messages.en?.error?.validateRequireField);

// Create Pinia store
const pinia = createPinia();

// Create i18n instance
// Force English locale for mobile app since we only have English messages loaded
const mobileLocale = 'en';
console.log('Setting mobile app locale to:', mobileLocale);

const i18n = createI18n({
    locale: mobileLocale,
    legacy: false,
    messages,
});

// Set up default props for the component
const defaultProps = {
    appName: 'Gush Zone',
    appLogo: '/logo/logo-black.png',
    loginLeftImage: '',
    googleLoginStatus: 0,
    facebookLoginStatus: 0,
};

// Create wrapper component that handles simple routing based on hash
const AppWrapper = {
    components: {
        AggregationRegister,
        AggregationLogin,
        FeedLayout
    },
    template: `
        <div id="app-wrapper">
            <AggregationRegister
                v-if="currentRoute === 'register'"
                :appName="props.appName"
                :appLogo="props.appLogo"
                :loginLeftImage="props.loginLeftImage"
                :googleLoginStatus="props.googleLoginStatus"
                :facebookLoginStatus="props.facebookLoginStatus"
            />
            <AggregationLogin
                v-else-if="currentRoute === 'login'"
                :appName="props.appName"
                :appLogo="props.appLogo"
                :loginLeftImage="props.loginLeftImage"
                :googleLoginStatus="props.googleLoginStatus"
                :facebookLoginStatus="props.facebookLoginStatus"
            />
            <FeedLayout
                v-else-if="currentRoute === 'dashboard'"
            />
            <AggregationRegister
                v-else
                :appName="props.appName"
                :appLogo="props.appLogo"
                :loginLeftImage="props.loginLeftImage"
                :googleLoginStatus="props.googleLoginStatus"
                :facebookLoginStatus="props.facebookLoginStatus"
            />
        </div>
    `,
    data() {
        return {
            props: defaultProps,
            currentRoute: 'register'
        };
    },
    mounted() {
        console.log('AppWrapper mounted with props:', (this as any).props);
        (this as any).updateRoute();

        // Listen for hash changes
        window.addEventListener('hashchange', (this as any).updateRoute);
    },
    beforeUnmount() {
        window.removeEventListener('hashchange', (this as any).updateRoute);
    },
    methods: {
        updateRoute() {
            const hash = window.location.hash.replace('#/', '');
            console.log('Current hash:', hash);

            if (hash === 'login') {
                (this as any).currentRoute = 'login';
            } else if (hash === 'dashboard') {
                (this as any).currentRoute = 'dashboard';
            } else {
                (this as any).currentRoute = 'register';
            }

            console.log('Current route set to:', (this as any).currentRoute);
        }
    }
};

console.log('Creating Vue app...');

// Create and mount the app
const app = createApp(AppWrapper)
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

// Global error handler
app.config.errorHandler = (err, _vm, info) => {
    console.error('Global error:', err, info);
    Notify.create({
        type: 'negative',
        message: 'An error occurred. Please try again.',
        position: 'top'
    });
};

// Add Inertia adapter as global properties for mobile compatibility
app.config.globalProperties.$inertia = inertiaAdapter.Inertia;
app.config.globalProperties.$page = inertiaAdapter.usePage();

// Provide Inertia functions globally
app.provide('useForm', inertiaAdapter.useForm);
app.provide('usePage', inertiaAdapter.usePage);

console.log('Mounting Vue app...');
app.mount('#app');
console.log('Vue app mounted successfully!');
