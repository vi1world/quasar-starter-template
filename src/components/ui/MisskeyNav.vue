<template>
  <div
    :class="[
      'fixed top-0 z-[9900] w-full transition-all duration-300',
      {
        'shadow-contra bg-white dark:bg-gray-950 border-b-2 border-contra-black-950': isScrolled,
        'bg-white dark:bg-gray-950 border-b-2 border-contra-black-950': !isScrolled,
        'border-b-2 border-contra-black-950': hasBorder,
      },
      slim ? 'h-16' : 'h-16 lg:h-20',
    ]"
  >
    <nav class="container mx-auto max-w-screen-xl grid items-center grid-cols-2 lg:grid-cols-6 p-4 h-full transition-[height]">
      <!-- Logo Section -->
      <div class="flex items-center">
        <router-link 
          :to="logoLink" 
          class="flex items-center space-x-2 hover:opacity-80 transition-opacity"
        >
          <div class="h-8 w-8 bg-accent-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-lg">M</span>
          </div>
          <div class="font-title font-bold text-lg text-slate-800 dark:text-slate-200">
            {{ siteName }}
          </div>
        </router-link>
      </div>

      <!-- Mobile Menu -->
      <ul
        class="fixed z-[9902] top-16 right-0 text-right p-4 w-[80vw] sm:w-[50vw] bg-slate-100/90 dark:bg-slate-950/90 backdrop-blur-lg space-y-2 transition-all duration-300 lg:transition-none lg:translate-x-0 lg:backdrop-blur-none lg:w-auto lg:rounded-none lg:shadow-none lg:space-y-0 lg:p-0 lg:relative lg:top-0 lg:right-auto lg:bg-transparent dark:lg:bg-transparent lg:col-span-4 lg:space-x-8 xl:space-x-10 lg:flex lg:justify-center"
        :class="[
          isScrolled ? 'rounded-bl-lg' : 'rounded-l-lg',
          navOpen ? 'translate-x-0 shadow-lg' : 'translate-x-full'
        ]"
      >
        <li v-for="item in navItems" :key="item.to">
          <router-link 
            :to="item.to" 
            @click="navOpen = false"
            :class="[
              'block rounded-full px-4 py-2 lg:px-4 lg:py-1.5 hover:bg-slate-300 dark:hover:bg-slate-800 transition-colors',
              { 'bg-slate-300 dark:bg-slate-800 font-bold': isActiveRoute(item.to) }
            ]"
          >
            <component v-if="item.icon" :is="item.icon" class="h-5 w-5" />
            <template v-else>
              {{ item.label }}
            </template>
          </router-link>
        </li>

        <!-- Mobile Theme Toggle -->
        <li class="lg:hidden px-4 py-2 flex justify-end items-center space-x-4">
          <button 
            class="hover:opacity-80 disabled:opacity-70 relative before:absolute before:-z-10 before:-top-2 before:-left-2 before:w-9 before:h-9 before:rounded-full hover:before:bg-slate-300 dark:hover:before:bg-slate-600 h-5 w-5"
            @click="toggleTheme"
            aria-label="Toggle Theme"
          >
            <q-icon :name="themeIcon" class="h-5 w-5" />
          </button>
        </li>
      </ul>

      <!-- Desktop Actions -->
      <div class="text-right">
        <!-- Mobile Menu Toggle -->
        <button class="p-1 lg:hidden" @click="navOpen = !navOpen">
          <q-icon :name="navOpen ? 'close' : 'menu'" class="h-5 w-5" />
        </button>

        <!-- Desktop Theme Toggle -->
        <ul class="hidden lg:col-span-4 lg:space-x-4 lg:flex justify-center">
          <li>
            <button 
              :class="[
                'hover:opacity-80 disabled:opacity-70 disabled:cursor-not-allowed transition-colors',
                { 'text-white 3xl:text-slate-800 3xl:dark:text-slate-200': (landing && !isScrolled) }
              ]"
              @click="toggleTheme"
              aria-label="Toggle Theme"
            >
              <q-icon :name="themeIcon" class="h-5 w-5" />
            </button>
          </li>
          
          <li class="border-l border-slate-300 dark:border-slate-600"></li>
          
          <li v-for="item in rightNavItems" :key="item.to" 
              :class="[
                'transition-colors',
                { 'text-white 3xl:text-slate-800 3xl:dark:text-slate-200': (landing && !isScrolled) }
              ]">
            <router-link :to="item.to" class="hover:opacity-80 transition-opacity">
              <component v-if="item.icon" :is="item.icon" class="h-5 w-5" />
              <template v-else>
                {{ item.label }}
              </template>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { useQuasar } from 'quasar';

interface NavItem {
  to: string;
  label?: string;
  icon?: string;
}

interface Props {
  /** Disable shadow effect */
  disableShadow?: boolean;
  /** Slim navigation height */
  slim?: boolean;
  /** Show border */
  hasBorder?: boolean;
  /** Landing page mode */
  landing?: boolean;
  /** Site name */
  siteName?: string;
  /** Logo link */
  logoLink?: string;
  /** Navigation items */
  navItems?: NavItem[];
  /** Right navigation items */
  rightNavItems?: NavItem[];
}

const props = withDefaults(defineProps<Props>(), {
  disableShadow: false,
  slim: false,
  hasBorder: false,
  landing: false,
  siteName: 'Misskey Hub',
  logoLink: '/',
  navItems: () => [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/docs', label: 'Docs' },
  ],
  rightNavItems: () => [
    { to: '/login', label: 'Login' },
  ],
});

const $q = useQuasar();
const route = useRoute();

const navOpen = ref(false);
const scrollPos = ref(0);

const isScrolled = computed(() => !props.disableShadow && scrollPos.value > 40);

const themeIcon = computed(() => {
  if ($q.dark.isActive) return 'dark_mode';
  return 'light_mode';
});

function isActiveRoute(to: string): boolean {
  return route.path.includes(to) && to !== '/';
}

function toggleTheme() {
  $q.dark.toggle();
}

function updateScrollPos() {
  scrollPos.value = window.scrollY;
}

onMounted(() => {
  window.addEventListener('scroll', updateScrollPos, { passive: true });
  updateScrollPos();
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollPos);
});
</script>
