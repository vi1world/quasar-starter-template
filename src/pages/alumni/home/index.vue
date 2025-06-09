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
        <div v-if="post.hashtags && post.hashtags.length > 0" class="flex flex-wrap gap-2 mt-4">
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
      <div v-if="post.images && post.images.length > 0" class="mb-4">
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
import { ref, computed } from 'vue';

defineOptions({
  name: 'AlumniHome',
});

// Props from Laravel controller
interface Props {
  upcomingEvents?: any[];
  latestJobs?: any[];
  latestNews?: any[];
  latestNotice?: any[];
  user?: any;
}

const props = withDefaults(defineProps<Props>(), {
  upcomingEvents: () => [],
  latestJobs: () => [],
  latestNews: () => [],
  latestNotice: () => [],
  user: () => ({})
});

// Convert Laravel data to feed format
const feedPosts = computed(() => {
  const posts: any[] = [];
  
  // Add news as posts
  if (props.latestNews) {
    props.latestNews.forEach((news: any, index: number) => {
      posts.push({
        id: `news-${news.id}`,
        author: {
          name: news.author?.name || 'News Author',
          username: news.author?.name?.toLowerCase().replace(/\s+/g, '_') || 'news_author',
          title: 'News Publisher',
        },
        content: news.title + '\n\n' + (news.details || '').substring(0, 200) + '...',
        hashtags: [news.category?.name || 'news'],
        images: news.image ? [news.image] : [],
        timeAgo: formatTimeAgo(news.created_at),
        likes: Math.floor(Math.random() * 50) + 10,
        comments: Math.floor(Math.random() * 20) + 5,
        reposts: Math.floor(Math.random() * 15) + 2,
      });
    });
  }

  // Add events as posts
  if (props.upcomingEvents) {
    props.upcomingEvents.forEach((event: any, index: number) => {
      posts.push({
        id: `event-${event.id}`,
        author: {
          name: 'Event Organizer',
          username: 'events_team',
          title: 'Alumni Events',
        },
        content: `📅 Upcoming Event: ${event.title}\n\n📍 Location: ${event.location}\n🗓️ Date: ${formatDate(event.date)}`,
        hashtags: [event.category?.name || 'event', 'alumni'],
        images: event.thumbnail ? [event.thumbnail] : [],
        timeAgo: formatTimeAgo(event.created_at),
        likes: Math.floor(Math.random() * 30) + 15,
        comments: Math.floor(Math.random() * 10) + 3,
        reposts: Math.floor(Math.random() * 8) + 1,
      });
    });
  }

  // Add jobs as posts
  if (props.latestJobs) {
    props.latestJobs.forEach((job: any, index: number) => {
      posts.push({
        id: `job-${job.id}`,
        author: {
          name: 'Career Services',
          username: 'career_services',
          title: 'Job Opportunities',
        },
        content: `💼 Job Opportunity: ${job.title}\n\n🏢 Company: ${job.company_name || 'Company'}\n📍 Location: ${job.location}\n💰 Salary: ${job.salary}\n\n${(job.job_context || '').substring(0, 150)}...`,
        hashtags: ['jobs', 'career', 'opportunity'],
        images: job.company_logo ? [job.company_logo] : [],
        timeAgo: formatTimeAgo(job.created_at),
        likes: Math.floor(Math.random() * 25) + 8,
        comments: Math.floor(Math.random() * 15) + 2,
        reposts: Math.floor(Math.random() * 10) + 1,
      });
    });
  }

  return posts.sort(() => Math.random() - 0.5); // Shuffle posts
});

// Helper functions
const formatTimeAgo = (dateString: string) => {
  if (!dateString) return 'recently';
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return 'just now';
  if (diffInHours < 24) return `${diffInHours}h`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d`;
  return date.toLocaleDateString();
};

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// True Contra styling functions - Strategic yellow and black accents
const getPostVariant = (index: number) => {
  // Mostly neutral cards with occasional yellow/black accents
  const variants = ['', '', '', 'card-contra-primary', '', 'card-contra-black'];
  return variants[index % 6];
};

const getAvatarStyle = (index: number) => {
  const styles = [
    'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white border-slate-300 dark:border-slate-600',
    'bg-slate-200 dark:bg-slate-600 text-slate-900 dark:text-white border-slate-400 dark:border-slate-500',
    'bg-slate-300 dark:bg-slate-500 text-slate-900 dark:text-white border-slate-500 dark:border-slate-400',
    'bg-primary-500 text-contra-black-950 border-contra-black-950',
    'bg-slate-400 dark:bg-slate-400 text-white border-slate-600',
    'bg-contra-black-950 text-primary-500 border-primary-500'
  ];
  return styles[index % 6];
};

const getTextColor = (index: number) => {
  const colors = [
    'text-slate-900 dark:text-white',
    'text-slate-900 dark:text-white',
    'text-slate-900 dark:text-white',
    'text-contra-black-950',
    'text-slate-900 dark:text-white',
    'text-primary-500'
  ];
  return colors[index % 6];
};

const getSecondaryTextColor = (index: number) => {
  const colors = [
    'text-slate-600 dark:text-slate-400',
    'text-slate-600 dark:text-slate-400',
    'text-slate-600 dark:text-slate-400',
    'text-contra-black-700',
    'text-slate-600 dark:text-slate-400',
    'text-primary-400'
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
