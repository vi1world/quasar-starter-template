<template>
  <div class="space-y-6">
    <!-- Upcoming Events -->
    <div v-if="upcomingEvents.length > 0" class="card-contra p-6">
      <div class="flex items-center justify-between mb-6">
        <h4 class="text-xl font-black text-contra-black-950">Upcoming Events</h4>
        <a href="/events" class="text-sm font-medium text-contra-black-950 hover:text-primary-500 flex items-center space-x-1">
          <span>See All</span>
          <q-icon name="arrow_forward" />
        </a>
      </div>
      
      <div class="space-y-4">
        <div v-for="event in upcomingEvents.slice(0, 3)" :key="event.id" class="border-2 border-contra-black-950 rounded-2xl overflow-hidden hover:shadow-contra transition-all duration-200">
          <div class="relative">
            <img :src="getImageUrl(event.thumbnail)" :alt="event.title" class="w-full h-32 object-cover" />
            <div class="absolute top-2 left-2 flex space-x-1">
              <span class="px-2 py-1 bg-white rounded-full text-xs font-medium">{{ getEventType(event.type) }}</span>
              <span class="px-2 py-1 bg-white rounded-full text-xs font-medium">{{ event.category?.name }}</span>
            </div>
          </div>
          <div class="p-4">
            <p class="text-sm text-gray-600 mb-2">{{ formatEventDate(event.date) }}</p>
            <h5 class="font-bold text-contra-black-950 mb-2">{{ event.title }}</h5>
            <div class="flex items-center space-x-1 text-sm text-gray-600 mb-2">
              <q-icon name="location_on" class="text-xs" />
              <span>{{ event.location }}</span>
            </div>
            <a :href="`/events/${event.slug}`" class="text-sm font-medium text-contra-black-950 hover:text-primary-500 underline">
              Reservation
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Latest Jobs -->
    <div v-if="latestJobs.length > 0" class="card-contra p-6">
      <div class="flex items-center justify-between mb-6">
        <h4 class="text-xl font-black text-contra-black-950">Jobs</h4>
        <a href="/jobs" class="text-sm font-medium text-contra-black-950 hover:text-primary-500 flex items-center space-x-1">
          <span>See All</span>
          <q-icon name="arrow_forward" />
        </a>
      </div>
      
      <div class="space-y-4">
        <div v-for="job in latestJobs.slice(0, 3)" :key="job.id" class="border-2 border-contra-black-950 rounded-2xl p-4 hover:shadow-contra transition-all duration-200">
          <div class="flex items-center space-x-3 mb-3">
            <div class="w-12 h-12 bg-gray-100 rounded-2xl border-2 border-contra-black-950 flex items-center justify-center overflow-hidden">
              <img v-if="job.company_logo" :src="getImageUrl(job.company_logo)" :alt="job.title" class="w-full h-full object-cover" />
              <q-icon v-else name="business" class="text-gray-500" />
            </div>
            <div class="flex-1">
              <h5 class="font-bold text-contra-black-950">{{ job.title }}</h5>
              <div class="flex items-center space-x-1 text-xs text-gray-600">
                <q-icon name="event" class="text-xs" />
                <span>{{ formatJobDeadline(job.application_deadline) }}</span>
              </div>
            </div>
          </div>
          
          <p class="text-sm text-gray-600 mb-3">{{ getSubText(job.job_context, 100) }}</p>
          
          <div class="flex items-center justify-between text-xs text-gray-600 mb-3">
            <div class="flex items-center space-x-1">
              <q-icon name="work" class="text-xs" />
              <span>{{ getEmployeeStatus(job.employee_status) }}</span>
            </div>
            <div class="flex items-center space-x-1">
              <q-icon name="location_on" class="text-xs" />
              <span>{{ job.location }}</span>
            </div>
            <div class="flex items-center space-x-1">
              <q-icon name="attach_money" class="text-xs" />
              <span>{{ job.salary }}</span>
            </div>
          </div>
          
          <a :href="`/jobs/${job.slug}`" class="text-sm font-medium text-contra-black-950 hover:text-primary-500 underline">
            More Details
          </a>
        </div>
      </div>
    </div>

    <!-- Latest Notice -->
    <div v-if="latestNotice.length > 0" class="card-contra p-6">
      <div class="flex items-center justify-between mb-6">
        <h4 class="text-xl font-black text-contra-black-950">Notice</h4>
        <a href="/notices" class="text-sm font-medium text-contra-black-950 hover:text-primary-500 flex items-center space-x-1">
          <span>See All</span>
          <q-icon name="arrow_forward" />
        </a>
      </div>
      
      <div class="space-y-4">
        <div v-for="notice in latestNotice.slice(0, 3)" :key="notice.id" class="border-2 border-contra-black-950 rounded-2xl overflow-hidden hover:shadow-contra transition-all duration-200">
          <img :src="getImageUrl(notice.image)" :alt="notice.title" class="w-full h-24 object-cover" />
          <div class="p-4">
            <p class="text-sm text-gray-600 mb-2">{{ formatDate(notice.created_at) }}</p>
            <h5 class="font-bold text-contra-black-950 mb-2">{{ notice.title }}</h5>
            <p class="text-sm text-gray-600 mb-3">{{ getSubText(notice.details, 100) }}</p>
            <a :href="`/notices/${notice.slug}`" class="text-sm font-medium text-contra-black-950 hover:text-primary-500 underline">
              More Details
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Latest News -->
    <div v-if="latestNews.length > 0" class="card-contra p-6">
      <div class="flex items-center justify-between mb-6">
        <h4 class="text-xl font-black text-contra-black-950">Latest News</h4>
        <a href="/news" class="text-sm font-medium text-contra-black-950 hover:text-primary-500 flex items-center space-x-1">
          <span>See All</span>
          <q-icon name="arrow_forward" />
        </a>
      </div>
      
      <div class="space-y-4">
        <div v-for="news in latestNews.slice(0, 3)" :key="news.id" class="border-2 border-contra-black-950 rounded-2xl overflow-hidden hover:shadow-contra transition-all duration-200">
          <img :src="getImageUrl(news.image)" :alt="news.title" class="w-full h-24 object-cover" />
          <div class="p-4">
            <div class="flex items-center space-x-2 mb-2">
              <span class="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium">{{ news.category?.name }}</span>
              <span class="text-sm text-gray-600">{{ formatDate(news.created_at) }}</span>
            </div>
            <h5 class="font-bold text-contra-black-950 mb-2">{{ news.title }}</h5>
            <div class="flex items-center space-x-2 mb-3">
              <div class="w-4 h-4 bg-gray-300 rounded-full overflow-hidden">
                <img v-if="news.author?.image" :src="getImageUrl(news.author.image)" :alt="news.author.name" class="w-full h-full object-cover" />
              </div>
              <span class="text-xs text-gray-600">{{ news.author?.name }}</span>
            </div>
            <a :href="`/news/${news.slug}`" class="text-sm font-medium text-contra-black-950 hover:text-primary-500 underline">
              More Details
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

defineOptions({
  name: 'RealSidebarData',
});

// Props
interface Props {
  upcomingEvents?: any[];
  latestJobs?: any[];
  latestNews?: any[];
  latestNotice?: any[];
}

const props = withDefaults(defineProps<Props>(), {
  upcomingEvents: () => [],
  latestJobs: () => [],
  latestNews: () => [],
  latestNotice: () => []
});

// Helper functions
const getImageUrl = (imagePath: string) => {
  if (!imagePath) return '/assets/images/default-placeholder.jpg';
  if (imagePath.startsWith('http')) return imagePath;
  return `/storage/${imagePath}`;
};

const formatEventDate = (dateString: string) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const formatJobDeadline = (dateString: string) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const getSubText = (text: string, length: number) => {
  if (!text) return '';
  return text.length > length ? text.substring(0, length) + '...' : text;
};

const getEventType = (type: number) => {
  const types = {
    1: 'Online',
    2: 'Offline',
    3: 'Hybrid'
  };
  return types[type as keyof typeof types] || 'Event';
};

const getEmployeeStatus = (status: number) => {
  const statuses = {
    1: 'Full-time',
    2: 'Part-time',
    3: 'Contract',
    4: 'Freelance'
  };
  return statuses[status as keyof typeof statuses] || 'Employment';
};
</script>

<style scoped>
/* Additional styles if needed */
</style>
