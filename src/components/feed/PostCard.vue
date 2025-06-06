<template>
  <BaseCard class="post-card">
    <!-- Post Header -->
    <div class="row items-center q-pa-md q-pb-sm">
      <q-avatar size="40px" class="q-mr-sm">
        <img 
          :src="post.user.image || '/images/no_picture_thumb.jpg'" 
          :alt="post.user.name"
        />
      </q-avatar>
      <div class="col">
        <div class="text-weight-medium">{{ post.user.name }}</div>
        <div class="text-caption text-grey-6">{{ formatDate(post.created_at) }}</div>
      </div>
      <q-btn 
        flat 
        round 
        dense 
        icon="more_vert"
        size="sm"
        class="text-grey-6"
      >
        <q-menu>
          <q-list dense>
            <q-item 
              v-if="canEdit"
              clickable 
              v-close-popup
              @click="$emit('edit', post.id)"
            >
              <q-item-section avatar>
                <q-icon name="edit" size="18px" />
              </q-item-section>
              <q-item-section>Edit</q-item-section>
            </q-item>
            <q-item 
              v-if="canDelete"
              clickable 
              v-close-popup
              @click="$emit('delete', post.id)"
              class="text-negative"
            >
              <q-item-section avatar>
                <q-icon name="delete" size="18px" />
              </q-item-section>
              <q-item-section>Delete</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section avatar>
                <q-icon name="report" size="18px" />
              </q-item-section>
              <q-item-section>Report</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>

    <!-- Post Content -->
    <div class="q-px-md q-pb-sm">
      <div class="text-body1" v-html="formatPostBody(post.body)"></div>
    </div>

    <!-- Post Files/Media -->
    <div v-if="post.files && post.files.length > 0" class="q-px-md q-pb-sm">
      <div class="row q-gutter-sm">
        <div 
          v-for="file in post.files" 
          :key="file.id"
          class="col-12 col-sm-6"
        >
          <q-img
            v-if="isImage(file.file_type)"
            :src="file.file_path"
            :alt="`Post image ${file.id}`"
            class="rounded-borders cursor-pointer"
            style="max-height: 300px"
            @click="openImageViewer(file.file_path)"
          />
          <q-card
            v-else
            flat
            bordered
            class="q-pa-sm"
          >
            <div class="row items-center">
              <q-icon 
                :name="getFileIcon(file.file_type)" 
                size="24px" 
                class="q-mr-sm text-grey-6"
              />
              <div class="col">
                <div class="text-body2">{{ getFileName(file.file_path) }}</div>
                <div class="text-caption text-grey-6">{{ file.file_type }}</div>
              </div>
              <q-btn
                flat
                round
                dense
                icon="download"
                size="sm"
                :href="file.file_path"
                target="_blank"
              />
            </div>
          </q-card>
        </div>
      </div>
    </div>

    <!-- Post Actions -->
    <q-separator />
    <div class="row items-center q-pa-sm">
      <q-btn
        flat
        dense
        :color="post.is_liked ? 'red' : 'grey-6'"
        :icon="post.is_liked ? 'favorite' : 'favorite_border'"
        :label="post.likes_count || ''"
        @click="$emit('like', post.id)"
        class="q-mr-sm"
      />
      <q-btn
        flat
        dense
        color="grey-6"
        icon="chat_bubble_outline"
        :label="post.comments_count || ''"
        @click="$emit('comment', post.id)"
        class="q-mr-sm"
      />
      <q-btn
        flat
        dense
        color="grey-6"
        icon="share"
        @click="sharePost"
        class="q-mr-sm"
      />
      <q-space />
      <q-btn
        flat
        dense
        color="grey-6"
        icon="bookmark_border"
        size="sm"
      />
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import BaseCard from '../base/BaseCard.vue';

// Post interface
interface PostFile {
  id: number;
  file_path: string;
  file_type: string;
}

interface PostUser {
  id: number;
  name: string;
  image?: string;
}

interface Post {
  id: number;
  body: string;
  created_at: string;
  updated_at: string;
  user: PostUser;
  files?: PostFile[];
  likes_count: number;
  comments_count: number;
  is_liked: boolean;
}

// Props
interface Props {
  post: Post;
}

const props = defineProps<Props>();

// Emits
defineEmits<{
  like: [postId: number];
  delete: [postId: number];
  edit: [postId: number];
  comment: [postId: number];
}>();

// Get current user for permission checks
const page = usePage();
const currentUser = computed(() => (page.props as any).user);

// Permission checks
const canEdit = computed(() => {
  return currentUser.value && currentUser.value.id === props.post.user.id;
});

const canDelete = computed(() => {
  return currentUser.value && currentUser.value.id === props.post.user.id;
});

// Helper functions
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  
  return date.toLocaleDateString();
}

function formatPostBody(body: string): string {
  // Convert hashtags to styled spans
  return body.replace(/#([a-zA-Z0-9_]+)/g, '<span class="text-primary text-weight-bold">#$1</span>');
}

function isImage(fileType: string): boolean {
  return fileType.startsWith('image/');
}

function getFileIcon(fileType: string): string {
  if (fileType.startsWith('image/')) return 'image';
  if (fileType.startsWith('video/')) return 'videocam';
  if (fileType.startsWith('audio/')) return 'audiotrack';
  if (fileType.includes('pdf')) return 'picture_as_pdf';
  if (fileType.includes('word')) return 'description';
  if (fileType.includes('excel') || fileType.includes('spreadsheet')) return 'table_chart';
  return 'insert_drive_file';
}

function getFileName(filePath: string): string {
  return filePath.split('/').pop() || 'Unknown file';
}

function openImageViewer(imagePath: string) {
  // TODO: Implement image viewer/lightbox
  window.open(imagePath, '_blank');
}

function sharePost() {
  // TODO: Implement share functionality
  if (navigator.share) {
    navigator.share({
      title: `Post by ${props.post.user.name}`,
      text: props.post.body,
      url: window.location.href
    });
  } else {
    // Fallback: copy to clipboard
    navigator.clipboard.writeText(window.location.href);
  }
}
</script>

<style scoped>
.post-card {
  margin-bottom: 16px;
}

.post-card :deep(.q-card__section) {
  padding: 0;
}
</style>
