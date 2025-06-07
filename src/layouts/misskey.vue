<template>
  <div class="min-h-screen bg-slate-100 dark:bg-gray-900 text-slate-800 dark:text-slate-200">
    <!-- Navigation -->
    <MisskeyNav 
      :site-name="siteName"
      :nav-items="navItems"
      :right-nav-items="rightNavItems"
      :landing="isLandingPage"
    />

    <!-- Main Content -->
    <div class="main-content pt-16 lg:pt-20">
      <slot></slot>
    </div>

    <!-- Footer -->
    <footer class="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div class="container mx-auto max-w-screen-xl px-6 py-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Brand Section -->
          <div class="space-y-4">
            <div class="flex items-center space-x-2">
              <div class="h-8 w-8 bg-accent-600 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-lg">M</span>
              </div>
              <div class="font-title font-bold text-lg">{{ siteName }}</div>
            </div>
            <p class="text-slate-600 dark:text-slate-400 text-sm">
              A modern, beautiful, and powerful social platform.
            </p>
          </div>

          <!-- Quick Links -->
          <div class="space-y-4">
            <h3 class="font-title font-bold text-lg">Quick Links</h3>
            <ul class="space-y-2">
              <li v-for="item in navItems" :key="item.to">
                <router-link 
                  :to="item.to" 
                  class="text-slate-600 dark:text-slate-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
                >
                  {{ item.label }}
                </router-link>
              </li>
            </ul>
          </div>

          <!-- Resources -->
          <div class="space-y-4">
            <h3 class="font-title font-bold text-lg">Resources</h3>
            <ul class="space-y-2">
              <li>
                <a href="#" class="text-slate-600 dark:text-slate-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" class="text-slate-600 dark:text-slate-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" class="text-slate-600 dark:text-slate-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors">
                  Community
                </a>
              </li>
            </ul>
          </div>

          <!-- Contact -->
          <div class="space-y-4">
            <h3 class="font-title font-bold text-lg">Contact</h3>
            <ul class="space-y-2">
              <li>
                <a href="#" class="text-slate-600 dark:text-slate-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors">
                  Support
                </a>
              </li>
              <li>
                <a href="#" class="text-slate-600 dark:text-slate-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" class="text-slate-600 dark:text-slate-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Copyright -->
        <div class="border-t border-slate-200 dark:border-slate-800 mt-8 pt-8 text-center">
          <p class="text-slate-600 dark:text-slate-400 text-sm">
            © {{ currentYear }} {{ siteName }}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>

    <!-- Scroll to Top Button -->
    <button
      v-if="showScrollButton"
      @click="scrollToTop"
      :class="[
        'fixed bottom-10 right-10 h-14 w-14 p-3 rounded-full bg-accent-600 text-white shadow-lg transition-all duration-300 z-50',
        scrollPos > 200 ? 'opacity-75 hover:opacity-100' : 'opacity-0 pointer-events-none',
      ]"
    >
      <q-icon name="keyboard_arrow_up" class="h-8 w-8" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import MisskeyNav from '@/components/ui/MisskeyNav.vue';

interface NavItem {
  to: string;
  label?: string;
  icon?: string;
}

interface Props {
  /** Site name */
  siteName?: string;
  /** Show scroll to top button */
  showScrollButton?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  siteName: 'Misskey Hub',
  showScrollButton: true,
});

const route = useRoute();
const scrollPos = ref(0);

const currentYear = new Date().getFullYear();

const isLandingPage = computed(() => route.path === '/');

const navItems: NavItem[] = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/docs', label: 'Documentation' },
  { to: '/features', label: 'Features' },
];

const rightNavItems: NavItem[] = [
  { to: '/login', label: 'Login' },
  { to: '/register', label: 'Register' },
];

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
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

<style scoped>
.main-content {
  min-height: calc(100vh - 4rem);
}

@media (min-width: 1024px) {
  .main-content {
    min-height: calc(100vh - 5rem);
  }
}
</style>
