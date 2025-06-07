<template>
  <header class="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4">
    <div class="flex items-center justify-between">
      <!-- Left Section -->
      <div class="flex items-center space-x-4">
        <!-- Mobile Menu Button -->
        <button
          class="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          @click="$emit('toggle-sidebar')"
        >
          <q-icon name="menu" class="text-xl text-slate-600 dark:text-slate-400" />
        </button>

        <!-- Desktop Mini Toggle -->
        <button
          class="hidden lg:block p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          @click="$emit('toggle-mini')"
        >
          <q-icon 
            :name="sidebarMini ? 'menu_open' : 'menu'" 
            class="text-xl text-slate-600 dark:text-slate-400" 
          />
        </button>

        <!-- Breadcrumb -->
        <nav class="hidden sm:flex items-center space-x-2 text-sm">
          <router-link 
            to="/" 
            class="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
          >
            Dashboard
          </router-link>
          <q-icon name="chevron_right" class="text-slate-400 text-sm" />
          <span class="text-slate-700 dark:text-slate-300 font-medium">
            {{ currentPageName }}
          </span>
        </nav>
      </div>

      <!-- Right Section -->
      <div class="flex items-center space-x-4">
        <!-- Search -->
        <div class="hidden md:block relative">
          <q-icon 
            name="search" 
            class="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm"
          />
          <input
            type="text"
            placeholder="Search..."
            class="pl-10 pr-4 py-2 w-64 bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
          />
        </div>

        <!-- Notifications -->
        <button class="relative p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
          <q-icon name="notifications" class="text-xl text-slate-600 dark:text-slate-400" />
          <span class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            3
          </span>
        </button>

        <!-- Theme Toggle -->
        <button 
          @click="toggleTheme"
          class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        >
          <q-icon 
            :name="$q.dark.isActive ? 'light_mode' : 'dark_mode'" 
            class="text-xl text-slate-600 dark:text-slate-400" 
          />
        </button>

        <!-- User Menu -->
        <div class="relative">
          <button 
            @click="userMenuOpen = !userMenuOpen"
            class="flex items-center space-x-2 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <img
              src="/images/no_picture_thumb.jpg"
              alt="User Avatar"
              class="w-8 h-8 rounded-full object-cover"
            />
            <div class="hidden sm:block text-left">
              <div class="text-sm font-medium text-slate-700 dark:text-slate-300">
                Admin User
              </div>
              <div class="text-xs text-slate-500 dark:text-slate-400">
                Software Engineer
              </div>
            </div>
            <q-icon 
              name="keyboard_arrow_down" 
              :class="[
                'text-sm transition-transform duration-200',
                userMenuOpen ? 'rotate-180' : ''
              ]"
            />
          </button>

          <!-- User Dropdown -->
          <div 
            v-if="userMenuOpen"
            class="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-2 z-50"
          >
            <router-link
              to="/settings"
              class="flex items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
              @click="userMenuOpen = false"
            >
              <q-icon name="settings" class="mr-3 text-lg" />
              Settings
            </router-link>
            <router-link
              to="/profile"
              class="flex items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
              @click="userMenuOpen = false"
            >
              <q-icon name="person" class="mr-3 text-lg" />
              Profile
            </router-link>
            <hr class="my-2 border-slate-200 dark:border-slate-700">
            <button
              class="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
              @click="logout"
            >
              <q-icon name="logout" class="mr-3 text-lg" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useQuasar } from 'quasar';

interface Props {
  sidebarMini: boolean;
}

defineProps<Props>();
defineEmits<{
  'toggle-sidebar': [];
  'toggle-mini': [];
}>();

const $q = useQuasar();
const route = useRoute();

const userMenuOpen = ref(false);

const currentPageName = computed(() => {
  // Extract page name from route
  const pathSegments = route.path.split('/').filter(Boolean);
  if (pathSegments.length === 0) return 'Overview';
  
  const lastSegment = pathSegments[pathSegments.length - 1];
  return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
});

function toggleTheme() {
  $q.dark.toggle();
}

function logout() {
  userMenuOpen.value = false;
  // Add logout logic here
  console.log('Logout clicked');
}

// Close user menu when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target?.closest('.relative')) {
    userMenuOpen.value = false;
  }
});
</script>
