<template>
  <div class="fixed bottom-6 left-6 z-30">
    <!-- Chat Toggle Button -->
    <button
      @click="isOpen = !isOpen"
      class="w-14 h-14 bg-gradient-to-r from-electric-500 to-sunshine-500 rounded-full shadow-glow-electric flex items-center justify-center text-white hover:scale-110 transition-all duration-300 relative"
    >
      <q-icon :name="isOpen ? 'close' : 'chat'" class="text-xl" />
      <!-- Notification Badge -->
      <div class="absolute -top-1 -right-1 w-5 h-5 bg-coral-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
        2
      </div>
    </button>

    <!-- Chat Window -->
    <transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 scale-95 translate-y-4"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-95 translate-y-4"
    >
      <div 
        v-if="isOpen"
        class="absolute bottom-16 left-0 w-80 h-96 card-contra flex flex-col overflow-hidden"
      >
        <!-- Chat Header -->
        <div class="p-4 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-electric-500 to-sunshine-500">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <q-icon name="chat" class="text-white" />
              </div>
              <div>
                <h3 class="font-bold text-white">Messages</h3>
                <p class="text-xs text-white/80">2 unread</p>
              </div>
            </div>
            <button
              @click="isOpen = false"
              class="w-6 h-6 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center text-white transition-colors duration-300"
            >
              <q-icon name="close" class="text-sm" />
            </button>
          </div>
        </div>

        <!-- Chat List -->
        <div class="flex-1 overflow-y-auto p-2">
          <div 
            v-for="(chat, index) in chats" 
            :key="index"
            class="flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 cursor-pointer group"
          >
            <div class="relative">
              <div 
                :class="[
                  'w-10 h-10 rounded-xl flex items-center justify-center',
                  getChatAvatarStyle(index)
                ]"
              >
                <span class="text-white font-bold text-sm">{{ chat.name.charAt(0) }}</span>
              </div>
              <div v-if="chat.online" class="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full"></div>
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between">
                <p class="font-semibold text-slate-900 dark:text-white truncate text-sm group-hover:text-primary-600 transition-colors duration-300">
                  {{ chat.name }}
                </p>
                <span class="text-xs text-slate-500 dark:text-slate-400">{{ chat.time }}</span>
              </div>
              <p class="text-xs text-slate-500 dark:text-slate-400 truncate">
                {{ chat.lastMessage }}
              </p>
              <div v-if="chat.unread" class="w-2 h-2 bg-coral-500 rounded-full mt-1"></div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="p-3 border-t border-slate-200 dark:border-slate-700">
          <div class="flex space-x-2">
            <button class="flex-1 btn-contra-outline text-xs py-2">
              <q-icon name="search" class="mr-1" />
              Search
            </button>
            <button class="flex-1 btn-contra-primary text-xs py-2">
              <q-icon name="add" class="mr-1" />
              New Chat
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isOpen = ref(false);

const chats = ref([
  {
    name: 'Sarah Johnson',
    lastMessage: 'Hey! How\'s the new design coming along?',
    time: '2m',
    unread: true,
    online: true
  },
  {
    name: 'Mike Chen',
    lastMessage: 'Thanks for the feedback on the AI project!',
    time: '1h',
    unread: true,
    online: false
  },
  {
    name: 'Emma Wilson',
    lastMessage: 'Love the new UI components 🎨',
    time: '3h',
    unread: false,
    online: true
  },
  {
    name: 'Alex Rodriguez',
    lastMessage: 'Let\'s schedule a code review session',
    time: '1d',
    unread: false,
    online: false
  }
]);

const getChatAvatarStyle = (index: number) => {
  const styles = [
    'bg-gradient-to-br from-primary-600 to-primary-700',
    'bg-gradient-to-br from-electric-500 to-electric-600',
    'bg-gradient-to-br from-sunshine-500 to-sunshine-600',
    'bg-gradient-to-br from-coral-500 to-coral-600'
  ];
  return styles[index % 4];
};
</script>

<style scoped>
/* Custom scrollbar */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.5);
}
</style>
