import { createApp, h } from 'vue';
import { createRouter, createWebHashHistory, RouterView } from 'vue-router';
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

// Import existing feed layout (same as web dashboard)
import FeedLayout from './layouts/feed.vue';

// Import API service for mobile
import { apiService } from './services/api';

// Import Inertia adapter for mobile
import inertiaAdapter from './services/inertia-mobile-adapter';

const messages = { en };

console.log('Starting mobile app with Vue Router...');

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
        {
            path: '/login',
            name: 'login',
            component: AggregationLogin,
            meta: { requiresAuth: false }
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: FeedLayout,
            meta: { requiresAuth: false } // Temporarily disable auth requirement for testing
        }
    ]
});

// Router navigation guard to initialize page data
router.beforeEach(async (to, _from, next) => {
    try {
        let pageData;

        if (to.path === '/dashboard') {
            // Fetch dashboard data from API (same as DashboardController)
            console.log('Fetching dashboard data from API...');
            pageData = await apiService.getDashboardData();
            console.log('Dashboard data received:', pageData);
        } else {
            // Use default props for auth pages
            pageData = {
                props: {
                    appName: 'Gush Zone',
                    appLogo: '/logo/logo-black.png',
                    loginLeftImage: '',
                    googleLoginStatus: 0,
                    facebookLoginStatus: 0,
                }
            };
        }

        // Set page props
        const { usePage } = inertiaAdapter;
        const page = usePage();
        if (page.props && pageData.props) {
            page.props.value = pageData.props;
        }

        next(); // Continue navigation
    } catch (error) {
        console.error('Failed to load page data:', error);

        // For dashboard, redirect to login if unauthorized
        if (to.path === '/dashboard') {
            next('/login');
        } else {
            next(); // Continue with default props
        }
    }
});

// Navigation guard for authentication (temporarily disabled for testing)
router.beforeEach(async (to, _from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth) {
        // Temporarily skip auth check for testing dashboard functionality
        console.log('Auth guard: Skipping authentication check for testing');
        // const isAuthenticated = await apiService.checkAuth();
        // if (!isAuthenticated) {
        //     next({ name: 'register' });
        //     return;
        // }
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

// Main App component with router-view
const AppComponent = {
    render() {
        return h('div', { id: 'mobile-app' }, [
            h('div', {
                style: {
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    background: 'red',
                    color: 'white',
                    padding: '5px',
                    zIndex: '9999',
                    fontSize: '12px'
                }
            }, `Route: ${this.$route.path} | Hash: ${window.location.hash}`),
            h(RouterView)
        ]);
    },
    mounted() {
        console.log('🔍 AppComponent mounted, current route:', this.$route.path);
        console.log('🔍 Current hash:', window.location.hash);
        console.log('🔍 Router instance:', this.$router);
    }
};

console.log('Creating Vue app with router...');

// Create and mount the app
const app = createApp(AppComponent)
.use(pinia)
.use(i18n)
.use(router)
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

// Provide router globally for components
app.provide('router', router);

// Make router globally accessible for mobile adapter
(window as any).router = router;

console.log('Mounting Vue app with router...');
app.mount('#app');
console.log('Vue app with router mounted successfully!');

// Debug: Check initial route and listen for hash changes
console.log('🔍 Initial hash:', window.location.hash);
console.log('🔍 Initial router current route:', router.currentRoute.value);

// Listen for hash changes
window.addEventListener('hashchange', () => {
    console.log('🔍 Hash changed to:', window.location.hash);
    console.log('🔍 Router current route after hash change:', router.currentRoute.value);
});

// Force navigation to dashboard if hash is already set
setTimeout(() => {
    if (window.location.hash === '#/dashboard') {
        console.log('🔍 Hash is already #/dashboard, forcing router navigation...');
        router.push('/dashboard');
    }
}, 100);
