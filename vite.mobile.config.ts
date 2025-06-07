import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import { resolve } from 'path';

// Get the host from TAURI_DEV_HOST environment variable for mobile development
const host = process.env.TAURI_DEV_HOST;

export default defineConfig({
    clearScreen: false,
    root: resolve(__dirname),
    publicDir: 'public',
    base: './',
    plugins: [
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
        quasar({
            sassVariables: resolve(__dirname, 'src/css/quasar.variables.scss')
        })
    ],
    optimizeDeps: {
        include: ['vue', 'quasar', 'pinia', 'vue-i18n']
    },
    resolve: {
        alias: {
            '~': resolve(__dirname, 'src'),
            '@': resolve(__dirname, 'src'),
            'src': resolve(__dirname, 'src'),
            'app': resolve(__dirname, 'src'),
            'components': resolve(__dirname, 'src/components'),
            'layouts': resolve(__dirname, 'src/layouts'),
            'pages': resolve(__dirname, 'src/pages'),
            'assets': resolve(__dirname, 'src/assets'),
            'boot': resolve(__dirname, 'src/boot'),
            'stores': resolve(__dirname, 'src/stores'),
            'vue': 'vue/dist/vue.esm-bundler.js',
            '@inertiajs/vue3': resolve(__dirname, 'src/services/inertia-mobile-adapter.ts'),
        },
    },
    define: {
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
        // Define process.env for browser compatibility
        'process.env': {
            APP_PREFIX_KEY: JSON.stringify('gush_'),
            APP_DEFAULT_LOCALE: JSON.stringify('en'),
            VITE_APP_MODE: JSON.stringify('mobile'),
            APP_VERSION: JSON.stringify('1.0.0'),
        },
        // Also define global process object
        global: 'globalThis',
    },
    build: {
        outDir: 'dist/mobile',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'mobile-index.html')
            },
            output: {
                manualChunks: {
                    vendor: ['vue', 'vue-router'],
                    quasar: ['quasar'],
                    pinia: ['pinia'],
                },
            },
        },
    },
    server: {
        host: host || false,
        port: 9001,
        strictPort: true,
        hmr: host
            ? {
                protocol: 'ws',
                host,
                port: 9002,
            }
            : undefined,
        fs: {
            allow: ['..']
        }
    },
});
