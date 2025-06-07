<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        
        <!-- Left Section -->
        <div class="flex items-center space-x-4">
          <!-- Mobile Menu Button -->
          <button
            @click="$emit('toggle-drawer')"
            class="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <q-icon name="menu" class="text-xl" />
          </button>

          <!-- Logo -->
          <router-link to="/" class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-accent-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-sm">M</span>
            </div>
            <span class="hidden sm:block text-xl font-bold text-slate-900 dark:text-slate-100">
              Misskey Feed
            </span>
          </router-link>
        </div>

        <!-- Center Section - Search -->
        <div class="hidden md:flex flex-1 max-w-lg mx-8">
          <div class="relative w-full">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <q-icon name="search" class="text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search posts, users, hashtags..."
              class="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
            />
          </div>
        </div>

        <!-- Right Section -->
        <div class="flex items-center space-x-3">
          <!-- Search Button (Mobile) -->
          <button class="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <q-icon name="search" class="text-xl" />
          </button>

          <!-- Create Post Button -->
          <button class="hidden sm:flex items-center px-4 py-2 bg-accent-600 hover:bg-accent-700 text-white rounded-lg text-sm font-medium transition-colors">
            <q-icon name="add" class="mr-2 text-sm" />
            Post
          </button>

          <!-- Notifications -->
          <div class="relative">
            <button class="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <q-icon name="notifications" class="text-xl" />
              <span class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>
          </div>

          <!-- Messages -->
          <button class="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <q-icon name="mail" class="text-xl" />
          </button>

          <!-- Theme Toggle -->
          <button 
            @click="toggleTheme"
            class="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <q-icon :name="isDark ? 'light_mode' : 'dark_mode'" class="text-xl" />
          </button>

          <!-- User Menu -->
          <div class="relative">
            <q-btn
              flat
              round
              class="p-1"
            >
              <q-avatar size="32px">
                <img
                  src="/images/no_picture_thumb.jpg"
                  alt="User Avatar"
                  class="rounded-full"
                />
              </q-avatar>
              
              <q-menu
                anchor="bottom right"
                self="top right"
                class="q-mt-xs"
              >
                <q-list class="min-w-48">
                  <q-item clickable v-close-popup>
                    <q-item-section avatar>
                      <q-icon name="person" />
                    </q-item-section>
                    <q-item-section>Profile</q-item-section>
                  </q-item>
                  
                  <q-item clickable v-close-popup>
                    <q-item-section avatar>
                      <q-icon name="settings" />
                    </q-item-section>
                    <q-item-section>Settings</q-item-section>
                  </q-item>
                  
                  <q-separator />
                  
                  <q-item clickable v-close-popup>
                    <q-item-section avatar>
                      <q-icon name="logout" />
                    </q-item-section>
                    <q-item-section>Logout</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme';

defineEmits<{
  'toggle-drawer': [];
  'toggle-sidebar': [];
}>();

const { isDark, toggleTheme } = useTheme();
</script>
