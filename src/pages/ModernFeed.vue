<template>
  <div class="space-y-6">
    <!-- Feed Posts -->
    <div v-for="post in feedPosts" :key="post.id" class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      <!-- Post Header -->
      <div class="p-4 pb-0">
        <div class="flex items-center space-x-3">
          <q-avatar size="48px">
            <img
              :src="post.author.avatar"
              :alt="post.author.name"
              class="rounded-full"
            />
          </q-avatar>
          
          <div class="flex-1 min-w-0">
            <div class="flex items-center space-x-2">
              <h3 class="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                {{ post.author.name }}
              </h3>
              <span class="text-sm text-slate-500 dark:text-slate-400">
                @{{ post.author.username }}
              </span>
              <span class="text-sm text-slate-500 dark:text-slate-400">•</span>
              <span class="text-sm text-slate-500 dark:text-slate-400">
                {{ post.timeAgo }}
              </span>
            </div>
            <p v-if="post.author.title" class="text-xs text-slate-500 dark:text-slate-400">
              {{ post.author.title }}
            </p>
          </div>
          
          <button class="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
            <q-icon name="more_horiz" class="text-lg" />
          </button>
        </div>
      </div>

      <!-- Post Content -->
      <div class="px-4 py-3">
        <p class="text-slate-900 dark:text-slate-100 whitespace-pre-wrap">{{ post.content }}</p>
        
        <!-- Hashtags -->
        <div v-if="post.hashtags.length > 0" class="flex flex-wrap gap-2 mt-3">
          <span
            v-for="tag in post.hashtags"
            :key="tag"
            class="text-accent-600 dark:text-accent-400 hover:text-accent-700 dark:hover:text-accent-300 cursor-pointer text-sm"
          >
            #{{ tag }}
          </span>
        </div>
      </div>

      <!-- Post Images -->
      <div v-if="post.images.length > 0" class="px-4">
        <div 
          :class="[
            'grid gap-2 rounded-lg overflow-hidden',
            post.images.length === 1 ? 'grid-cols-1' :
            post.images.length === 2 ? 'grid-cols-2' :
            post.images.length === 3 ? 'grid-cols-2' : 'grid-cols-2'
          ]"
        >
          <img
            v-for="(image, index) in post.images"
            :key="index"
            :src="image"
            :alt="`Post image ${index + 1}`"
            :class="[
              'w-full object-cover cursor-pointer hover:opacity-90 transition-opacity',
              post.images.length === 1 ? 'h-64' :
              post.images.length === 3 && index === 0 ? 'row-span-2 h-full' : 'h-32'
            ]"
          />
        </div>
      </div>

      <!-- Post Actions -->
      <div class="px-4 py-3 border-t border-slate-200 dark:border-slate-700 mt-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-6">
            <!-- Like -->
            <button class="flex items-center space-x-2 text-slate-600 dark:text-slate-400 hover:text-red-500 transition-colors group">
              <div class="p-2 rounded-full group-hover:bg-red-50 dark:group-hover:bg-red-900/20 transition-colors">
                <q-icon name="favorite_border" class="text-lg" />
              </div>
              <span class="text-sm">{{ post.likes }}</span>
            </button>

            <!-- Comment -->
            <button class="flex items-center space-x-2 text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors group">
              <div class="p-2 rounded-full group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors">
                <q-icon name="comment" class="text-lg" />
              </div>
              <span class="text-sm">{{ post.comments }}</span>
            </button>

            <!-- Repost -->
            <button class="flex items-center space-x-2 text-slate-600 dark:text-slate-400 hover:text-green-500 transition-colors group">
              <div class="p-2 rounded-full group-hover:bg-green-50 dark:group-hover:bg-green-900/20 transition-colors">
                <q-icon name="repeat" class="text-lg" />
              </div>
              <span class="text-sm">{{ post.reposts }}</span>
            </button>
          </div>

          <div class="flex items-center space-x-2">
            <!-- Bookmark -->
            <button class="p-2 rounded-full text-slate-600 dark:text-slate-400 hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-colors">
              <q-icon name="bookmark_border" class="text-lg" />
            </button>

            <!-- Share -->
            <button class="p-2 rounded-full text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
              <q-icon name="share" class="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Load More -->
    <div class="text-center py-8">
      <button class="px-6 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
        Load more posts
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineOptions({
  name: 'ModernFeed',
});

const feedPosts = ref([
  {
    id: 1,
    author: {
      name: 'Sarah Johnson',
      username: 'sarah_dev',
      avatar: '/images/no_picture_thumb.jpg',
      title: 'Senior Frontend Developer',
    },
    content: 'Just finished implementing a new design system for our team! The consistency across components is amazing. 🎨✨\n\nUsing Vue 3 with Composition API and Tailwind CSS has been a game-changer for our development workflow.',
    hashtags: ['vue3', 'designsystem', 'frontend', 'tailwindcss'],
    images: ['/images/no_picture_thumb.jpg'],
    timeAgo: '2h',
    likes: 42,
    comments: 8,
    reposts: 12,
  },
  {
    id: 2,
    author: {
      name: 'Mike Chen',
      username: 'mike_ai',
      avatar: '/images/no_picture_thumb.jpg',
      title: 'AI Research Engineer',
    },
    content: 'Excited to share our latest research on neural networks! The results are promising for real-world applications.',
    hashtags: ['ai', 'machinelearning', 'research'],
    images: [],
    timeAgo: '4h',
    likes: 128,
    comments: 23,
    reposts: 45,
  },
  {
    id: 3,
    author: {
      name: 'Emma Wilson',
      username: 'emma_design',
      avatar: '/images/no_picture_thumb.jpg',
      title: 'UX Designer',
    },
    content: 'Working on some new interface concepts. Love how clean and minimal this approach feels! What do you think?',
    hashtags: ['ux', 'design', 'ui', 'minimal'],
    images: [
      '/images/no_picture_thumb.jpg',
      '/images/no_picture_thumb.jpg',
      '/images/no_picture_thumb.jpg',
    ],
    timeAgo: '6h',
    likes: 89,
    comments: 15,
    reposts: 28,
  },
  {
    id: 4,
    author: {
      name: 'Alex Rodriguez',
      username: 'alex_code',
      avatar: '/images/no_picture_thumb.jpg',
      title: 'Full Stack Developer',
    },
    content: 'Pro tip: Always write tests for your code! It saves so much time in the long run and gives you confidence when refactoring. 🧪',
    hashtags: ['testing', 'programming', 'bestpractices'],
    images: [],
    timeAgo: '8h',
    likes: 67,
    comments: 12,
    reposts: 19,
  },
]);
</script>
