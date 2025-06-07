<template>
  <header class="nav-contra bg-contra-black-950 border-b-4 border-primary-500">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        
        <!-- Left Section -->
        <div class="flex items-center space-x-6">
          <!-- Mobile Menu Button -->
          <button
            @click="$emit('toggle-drawer')"
            class="lg:hidden w-10 h-10 rounded-xl bg-primary-500 border-2 border-contra-black-950 flex items-center justify-center hover:bg-primary-400 transition-all duration-200"
          >
            <q-icon name="menu" class="text-xl text-contra-black-950" />
          </button>

          <!-- Enhanced Logo -->
          <router-link to="/" class="flex items-center space-x-3 group">
            <div class="w-10 h-10 bg-primary-500 border-2 border-contra-black-950 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-200">
              <span class="text-contra-black-950 font-black text-lg">C</span>
            </div>
            <div class="hidden sm:block">
              <span class="text-xl font-black text-primary-500 group-hover:text-primary-400 transition-colors duration-200">
                Contra
              </span>
              <span class="text-sm font-medium text-primary-400 block -mt-1">
                Feed
              </span>
            </div>
          </router-link>
        </div>

        <!-- Center Section - Enhanced Search -->
        <div class="hidden md:flex flex-1 max-w-2xl mx-8">
          <div class="relative w-full group">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <q-icon
                name="search"
                class="text-contra-black-950 group-focus-within:text-primary-500 transition-colors duration-200"
              />
            </div>
            <input
              type="text"
              placeholder="Search posts, users, hashtags..."
              class="input-contra pl-12 pr-4 py-3 w-full text-contra-black-950 placeholder-contra-black-700"
            />
            <!-- Search suggestions dropdown would go here -->
          </div>
        </div>

        <!-- Right Section - Enhanced Actions -->
        <div class="flex items-center space-x-3">
          <!-- Quick Actions -->
          <div class="hidden lg:flex items-center space-x-2">
            <!-- Notifications -->
            <button class="relative w-10 h-10 rounded-xl bg-primary-500 border-2 border-contra-black-950 flex items-center justify-center hover:bg-primary-400 transition-all duration-200">
              <q-icon
                name="notifications"
                class="text-lg text-contra-black-950"
              />
              <!-- Notification Badge -->
              <div class="absolute -top-1 -right-1 w-5 h-5 bg-coral-500 text-white text-xs font-black rounded-full flex items-center justify-center border-2 border-contra-black-950">
                3
              </div>
            </button>

            <!-- Messages -->
            <button class="relative w-10 h-10 rounded-xl bg-primary-500 border-2 border-contra-black-950 flex items-center justify-center hover:bg-primary-400 transition-all duration-200">
              <q-icon
                name="mail"
                class="text-lg text-contra-black-950"
              />
              <!-- Message Badge -->
              <div class="absolute -top-1 -right-1 w-5 h-5 bg-electric-500 text-white text-xs font-black rounded-full flex items-center justify-center border-2 border-contra-black-950">
                2
              </div>
            </button>

            <!-- Bookmarks -->
            <button class="w-10 h-10 rounded-xl bg-primary-500 border-2 border-contra-black-950 flex items-center justify-center hover:bg-primary-400 transition-all duration-200">
              <q-icon
                name="bookmark"
                class="text-lg text-contra-black-950"
              />
            </button>
          </div>

          <!-- Theme Toggle -->
          <button
            @click="toggleTheme"
            class="w-10 h-10 rounded-xl bg-primary-500 border-2 border-contra-black-950 flex items-center justify-center hover:bg-primary-400 transition-all duration-200"
          >
            <q-icon
              :name="isDark ? 'light_mode' : 'dark_mode'"
              class="text-lg text-contra-black-950"
            />
          </button>

          <!-- Create Post Button -->
          <button class="hidden sm:flex btn-contra-black">
            <q-icon name="add" class="mr-2" />
            Post
          </button>

          <!-- User Menu -->
          <div class="relative">
            <button
              @click="userMenuOpen = !userMenuOpen"
              class="flex items-center space-x-2 p-1 rounded-xl hover:bg-primary-500 transition-all duration-200 group"
            >
              <div class="relative">
                <div class="w-10 h-10 bg-primary-500 border-2 border-contra-black-950 rounded-xl flex items-center justify-center">
                  <span class="text-contra-black-950 font-black text-sm">U</span>
                </div>
                <!-- Online Status -->
                <div class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-contra-black-950 rounded-full"></div>
              </div>
              <q-icon
                name="keyboard_arrow_down"
                :class="[
                  'text-primary-500 transition-all duration-200 hidden sm:block',
                  userMenuOpen ? 'rotate-180' : ''
                ]"
              />
            </button>

            <!-- Enhanced User Dropdown -->
            <transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 scale-95 -translate-y-2"
              enter-to-class="opacity-100 scale-100 translate-y-0"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 scale-100 translate-y-0"
              leave-to-class="opacity-0 scale-95 -translate-y-2"
            >
              <div 
                v-if="userMenuOpen"
                class="absolute right-0 top-full mt-2 w-64 card-contra p-2 z-50"
              >
                <!-- User Info -->
                <div class="px-4 py-3 border-b-2 border-contra-black-950">
                  <div class="flex items-center space-x-3">
                    <div class="w-12 h-12 bg-primary-500 border-2 border-contra-black-950 rounded-xl flex items-center justify-center">
                      <span class="text-contra-black-950 font-black">U</span>
                    </div>
                    <div>
                      <p class="font-black text-contra-black-950">John Doe</p>
                      <p class="text-sm font-medium text-contra-black-700">@johndoe</p>
                    </div>
                  </div>
                </div>

                <!-- Menu Items -->
                <div class="py-2">
                  <a
                    v-for="item in userMenuItems"
                    :key="item.label"
                    @click="handleUserMenuClick(item); userMenuOpen = false"
                    class="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-contra-black-950 hover:bg-primary-500 hover:text-contra-black-950 rounded-lg transition-colors duration-200 cursor-pointer"
                  >
                    <q-icon :name="item.icon" class="text-lg" />
                    <span>{{ item.label }}</span>
                    <q-badge
                      v-if="item.badge"
                      color="primary"
                      :label="item.badge"
                      class="ml-auto bg-primary-500 text-contra-black-950 font-black"
                    />
                  </a>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useTheme } from '@/composables/useTheme';

defineEmits<{
  'toggle-drawer': [];
  'toggle-sidebar': [];
}>();

const { isDark, toggleTheme } = useTheme();

const userMenuOpen = ref(false);

const userMenuItems = [
  { label: 'Profile', icon: 'person', action: 'profile' },
  { label: 'Analytics', icon: 'analytics', action: 'analytics', badge: 'New', badgeColor: 'electric' },
  { label: 'Settings', icon: 'settings', action: 'settings' },
  { label: 'Help Center', icon: 'help', action: 'help' },
  { label: 'Logout', icon: 'logout', action: 'logout' },
];

const handleUserMenuClick = (item: any) => {
  console.log('User menu action:', item.action);
  // Handle menu actions here
};

// Close menu when clicking outside
onMounted(() => {
  document.addEventListener('click', (e) => {
    if (!e.target?.closest('.relative')) {
      userMenuOpen.value = false;
    }
  });
});

onUnmounted(() => {
  document.removeEventListener('click', () => {});
});
</script>

<style scoped>
/* Additional hover effects */
.group:hover .animate-pulse {
  animation-duration: 1s;
}
</style>
