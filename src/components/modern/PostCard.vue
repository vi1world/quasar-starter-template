<template>
  <div
    class="card-contra p-6 animate-fade-in bg-white border-2 border-contra-black-950 shadow-contra"
    :style="{ animationDelay: `${index * 0.1}s` }"
  >
    <!-- Post Header -->
    <div class="flex items-center space-x-4 mb-4">
      <div class="relative">
        <div
          class="w-12 h-12 rounded-2xl flex items-center justify-center border-2 bg-primary-500 border-contra-black-950 text-contra-black-950"
        >
          <img
            v-if="post.author?.image"
            :src="post.author.image"
            :alt="post.author.name"
            class="w-full h-full rounded-2xl object-cover"
          />
          <span v-else class="font-black text-lg">{{ getInitials(post.author?.name) }}</span>
        </div>
        <!-- Online Status -->
        <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full"></div>
      </div>

      <div class="flex-1 min-w-0">
        <div class="flex items-center space-x-2">
          <h3 class="text-lg font-black truncate text-contra-black-950">
            {{ post.author?.name || 'Unknown User' }}
          </h3>
          <span v-if="post.author?.username" class="text-sm font-semibold text-gray-600">
            @{{ post.author.username }}
          </span>
          <span class="text-sm text-gray-600">•</span>
          <router-link
            :to="`/posts/${post.slug}`"
            class="text-sm font-medium hover:underline text-gray-600"
          >
            {{ formatTimeAgo(post.created_at) }}
          </router-link>
        </div>
        <p v-if="post.author?.title" class="text-sm font-medium text-gray-600">
          {{ post.author.title }}
        </p>
      </div>

      <!-- Post Actions Menu -->
      <q-btn-dropdown
        class="rounded-xl border-2 transition-all duration-200 border-contra-black-950 hover:bg-primary-500 hover:shadow-contra"
        flat
        no-caps
        dropdown-icon="more_horiz"
      >
        <q-list>
          <q-item clickable v-close-popup @click="editPost">
            <q-item-section avatar>
              <q-icon name="edit" />
            </q-item-section>
            <q-item-section>Edit</q-item-section>
          </q-item>
          <q-item clickable v-close-popup @click="deletePost">
            <q-item-section avatar>
              <q-icon name="delete" />
            </q-item-section>
            <q-item-section>Delete</q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </div>

    <!-- Post Content -->
    <div class="mb-4">
      <div
        class="text-lg leading-relaxed whitespace-pre-wrap font-medium text-contra-black-950 break-words"
        v-html="formatPostContent(post.content)"
      ></div>

      <!-- Link Preview -->
      <div v-if="post.link_preview" class="mt-4">
        <a 
          :href="post.link_preview.url" 
          target="_blank"
          class="block border-2 border-slate-300 dark:border-slate-600 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-200"
        >
          <div v-if="post.link_preview.image" class="aspect-video bg-slate-100">
            <img 
              :src="post.link_preview.image" 
              :alt="post.link_preview.title"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="p-4">
            <h4 class="font-bold text-lg mb-2">{{ post.link_preview.title }}</h4>
            <p class="text-sm text-gray-600 mb-2">{{ post.link_preview.description }}</p>
            <p class="text-xs text-gray-500">{{ post.link_preview.domain }}</p>
          </div>
        </a>
      </div>

      <!-- Hashtags -->
      <div v-if="post.hashtags && post.hashtags.length > 0" class="flex flex-wrap gap-2 mt-4">
        <span
          v-for="tag in post.hashtags"
          :key="tag"
          class="px-3 py-1 rounded-xl text-sm font-black cursor-pointer transition-all duration-200 border-2 bg-primary-100 border-primary-500 text-primary-700 hover:bg-primary-500 hover:text-white"
          @click="searchHashtag(tag)"
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
          @click="openImageModal(image, imgIndex)"
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
          <button
            :class="[
              'flex items-center space-x-2 px-3 py-2 rounded-xl border-2 transition-all duration-200 border-red-300 text-red-600 hover:bg-red-500 hover:text-white hover:border-red-500',
              { 'bg-red-500 text-white border-red-500': post.user_has_liked }
            ]"
            @click="toggleLike"
          >
            <q-icon :name="post.user_has_liked ? 'favorite' : 'favorite_border'" class="text-lg" />
            <span class="text-sm font-black">{{ post.likes_count || 0 }}</span>
          </button>

          <!-- Comment -->
          <button
            class="flex items-center space-x-2 px-3 py-2 rounded-xl border-2 transition-all duration-200 border-blue-300 text-blue-600 hover:bg-blue-500 hover:text-white hover:border-blue-500"
            @click="toggleComments"
          >
            <q-icon name="chat_bubble_outline" class="text-lg" />
            <span class="text-sm font-black">{{ post.comments_count || 0 }}</span>
          </button>

          <!-- Share -->
          <button
            class="flex items-center space-x-2 px-3 py-2 rounded-xl border-2 transition-all duration-200 border-green-300 text-green-600 hover:bg-green-500 hover:text-white hover:border-green-500"
            @click="toggleShare"
          >
            <q-icon name="repeat" class="text-lg" />
            <span class="text-sm font-black">{{ post.shares_count || 0 }}</span>
          </button>
        </div>

        <div class="flex items-center space-x-2">
          <!-- Bookmark -->
          <button
            :class="[
              'p-2 rounded-xl border-2 transition-all duration-200 border-yellow-300 text-yellow-600 hover:bg-yellow-500 hover:text-white hover:border-yellow-500',
              { 'bg-yellow-500 text-white border-yellow-500': post.user_has_bookmarked }
            ]"
            @click="toggleBookmark"
          >
            <q-icon :name="post.user_has_bookmarked ? 'bookmark' : 'bookmark_border'" class="text-lg" />
          </button>

          <!-- Share Menu -->
          <q-btn-dropdown
            class="p-2 rounded-xl border-2 transition-all duration-200 border-purple-300 text-purple-600 hover:bg-purple-500 hover:text-white hover:border-purple-500"
            flat
            no-caps
            dropdown-icon="share"
          >
            <q-list>
              <q-item clickable v-close-popup @click="shareToFacebook">
                <q-item-section avatar>
                  <q-icon name="facebook" />
                </q-item-section>
                <q-item-section>Facebook</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="shareToTwitter">
                <q-item-section avatar>
                  <q-icon name="twitter" />
                </q-item-section>
                <q-item-section>Twitter</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="copyLink">
                <q-item-section avatar>
                  <q-icon name="link" />
                </q-item-section>
                <q-item-section>Copy Link</q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
      </div>
    </div>

    <!-- Comments Section -->
    <div v-if="showComments" class="mt-6 pt-4 border-t-2 border-slate-200 dark:border-slate-700">
      <!-- Comment Form -->
      <div class="flex items-start space-x-3 mb-4">
        <div class="w-8 h-8 bg-primary-500 rounded-xl flex items-center justify-center">
          <span class="text-xs font-black text-contra-black-950">{{ getInitials(currentUser?.name) }}</span>
        </div>
        <div class="flex-1">
          <q-input
            v-model="newComment"
            placeholder="Write your comment..."
            outlined
            dense
            class="mb-2"
            @keyup.enter="submitComment"
          />
          <div class="flex justify-end">
            <q-btn
              label="Comment"
              color="primary"
              size="sm"
              @click="submitComment"
              :disable="!newComment.trim()"
            />
          </div>
        </div>
      </div>

      <!-- Comments List -->
      <div v-if="post.comments && post.comments.length > 0" class="space-y-3">
        <div
          v-for="comment in post.comments"
          :key="comment.id"
          class="flex items-start space-x-3"
        >
          <div class="w-8 h-8 bg-slate-200 rounded-xl flex items-center justify-center">
            <span class="text-xs font-black">{{ getInitials(comment.author?.name) }}</span>
          </div>
          <div class="flex-1">
            <div class="bg-slate-100 rounded-2xl p-3">
              <div class="flex items-center space-x-2 mb-1">
                <span class="font-bold text-sm">{{ comment.author?.name }}</span>
                <span class="text-xs text-gray-500">{{ formatTimeAgo(comment.created_at) }}</span>
              </div>
              <p class="text-sm">{{ comment.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue';
import { useQuasar } from 'quasar';

interface Props {
  post: any;
  index: number;
}

const props = defineProps<Props>();
const $q = useQuasar();

// Inject current user from parent
const currentUser = inject('currentUser', null);

// Component state
const showComments = ref(false);
const newComment = ref('');

// Helper functions
const getInitials = (name: string) => {
  if (!name) return '?';
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
};

const formatTimeAgo = (dateString: string) => {
  if (!dateString) return 'Just now';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  
  return date.toLocaleDateString();
};

const formatPostContent = (content: string) => {
  if (!content) return '';

  // Convert URLs to links with proper truncation
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return content.replace(urlRegex, (url) => {
    const displayUrl = url.length > 50 ? url.substring(0, 47) + '...' : url;
    return `<a href="${url}" target="_blank" class="text-blue-500 hover:underline break-all">${displayUrl}</a>`;
  });
};

// Styling functions

// Action handlers
const toggleLike = () => {
  // TODO: Implement like functionality
  console.log('Toggle like for post:', props.post.slug);
};

const toggleComments = () => {
  showComments.value = !showComments.value;
};

const toggleShare = () => {
  // TODO: Implement share functionality
  console.log('Toggle share for post:', props.post.slug);
};

const toggleBookmark = () => {
  // TODO: Implement bookmark functionality
  console.log('Toggle bookmark for post:', props.post.slug);
};

const submitComment = () => {
  if (!newComment.value.trim()) return;
  
  // TODO: Implement comment submission
  console.log('Submit comment:', newComment.value);
  newComment.value = '';
};

const editPost = () => {
  // TODO: Implement edit functionality
  console.log('Edit post:', props.post.slug);
};

const deletePost = () => {
  // TODO: Implement delete functionality
  console.log('Delete post:', props.post.slug);
};

const searchHashtag = (tag: string) => {
  // TODO: Implement hashtag search
  console.log('Search hashtag:', tag);
};

const openImageModal = (image: string, index: number) => {
  // TODO: Implement image modal
  console.log('Open image modal:', image, index);
};

const shareToFacebook = () => {
  const url = `${window.location.origin}/posts/${props.post.slug}`;
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
};

const shareToTwitter = () => {
  const url = `${window.location.origin}/posts/${props.post.slug}`;
  const text = props.post.content?.substring(0, 100) + '...';
  window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
};

const copyLink = () => {
  const url = `${window.location.origin}/posts/${props.post.slug}`;
  navigator.clipboard.writeText(url);
  $q.notify({
    message: 'Link copied to clipboard!',
    color: 'positive',
    position: 'top'
  });
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
