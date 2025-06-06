import { createApp, h, ref } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
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

// Import auth components
import AggregationRegister from './pages/auth/AggregationRegister.vue';
import AggregationLogin from './pages/auth/AggregationLogin.vue';

// Import API service for mobile
import { apiService } from './services/api';

// Import Inertia adapter for mobile
import inertiaAdapter from './services/inertia-mobile-adapter';

const messages = { en };

// Create router for mobile app
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'register',
            component: AggregationRegister,
            meta: { requiresAuth: false }
        },
        // Add more routes as needed when you create them
        // {
        //     path: '/dashboard',
        //     name: 'dashboard',
        //     component: () => import('./pages/dashboard/Index.vue'),
        //     meta: { requiresAuth: true }
        // }
    ]
});

// Router navigation guard to initialize page data
router.beforeEach(async (_to, _from, next) => {
    // Skip API calls for now and use default props
    const defaultProps = {
        appName: 'Gush Zone',
        appLogo: '/logo/logo-black.png',
        loginLeftImage: '',
        googleLoginStatus: 0,
        facebookLoginStatus: 0,
    };

    // Set default props directly
    const { usePage } = inertiaAdapter;
    const page = usePage();
    if (page.props) {
        page.props.value = defaultProps;
    }

    next(); // Continue navigation
});

// Navigation guard for authentication
router.beforeEach(async (to, _from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth) {
        const isAuthenticated = await apiService.checkAuth();
        if (!isAuthenticated) {
            next({ name: 'register' });
            return;
        }
    }

    next();
});

// Create Pinia store
const pinia = createPinia();

// Create i18n instance
const i18n = createI18n({
    locale: Cookies.get(LocaleKey) || DefaultLocale,
    legacy: false,
    messages,
});

// Simple component switcher based on hash
const currentRoute = ref(window.location.hash.replace('#', '') || '/');

// Listen for hash changes
window.addEventListener('hashchange', () => {
    currentRoute.value = window.location.hash.replace('#', '') || '/';
});

const AppComponent = {
    setup() {
        return { currentRoute };
    },
    render() {
        if (currentRoute.value === '/login') {
            return h(AggregationLogin);
        } else {
            return h(AggregationRegister);
        }
    }
};

// Create and mount the app
const app = createApp(AppComponent)
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

app.mount('#app');
