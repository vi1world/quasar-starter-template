<template>
  <div class="space-y-6">
    <!-- Enhanced User Profile Card -->
    <div class="card-contra-gradient overflow-hidden relative">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="w-full h-full" style="background-image: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 20px 20px;"></div>
      </div>
      
      <!-- Cover Area -->
      <div class="h-20 bg-gradient-to-r from-white/10 to-white/5 relative">
        <!-- Floating Elements -->
        <div class="absolute top-2 right-2 w-8 h-8 bg-white/10 rounded-full animate-float"></div>
        <div class="absolute bottom-2 left-2 w-4 h-4 bg-white/5 rounded-full animate-float" style="animation-delay: 1s;"></div>
      </div>

      <!-- Profile Content -->
      <div class="px-6 pb-6 relative">
        <!-- Avatar -->
        <div class="flex justify-center -mt-8 mb-4">
          <div class="relative">
            <div class="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-2xl border-4 border-white/30 flex items-center justify-center">
              <span class="text-white font-black text-xl">U</span>
            </div>
            <!-- Online Status -->
            <div class="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-3 border-white rounded-full"></div>
          </div>
        </div>

        <!-- User Info -->
        <div class="text-center space-y-2">
          <h3 class="text-xl font-black text-white">John Doe</h3>
          <p class="text-white/80 font-medium">@johndoe</p>
          <p class="text-white/70 text-sm">Creative Developer & Designer</p>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-white/20">
          <div class="text-center">
            <div class="text-xl font-black text-white">1.2K</div>
            <div class="text-white/70 text-xs">Posts</div>
          </div>
          <div class="text-center">
            <div class="text-xl font-black text-white">5.4K</div>
            <div class="text-white/70 text-xs">Following</div>
          </div>
          <div class="text-center">
            <div class="text-xl font-black text-white">12.8K</div>
            <div class="text-white/70 text-xs">Followers</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Enhanced Navigation Menu -->
    <div class="card-contra p-6">
      <nav class="space-y-2">
        <router-link
          v-for="item in navigationItems"
          :key="item.name"
          :to="item.to"
          class="flex items-center px-4 py-3 text-base font-bold rounded-2xl border-2 transition-all duration-200 group"
          :class="[
            item.active
              ? 'bg-primary-500 border-contra-black-950 text-contra-black-950 shadow-contra'
              : 'bg-white dark:bg-slate-800 border-contra-black-950 dark:border-primary-500 text-contra-black-950 dark:text-primary-500 hover:bg-primary-500 hover:text-contra-black-950 dark:hover:bg-primary-500 dark:hover:text-contra-black-950'
          ]"
        >
          <q-icon 
            :name="item.icon" 
            class="mr-3 text-xl group-hover:scale-110 transition-transform duration-300" 
          />
          {{ item.name }}
          <q-badge
            v-if="item.badge"
            :color="item.badgeColor || 'coral'"
            :label="item.badge"
            class="ml-auto animate-pulse"
          />
        </router-link>
      </nav>
    </div>

    <!-- Trending Topics -->
    <div class="card-contra p-6">
      <div class="flex items-center mb-6">
        <q-icon name="trending_up" class="mr-2 text-electric-500 text-xl" />
        <h3 class="text-lg font-bold text-slate-900 dark:text-white">
          Trending Now
        </h3>
      </div>
      <div class="space-y-4">
        <div 
          v-for="(trend, index) in trendingTopics" 
          :key="index" 
          class="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 p-3 rounded-xl transition-all duration-300 group"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="font-semibold text-slate-900 dark:text-white group-hover:text-primary-600 transition-colors duration-300">
                #{{ trend.tag }}
              </p>
              <p class="text-sm text-slate-500 dark:text-slate-400">
                {{ trend.posts }} posts
              </p>
            </div>
            <div class="text-right">
              <div :class="['text-sm font-bold', trend.change > 0 ? 'text-green-500' : 'text-red-500']">
                {{ trend.change > 0 ? '+' : '' }}{{ trend.change }}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="card-contra p-6">
      <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">
        Quick Actions
      </h3>
      <div class="grid grid-cols-2 gap-3">
        <button class="btn-contra-electric text-sm py-3">
          <q-icon name="create" class="mr-1" />
          Draft
        </button>
        <button class="btn-contra-sunshine text-sm py-3">
          <q-icon name="schedule" class="mr-1" />
          Schedule
        </button>
        <button class="btn-contra-coral text-sm py-3">
          <q-icon name="analytics" class="mr-1" />
          Analytics
        </button>
        <button class="btn-contra-outline text-sm py-3">
          <q-icon name="settings" class="mr-1" />
          Settings
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const navigationItems = ref([
  { name: 'Home', icon: 'home', to: '/contra-feed', active: true },
  { name: 'Explore', icon: 'explore', to: '/explore', active: false },
  { name: 'Notifications', icon: 'notifications', to: '/notifications', active: false, badge: '3', badgeColor: 'coral' },
  { name: 'Messages', icon: 'mail', to: '/messages', active: false, badge: '2', badgeColor: 'electric' },
  { name: 'Bookmarks', icon: 'bookmark', to: '/bookmarks', active: false },
  { name: 'Profile', icon: 'person', to: '/profile', active: false },
  { name: 'Analytics', icon: 'analytics', to: '/analytics', active: false, badge: 'New', badgeColor: 'sunshine' },
]);

const trendingTopics = ref([
  { tag: 'ContraDesign', posts: '12.5K', change: 15.2 },
  { tag: 'WebDevelopment', posts: '8.3K', change: 8.7 },
  { tag: 'UIDesign', posts: '6.1K', change: -2.3 },
  { tag: 'JavaScript', posts: '15.2K', change: 12.1 },
  { tag: 'VueJS', posts: '4.8K', change: 25.6 },
]);
</script>

<style scoped>
/* Additional animations */
.animate-float {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>
