<template>
  <div class="space-y-6">
    <!-- Feed Posts -->
    <div
      v-for="(post, index) in feedPosts"
      :key="post.id"
      :class="[
        'card-contra p-6 animate-fade-in',
        getPostVariant(index)
      ]"
      :style="{ animationDelay: `${index * 0.1}s` }"
    >
      <!-- Post Header -->
      <div class="flex items-center space-x-4 mb-4">
        <div class="relative">
          <div
            :class="[
              'w-12 h-12 rounded-2xl flex items-center justify-center border-2',
              getAvatarStyle(index)
            ]"
          >
            <span class="font-black text-lg">{{ post.author.name.charAt(0) }}</span>
          </div>
          <!-- Online Status -->
          <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full"></div>
        </div>

        <div class="flex-1 min-w-0">
          <div class="flex items-center space-x-2">
            <h3 :class="['text-lg font-black truncate', getTextColor(index)]">
              {{ post.author.name }}
            </h3>
            <span :class="['text-sm font-semibold', getSecondaryTextColor(index)]">
              @{{ post.author.username }}
            </span>
            <span :class="['text-sm', getSecondaryTextColor(index)]">•</span>
            <span :class="['text-sm font-medium', getSecondaryTextColor(index)]">
              {{ post.timeAgo }}
            </span>
          </div>
          <p v-if="post.author.title" :class="['text-sm font-medium', getSecondaryTextColor(index)]">
            {{ post.author.title }}
          </p>
        </div>

        <button :class="['p-2 rounded-xl border-2 transition-all duration-200', getButtonStyle(index)]">
          <q-icon name="more_horiz" class="text-lg" />
        </button>
      </div>

      <!-- Post Content -->
      <div class="mb-4">
        <p :class="['text-lg leading-relaxed whitespace-pre-wrap font-medium', getTextColor(index)]">
          {{ post.content }}
        </p>

        <!-- Hashtags -->
        <div v-if="post.hashtags.length > 0" class="flex flex-wrap gap-2 mt-4">
          <span
            v-for="tag in post.hashtags"
            :key="tag"
            :class="[
              'px-3 py-1 rounded-xl text-sm font-black cursor-pointer transition-all duration-200 border-2',
              getHashtagStyle(index)
            ]"
          >
            #{{ tag }}
          </span>
        </div>
      </div>

      <!-- Post Images -->
      <div v-if="post.images.length > 0" class="mb-4">
        <div
          :class="[
            'grid gap-3',
            post.images.length === 1 ? 'grid-cols-1' :
            post.images.length === 2 ? 'grid-cols-2' :
            post.images.length === 3 ? 'grid-cols-2' : 'grid-cols-2'
          ]"
        >
          <div
            v-for="(image, imgIndex) in post.images"
            :key="imgIndex"
            class="relative group cursor-pointer overflow-hidden rounded-2xl border-2 border-slate-300 dark:border-slate-600"
          >
            <img
              :src="image"
              :alt="`Post image ${imgIndex + 1}`"
              :class="[
                'w-full object-cover transition-all duration-200',
                post.images.length === 1 ? 'h-80' :
                post.images.length === 3 && imgIndex === 0 ? 'row-span-2 h-full' : 'h-40'
              ]"
            />
            <!-- Zoom Icon -->
            <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
              <div class="w-8 h-8 bg-white rounded-xl border-2 border-slate-300 flex items-center justify-center">
                <q-icon name="zoom_in" class="text-slate-700 text-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Post Actions -->
      <div class="pt-4 border-t-2 border-slate-200 dark:border-slate-700">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <!-- Like -->
            <button :class="['flex items-center space-x-2 px-3 py-2 rounded-xl border-2 transition-all duration-200', getActionStyle(index, 'like')]">
              <q-icon name="favorite_border" class="text-lg" />
              <span class="text-sm font-black">{{ post.likes }}</span>
            </button>

            <!-- Comment -->
            <button :class="['flex items-center space-x-2 px-3 py-2 rounded-xl border-2 transition-all duration-200', getActionStyle(index, 'comment')]">
              <q-icon name="chat_bubble_outline" class="text-lg" />
              <span class="text-sm font-black">{{ post.comments }}</span>
            </button>

            <!-- Repost -->
            <button :class="['flex items-center space-x-2 px-3 py-2 rounded-xl border-2 transition-all duration-200', getActionStyle(index, 'repost')]">
              <q-icon name="repeat" class="text-lg" />
              <span class="text-sm font-black">{{ post.reposts }}</span>
            </button>
          </div>

          <div class="flex items-center space-x-2">
            <!-- Bookmark -->
            <button :class="['p-2 rounded-xl border-2 transition-all duration-200', getActionStyle(index, 'bookmark')]">
              <q-icon name="bookmark_border" class="text-lg" />
            </button>

            <!-- Share -->
            <button :class="['p-2 rounded-xl border-2 transition-all duration-200', getActionStyle(index, 'share')]">
              <q-icon name="share" class="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Enhanced Load More -->
    <div class="text-center py-12">
      <button class="btn-contra-primary transform hover:scale-105 active:scale-95">
        <q-icon name="refresh" class="mr-2" />
        Load more amazing posts
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineOptions({
  name: 'ContraFeed',
});

const feedPosts = ref([
  {
    id: 1,
    author: {
      name: 'Sarah Johnson',
      username: 'sarah_dev',
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
      title: 'AI Research Engineer',
    },
    content: 'Excited to share our latest research on neural networks! The results are promising for real-world applications. 🤖🧠',
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
      title: 'UX Designer',
    },
    content: 'Working on some new interface concepts. Love how clean and minimal this approach feels! What do you think? 🎨',
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
      title: 'Full Stack Developer',
    },
    content: 'Pro tip: Always write tests for your code! It saves so much time in the long run and gives you confidence when refactoring. 🧪✅',
    hashtags: ['testing', 'programming', 'bestpractices'],
    images: [],
    timeAgo: '8h',
    likes: 67,
    comments: 12,
    reposts: 19,
  },
]);

// True Contra styling functions - Yellow and Black dominant
const getPostVariant = (index: number) => {
  const variants = ['', 'card-contra-primary', 'card-contra-black', 'card-contra-electric', 'card-contra-coral', 'card-contra-blue'];
  return variants[index % 6];
};

const getAvatarStyle = (index: number) => {
  const styles = [
    'bg-white text-contra-black-950 border-contra-black-950',
    'bg-primary-500 text-contra-black-950 border-contra-black-950',
    'bg-contra-black-950 text-primary-500 border-primary-500',
    'bg-electric-500 text-contra-black-950 border-contra-black-950',
    'bg-coral-500 text-white border-contra-black-950',
    'bg-blue-500 text-white border-contra-black-950'
  ];
  return styles[index % 6];
};

const getTextColor = (index: number) => {
  const colors = [
    'text-contra-black-950',
    'text-contra-black-950',
    'text-primary-500',
    'text-contra-black-950',
    'text-white',
    'text-white'
  ];
  return colors[index % 6];
};

const getSecondaryTextColor = (index: number) => {
  const colors = [
    'text-contra-black-700',
    'text-contra-black-700',
    'text-primary-400',
    'text-contra-black-700',
    'text-white/80',
    'text-white/80'
  ];
  return colors[index % 6];
};

const getButtonStyle = (index: number) => {
  const styles = [
    'bg-white text-contra-black-950 border-contra-black-950 hover:bg-primary-500 hover:text-contra-black-950',
    'bg-white text-contra-black-950 border-contra-black-950 hover:bg-primary-500 hover:text-contra-black-950',
    'bg-primary-500/20 text-primary-500 border-primary-500 hover:bg-primary-500 hover:text-contra-black-950',
    'bg-white text-contra-black-950 border-contra-black-950 hover:bg-electric-500 hover:text-contra-black-950',
    'bg-white/20 text-white border-white/30 hover:bg-white/30',
    'bg-white/20 text-white border-white/30 hover:bg-white/30'
  ];
  return styles[index % 6];
};

const getHashtagStyle = (index: number) => {
  const styles = [
    'bg-primary-500 text-contra-black-950 border-contra-black-950 hover:bg-primary-400',
    'bg-primary-500 text-contra-black-950 border-contra-black-950 hover:bg-primary-400',
    'bg-primary-500 text-contra-black-950 border-contra-black-950 hover:bg-primary-400',
    'bg-primary-500 text-contra-black-950 border-contra-black-950 hover:bg-primary-400',
    'bg-primary-500 text-contra-black-950 border-contra-black-950 hover:bg-primary-400',
    'bg-primary-500 text-contra-black-950 border-contra-black-950 hover:bg-primary-400'
  ];
  return styles[index % 6];
};

const getActionStyle = (index: number, action: string) => {
  const baseStyles = [
    'bg-white text-contra-black-950 border-contra-black-950',
    'bg-white text-contra-black-950 border-contra-black-950',
    'bg-primary-500/20 text-primary-500 border-primary-500',
    'bg-white text-contra-black-950 border-contra-black-950',
    'bg-white/20 text-white border-white/30',
    'bg-white/20 text-white border-white/30'
  ];

  const hoverStyles = [
    'hover:bg-primary-500 hover:text-contra-black-950',
    'hover:bg-primary-500 hover:text-contra-black-950',
    'hover:bg-primary-500 hover:text-contra-black-950',
    'hover:bg-primary-500 hover:text-contra-black-950',
    'hover:bg-white/30',
    'hover:bg-white/30'
  ];

  return `${baseStyles[index % 6]} ${hoverStyles[index % 6]}`;
};
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.6s ease-out both;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
