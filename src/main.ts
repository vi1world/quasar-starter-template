import { createApp } from 'vue'
import { Quasar } from 'quasar'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import routes from './router/routes'

// Import icon libraries
import '@quasar/extras/bootstrap-icons/bootstrap-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

// Import app css
import './css/app.scss'
import './css/tailwind.css'
import './css/typography.scss'

// Create router
const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Create app
const app = createApp(App)

// Use Quasar
app.use(Quasar, {
  plugins: {
    // import Quasar plugins and add here
  },
})

// Use Pinia
app.use(createPinia())

// Use router
app.use(router)

// Mount app
app.mount('#app')
