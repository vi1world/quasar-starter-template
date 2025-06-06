<script setup lang="ts">
import { ref } from 'vue';
import { usePage } from '@inertiajs/vue3';
import { useMeta } from 'quasar';

// Template Components
import BasePage from '@/components/base/BasePage.vue';
import BaseCard from '@/components/base/BaseCard.vue';
import FeedPostArea from '@/components/feed/FeedPostArea.vue';
import PostsList from '@/components/feed/PostsList.vue';
import { useAuthenStore } from '@/stores/authenStore';
import { FeedSectionWidth } from '@/libs/constant';
import { useLang } from '@/composables/useLang';
import { biChevronDown } from '@quasar/extras/bootstrap-icons';

// Define props interface for Laravel data
interface Event {
  id: number;
  title: string;
  slug: string;
  date: string;
  location: string;
  thumbnail: string;
  type: string;
  category: {
    name: string;
  };
}

interface Job {
  id: number;
  title: string;
  slug: string;
  company_logo: string;
  application_deadline: string;
  job_context: string;
  employee_status: string;
  location: string;
  salary: string;
}

interface Notice {
  id: number;
  title: string;
  slug: string;
  image: string;
  details: string;
  created_at: string;
}

interface News {
  id: number;
  title: string;
  slug: string;
  image: string;
  created_at: string;
  category: {
    name: string;
  };
  author: {
    name: string;
    image: string;
  };
}

interface User {
  id: number;
  name: string;
  email: string;
  image?: string;
  department_name?: string;
  batch_name?: string;
}

interface Routes {
  more_post_load: string;
  posts_delete: string;
  posts_like: string;
  posts_edit: string;
  posts_update: string;
  posts_comments_store: string;
  posts_single: string;
  posts_single_body: string;
  posts_single_likes: string;
  posts_single_comments: string;
  posts_comments_delete: string;
  posts_comments_update: string;
  posts_link_preview: string;
}

interface Props {
  user: User;
  upcomingEvents: Event[];
  recentNews: News[];
  recentNotices: Notice[];
  latestJobs?: Job[];
  routes: Routes;
  meta?: any;
  can?: {
    create_post: boolean;
    view_events: boolean;
    view_jobs: boolean;
  };
}

const props = defineProps<Props>();

const { t } = useLang();

// Set page meta
useMeta({
  title: 'Home',
});

// Reference to PostsList component
const postsListRef = ref<InstanceType<typeof PostsList>>();

// Handle post creation
function handlePostCreated() {
  // Refresh the posts list when a new post is created
  if (postsListRef.value) {
    postsListRef.value.refreshPosts();
  }
}

// Format date helper
function formatDate(dateString: string, format: string = 'M d, Y'): string {
  const date = new Date(dateString);
  if (format === 'F j, g:i A') {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

// Get sub text helper
function getSubText(text: string, length: number = 150): string {
  if (!text) return '';
  return text.length > length ? text.substring(0, length) + '...' : text;
}
</script>

<template>
  <BasePage>
    <div class="row">
      <!-- Main Content -->
      <div class="col-12 col-md-8">
        <!-- Post Creation Area -->
        <FeedPostArea @post-created="handlePostCreated" />

        <!-- Posts Feed Area -->
        <div class="q-mt-md">
          <PostsList ref="postsListRef" />
        </div>
      </div>

      <!-- Right Sidebar -->
      <div class="col-12 col-md-4">
        <div class="q-mx-md">
          <q-scroll-area style="height: 90vh">

            <!-- Upcoming Events Section -->
            <BaseCard v-if="props.upcomingEvents.length > 0" :style="{ width: `${FeedSectionWidth}px` }">
              <q-list>
                <q-item-label header class="row justify-between items-center">
                  <span>{{ t('Upcoming Events') }}</span>
                  <q-btn flat dense size="sm" color="primary" to="/events">
                    {{ t('See All') }}
                    <q-icon :name="biChevronDown" class="q-ml-xs" />
                  </q-btn>
                </q-item-label>

                <q-item v-for="event in props.upcomingEvents" :key="event.id" class="q-pa-sm">
                  <q-item-section avatar>
                    <q-img
                      :src="event.thumbnail"
                      :alt="event.title"
                      width="60px"
                      height="60px"
                      class="rounded-borders"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption class="text-grey-6">
                      {{ formatDate(event.date, 'F j, g:i A') }}
                    </q-item-label>
                    <q-item-label lines="2" class="text-weight-medium">
                      {{ event.title }}
                    </q-item-label>
                    <q-item-label caption class="row items-center">
                      <q-icon name="place" size="12px" class="q-mr-xs" />
                      {{ event.location }}
                    </q-item-label>
                    <q-item-label caption>
                      <q-btn
                        flat
                        dense
                        size="sm"
                        color="primary"
                        :to="`/events/${event.slug}`"
                        class="text-caption q-pa-none"
                      >
                        {{ t('Reservation') }}
                      </q-btn>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </BaseCard>

            <!-- Latest Jobs Section -->
            <BaseCard v-if="props.latestJobs && props.latestJobs.length > 0" :style="{ width: `${FeedSectionWidth}px` }" class="q-mt-md">
              <q-list>
                <q-item-label header class="row justify-between items-center">
                  <span>{{ t('Jobs') }}</span>
                  <q-btn flat dense size="sm" color="primary" to="/jobs">
                    {{ t('See All') }}
                    <q-icon :name="biChevronDown" class="q-ml-xs" />
                  </q-btn>
                </q-item-label>

                <q-item v-for="job in props.latestJobs" :key="job.id" class="q-pa-sm">
                  <q-item-section avatar>
                    <q-avatar size="45px">
                      <img :src="job.company_logo" :alt="job.title" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label lines="1" class="text-weight-medium">
                      {{ job.title }}
                    </q-item-label>
                    <q-item-label caption class="text-grey-6">
                      {{ formatDate(job.application_deadline, 'l, F j, Y') }}
                    </q-item-label>
                    <q-item-label caption lines="2">
                      {{ getSubText(job.job_context, 100) }}
                    </q-item-label>
                    <q-item-label caption>
                      <q-btn
                        flat
                        dense
                        size="sm"
                        color="primary"
                        :to="`/jobs/${job.slug}`"
                        class="text-caption q-pa-none"
                      >
                        {{ t('More Details') }}
                      </q-btn>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </BaseCard>

            <!-- Notices Section -->
            <BaseCard v-if="props.recentNotices.length > 0" :style="{ width: `${FeedSectionWidth}px` }" class="q-mt-md">
              <q-list>
                <q-item-label header class="row justify-between items-center">
                  <span>{{ t('Notice') }}</span>
                  <q-btn flat dense size="sm" color="primary" to="/notices">
                    {{ t('See All') }}
                    <q-icon :name="biChevronDown" class="q-ml-xs" />
                  </q-btn>
                </q-item-label>

                <q-item v-for="notice in props.recentNotices" :key="notice.id" class="q-pa-sm">
                  <q-item-section avatar>
                    <q-img
                      :src="notice.image"
                      :alt="notice.title"
                      width="60px"
                      height="60px"
                      class="rounded-borders"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption class="text-grey-6">
                      {{ formatDate(notice.created_at) }}
                    </q-item-label>
                    <q-item-label lines="2" class="text-weight-medium">
                      {{ notice.title }}
                    </q-item-label>
                    <q-item-label caption lines="2">
                      {{ getSubText(notice.details, 100) }}
                    </q-item-label>
                    <q-item-label caption>
                      <q-btn
                        flat
                        dense
                        size="sm"
                        color="primary"
                        :to="`/notices/${notice.slug}`"
                        class="text-caption q-pa-none"
                      >
                        {{ t('More Details') }}
                      </q-btn>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </BaseCard>

            <!-- Latest News Section -->
            <BaseCard v-if="props.recentNews.length > 0" :style="{ width: `${FeedSectionWidth}px` }" class="q-mt-md">
              <q-list>
                <q-item-label header class="row justify-between items-center">
                  <span>{{ t('Latest News') }}</span>
                  <q-btn flat dense size="sm" color="primary" to="/news">
                    {{ t('See All') }}
                    <q-icon :name="biChevronDown" class="q-ml-xs" />
                  </q-btn>
                </q-item-label>

                <q-item v-for="news in props.recentNews" :key="news.id" class="q-pa-sm">
                  <q-item-section avatar>
                    <q-img
                      :src="news.image"
                      :alt="news.title"
                      width="60px"
                      height="60px"
                      class="rounded-borders"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption class="row items-center q-gutter-xs">
                      <q-chip dense size="sm" color="grey-3" text-color="black">
                        {{ news.category.name }}
                      </q-chip>
                      <span class="text-grey-6">{{ formatDate(news.created_at) }}</span>
                    </q-item-label>
                    <q-item-label lines="2" class="text-weight-medium">
                      {{ news.title }}
                    </q-item-label>
                    <q-item-label caption class="row items-center">
                      <q-avatar size="18px" class="q-mr-xs">
                        <img :src="news.author.image" :alt="news.author.name" />
                      </q-avatar>
                      {{ news.author.name }}
                    </q-item-label>
                    <q-item-label caption>
                      <q-btn
                        flat
                        dense
                        size="sm"
                        color="primary"
                        :to="`/news/${news.slug}`"
                        class="text-caption q-pa-none"
                      >
                        {{ t('More Details') }}
                      </q-btn>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </BaseCard>

          </q-scroll-area>
        </div>
      </div>
    </div>
  </BasePage>
</template>

