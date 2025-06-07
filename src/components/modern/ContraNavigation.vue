<template>
  <nav 
    :class="[
      'nav-contra',
      isScrolled ? 'scrolled' : 'bg-transparent'
    ]"
  >
    <div class="container-contra">
      <div class="flex items-center justify-between h-20">
        
        <!-- Logo Section -->
        <div class="flex items-center space-x-4">
          <router-link 
            to="/" 
            class="flex items-center space-x-3 group"
          >
            <!-- Logo Icon -->
            <div class="w-10 h-10 bg-gradient-to-br from-primary-600 to-electric-500 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300">
              <span class="text-white font-black text-lg">{{ logoText || 'M' }}</span>
            </div>
            
            <!-- Logo Text -->
            <span 
              v-if="logoText"
              class="text-xl font-black text-slate-900 dark:text-white group-hover:text-primary-600 transition-colors duration-300"
            >
              {{ logoText }}
            </span>
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center space-x-8">
          <router-link
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            :class="[
              'relative px-4 py-2 text-sm font-semibold transition-all duration-300 group',
              isActiveRoute(item.to) 
                ? 'text-primary-600' 
                : 'text-slate-700 dark:text-slate-300 hover:text-primary-600'
            ]"
          >
            {{ item.label }}
            
            <!-- Active Indicator -->
            <div 
              v-if="isActiveRoute(item.to)"
              class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-primary-600 rounded-full"
            ></div>
            
            <!-- Hover Effect -->
            <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary-600 rounded-full transition-all duration-300 group-hover:w-6"></div>
          </router-link>
        </div>

        <!-- Action Buttons -->
        <div class="hidden lg:flex items-center space-x-4">
          <!-- Theme Toggle -->
          <button
            @click="toggleTheme"
            class="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 group"
          >
            <q-icon 
              :name="isDark ? 'light_mode' : 'dark_mode'" 
              class="text-lg text-slate-600 dark:text-slate-400 group-hover:text-primary-600 transition-colors duration-300"
            />
          </button>

          <!-- Notifications -->
          <button
            v-if="showNotifications"
            @click="$emit('notifications-click')"
            class="relative w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 group"
          >
            <q-icon 
              name="notifications" 
              class="text-lg text-slate-600 dark:text-slate-400 group-hover:text-primary-600 transition-colors duration-300"
            />
            
            <!-- Notification Badge -->
            <div 
              v-if="notificationCount > 0"
              class="absolute -top-1 -right-1 w-5 h-5 bg-coral-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse"
            >
              {{ notificationCount > 9 ? '9+' : notificationCount }}
            </div>
          </button>

          <!-- User Menu -->
          <div v-if="showUserMenu" class="relative">
            <button
              @click="userMenuOpen = !userMenuOpen"
              class="flex items-center space-x-2 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 group"
            >
              <div class="w-8 h-8 bg-gradient-to-br from-primary-600 to-electric-500 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-sm">{{ userInitials }}</span>
              </div>
              <q-icon 
                name="keyboard_arrow_down" 
                :class="[
                  'text-slate-600 dark:text-slate-400 transition-all duration-300',
                  userMenuOpen ? 'rotate-180' : ''
                ]"
              />
            </button>

            <!-- User Dropdown -->
            <transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 scale-95"
              enter-to-class="opacity-100 scale-100"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-95"
            >
              <div 
                v-if="userMenuOpen"
                class="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 rounded-2xl shadow-contra border border-slate-200 dark:border-slate-700 py-2 z-50"
              >
                <a
                  v-for="item in userMenuItems"
                  :key="item.label"
                  @click="handleUserMenuClick(item)"
                  class="flex items-center space-x-3 px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200 cursor-pointer"
                >
                  <q-icon :name="item.icon" class="text-lg" />
                  <span>{{ item.label }}</span>
                </a>
              </div>
            </transition>
          </div>

          <!-- CTA Button -->
          <button
            v-if="ctaText"
            @click="$emit('cta-click')"
            class="btn-contra-primary"
          >
            {{ ctaText }}
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="lg:hidden w-10 h-10 rounded-xl bg-primary-500 border-2 border-contra-black-950 flex items-center justify-center hover:bg-primary-400 transition-all duration-200"
        >
          <q-icon
            :name="mobileMenuOpen ? 'close' : 'menu'"
            class="text-xl text-contra-black-950"
          />
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-if="mobileMenuOpen"
        class="lg:hidden bg-white dark:bg-slate-900 border-t-2 border-contra-black-950 dark:border-primary-500"
      >
        <div class="container-contra py-6 space-y-4">
          <router-link
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            @click="mobileMenuOpen = false"
            :class="[
              'block px-4 py-3 text-lg font-bold rounded-2xl border-2 transition-all duration-200',
              isActiveRoute(item.to)
                ? 'bg-primary-500 border-contra-black-950 text-contra-black-950 shadow-contra'
                : 'bg-white dark:bg-slate-800 border-contra-black-950 dark:border-primary-500 text-contra-black-950 dark:text-primary-500 hover:bg-primary-500 hover:text-contra-black-950'
            ]"
          >
            {{ item.label }}
          </router-link>

          <div class="pt-4 border-t-2 border-contra-black-950 dark:border-primary-500">
            <button
              v-if="ctaText"
              @click="$emit('cta-click'); mobileMenuOpen = false"
              class="btn-contra-primary w-full"
            >
              {{ ctaText }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { useQuasar } from 'quasar';

interface NavItem {
  label: string;
  to: string;
}

interface UserMenuItem {
  label: string;
  icon: string;
  action: string;
}

interface Props {
  logoText?: string;
  navItems: NavItem[];
  userMenuItems?: UserMenuItem[];
  showNotifications?: boolean;
  notificationCount?: number;
  showUserMenu?: boolean;
  userInitials?: string;
  ctaText?: string;
}

const props = withDefaults(defineProps<Props>(), {
  showNotifications: true,
  notificationCount: 0,
  showUserMenu: true,
  userInitials: 'U'
});

defineEmits<{
  'notifications-click': [];
  'cta-click': [];
  'user-menu-click': [action: string];
}>();

const $q = useQuasar();
const route = useRoute();

const isScrolled = ref(false);
const mobileMenuOpen = ref(false);
const userMenuOpen = ref(false);

const isDark = computed(() => $q.dark.isActive);

const isActiveRoute = (path: string) => {
  return route.path === path || route.path.startsWith(path + '/');
};

const toggleTheme = () => {
  $q.dark.toggle();
};

const handleUserMenuClick = (item: UserMenuItem) => {
  userMenuOpen.value = false;
  // Emit the action for parent component to handle
  // You can add specific logic here based on the action
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  
  // Close menus when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target?.closest('.relative')) {
      userMenuOpen.value = false;
    }
  });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
