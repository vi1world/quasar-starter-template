<template>
  <div class="space-y-6">
    <!-- Who to Follow -->
    <div class="card-contra p-6">
      <div class="flex items-center mb-6">
        <q-icon name="person_add" class="mr-2 text-primary-500 text-xl" />
        <h3 class="text-lg font-bold text-slate-900 dark:text-white">
          Who to Follow
        </h3>
      </div>
      <div class="space-y-4">
        <div 
          v-for="(user, index) in suggestedUsers" 
          :key="index"
          class="flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 group"
        >
          <div 
            :class="[
              'w-12 h-12 rounded-2xl flex items-center justify-center',
              getUserAvatarStyle(index)
            ]"
          >
            <span class="text-white font-bold">{{ user.name.charAt(0) }}</span>
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-semibold text-slate-900 dark:text-white truncate group-hover:text-primary-600 transition-colors duration-300">
              {{ user.name }}
            </p>
            <p class="text-sm text-slate-500 dark:text-slate-400 truncate">
              @{{ user.username }}
            </p>
            <p class="text-xs text-slate-400 dark:text-slate-500">
              {{ user.followers }} followers
            </p>
          </div>
          <button class="btn-contra-outline text-xs px-3 py-1 hover:scale-105 transition-transform duration-300">
            Follow
          </button>
        </div>
      </div>
      <button class="w-full mt-4 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold flex items-center justify-center group">
        <span>Show more</span>
        <q-icon name="keyboard_arrow_down" class="ml-1 group-hover:translate-y-1 transition-transform duration-300" />
      </button>
    </div>

    <!-- Recent Activity -->
    <div class="card-contra-electric p-6 relative overflow-hidden">
      <!-- Background Elements -->
      <div class="absolute top-2 right-2 w-12 h-12 bg-white/10 rounded-full animate-float opacity-60"></div>
      <div class="absolute bottom-2 left-2 w-8 h-8 bg-white/5 rounded-full animate-float" style="animation-delay: 2s;"></div>
      
      <div class="relative z-10">
        <div class="flex items-center mb-6">
          <q-icon name="activity" class="mr-2 text-white text-xl" />
          <h3 class="text-lg font-bold text-white">
            Recent Activity
          </h3>
        </div>
        <div class="space-y-4">
          <div 
            v-for="(activity, index) in recentActivities" 
            :key="index"
            class="flex items-center space-x-3 p-3 rounded-xl bg-white/10 backdrop-blur-lg hover:bg-white/20 transition-all duration-300"
          >
            <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <q-icon :name="activity.icon" class="text-white" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm text-white font-medium">
                {{ activity.description }}
              </p>
              <p class="text-xs text-white/70">
                {{ activity.time }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Trending Hashtags -->
    <div class="card-contra p-6">
      <div class="flex items-center mb-6">
        <q-icon name="tag" class="mr-2 text-sunshine-500 text-xl" />
        <h3 class="text-lg font-bold text-slate-900 dark:text-white">
          Trending Hashtags
        </h3>
      </div>
      <div class="space-y-3">
        <div 
          v-for="(hashtag, index) in trendingHashtags" 
          :key="index"
          class="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 cursor-pointer group"
        >
          <div>
            <p class="font-semibold text-slate-900 dark:text-white group-hover:text-sunshine-500 transition-colors duration-300">
              #{{ hashtag.tag }}
            </p>
            <p class="text-sm text-slate-500 dark:text-slate-400">
              {{ hashtag.posts }} posts today
            </p>
          </div>
          <div class="text-right">
            <div :class="['text-sm font-bold', hashtag.trending ? 'text-green-500' : 'text-slate-400']">
              {{ hashtag.trending ? '🔥' : '📈' }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="card-contra-sunset p-6 relative overflow-hidden">
      <!-- Background Elements -->
      <div class="absolute top-2 right-2 w-10 h-10 bg-white/10 rounded-full animate-pulse"></div>
      <div class="absolute bottom-2 left-2 w-6 h-6 bg-white/5 rounded-full animate-pulse" style="animation-delay: 1s;"></div>
      
      <div class="relative z-10">
        <div class="flex items-center mb-6">
          <q-icon name="insights" class="mr-2 text-white text-xl" />
          <h3 class="text-lg font-bold text-white">
            Your Impact
          </h3>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="text-center">
            <div class="text-2xl font-black text-white">1.2K</div>
            <div class="text-white/80 text-sm">Views Today</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-black text-white">89</div>
            <div class="text-white/80 text-sm">New Followers</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-black text-white">156</div>
            <div class="text-white/80 text-sm">Likes Received</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-black text-white">23</div>
            <div class="text-white/80 text-sm">Comments</div>
          </div>
        </div>
        <div class="mt-4 pt-4 border-t border-white/20">
          <div class="flex items-center justify-between text-white/80 text-sm">
            <span>Engagement Rate</span>
            <span class="font-bold text-white">+12.5%</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Links -->
    <div class="card-contra p-6">
      <div class="grid grid-cols-2 gap-2 text-xs text-slate-500 dark:text-slate-400">
        <a href="#" class="hover:text-primary-600 transition-colors duration-300">About</a>
        <a href="#" class="hover:text-primary-600 transition-colors duration-300">Privacy</a>
        <a href="#" class="hover:text-primary-600 transition-colors duration-300">Terms</a>
        <a href="#" class="hover:text-primary-600 transition-colors duration-300">Help</a>
        <a href="#" class="hover:text-primary-600 transition-colors duration-300">API</a>
        <a href="#" class="hover:text-primary-600 transition-colors duration-300">Careers</a>
      </div>
      <div class="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
        <p class="text-xs text-slate-400 dark:text-slate-500 text-center">
          © 2024 Contra Feed. Made with ❤️
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const suggestedUsers = ref([
  { name: 'Alice Cooper', username: 'alice_dev', followers: '2.3K' },
  { name: 'Bob Smith', username: 'bob_design', followers: '1.8K' },
  { name: 'Carol Johnson', username: 'carol_ai', followers: '3.1K' },
  { name: 'David Lee', username: 'david_code', followers: '1.2K' },
]);

const recentActivities = ref([
  { icon: 'favorite', description: 'Sarah liked your post', time: '2m ago' },
  { icon: 'person_add', description: 'Mike started following you', time: '5m ago' },
  { icon: 'comment', description: 'Emma commented on your post', time: '10m ago' },
  { icon: 'repeat', description: 'Alex shared your post', time: '15m ago' },
]);

const trendingHashtags = ref([
  { tag: 'WebDev', posts: '2.1K', trending: true },
  { tag: 'Design', posts: '1.8K', trending: true },
  { tag: 'JavaScript', posts: '3.2K', trending: false },
  { tag: 'AI', posts: '1.5K', trending: true },
  { tag: 'React', posts: '2.7K', trending: false },
]);

const getUserAvatarStyle = (index: number) => {
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
