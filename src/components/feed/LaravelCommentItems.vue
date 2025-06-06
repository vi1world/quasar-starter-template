<template>
  <div v-if="comments.length > 0">
    <q-list>
      <LaravelCommentItem 
        v-for="comment in comments" 
        :key="comment.id"
        :comment="comment"
        :post-id="postId"
        @reply="handleReply"
        @like="handleLike"
        @delete="handleDelete"
      />
    </q-list>
    
    <!-- Load more comments button -->
    <div v-if="hasMoreComments" class="text-center q-pa-sm">
      <q-btn 
        label="Load more comments..." 
        class="text-capitalize" 
        flat 
        :loading="loadingMore"
        @click="loadMoreComments"
      />
    </div>
  </div>
  
  <!-- No comments message -->
  <div v-else class="text-center q-pa-md text-grey-6">
    <q-icon name="chat_bubble_outline" size="2rem" class="q-mb-sm" />
    <div>No comments yet. Be the first to comment!</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { usePage } from '@inertiajs/vue3';
import axios from 'axios';
import LaravelCommentItem from './LaravelCommentItem.vue';

// Props
interface Props {
  postId: number;
  postSlug?: string; // Add optional post slug
  initialComments?: Comment[];
  commentsCount?: number;
}

interface Comment {
  id: number;
  body: string;
  created_at: string;
  user: {
    id: number;
    name: string;
    image?: string;
  };
  likes_count?: number;
  is_liked?: boolean;
  replies?: Comment[];
  parent_id?: number;
}

const props = withDefaults(defineProps<Props>(), {
  initialComments: () => [],
  commentsCount: 0
});

const $q = useQuasar();
const page = usePage();

// Reactive data
const comments = ref<Comment[]>(props.initialComments);
const loadingMore = ref(false);
const currentPage = ref(1);
const isLoading = ref(false);

// Computed properties
const hasMoreComments = computed(() => {
  return comments.value.length < props.commentsCount;
});

// Methods
const loadMoreComments = async () => {
  if (loadingMore.value) return;
  
  loadingMore.value = true;
  
  try {
    // TODO: Implement API call to load more comments
    $q.notify({
      message: 'Load more comments functionality will be implemented next!',
      type: 'info',
      position: 'top'
    });
    
    currentPage.value++;
  } catch (error) {
    console.error('Error loading more comments:', error);
    $q.notify({
      message: 'Failed to load more comments',
      type: 'negative',
      position: 'top'
    });
  } finally {
    loadingMore.value = false;
  }
};

const handleReply = (commentId: number, replyText: string) => {
  // TODO: Implement reply functionality
  console.log('Reply to comment:', commentId, replyText);
  $q.notify({
    message: 'Reply functionality will be implemented next!',
    type: 'info',
    position: 'top'
  });
};

const handleLike = (commentId: number) => {
  // TODO: Implement like functionality
  console.log('Like comment:', commentId);
  $q.notify({
    message: 'Comment like functionality will be implemented next!',
    type: 'info',
    position: 'top'
  });
};

const handleDelete = (commentId: number) => {
  // TODO: Implement delete functionality
  console.log('Delete comment:', commentId);
  $q.dialog({
    title: 'Delete Comment',
    message: 'Are you sure you want to delete this comment?',
    cancel: true,
    persistent: true
  }).onOk(() => {
    $q.notify({
      message: 'Delete functionality will be implemented next!',
      type: 'info',
      position: 'top'
    });
  });
};

// Simple load comments function
const loadComments = async () => {
  if (isLoading.value || !props.postSlug) return;

  isLoading.value = true;

  try {
    const response = await axios.get('/posts/comments-json', {
      params: { slug: props.postSlug }
    });

    if (response.data.status) {
      comments.value = response.data.data.comments || [];
      console.log('Comments loaded:', comments.value);
    }
  } catch (error) {
    console.error('Error loading comments:', error);
    $q.notify({
      message: 'Failed to load comments',
      type: 'negative',
      position: 'top'
    });
  } finally {
    isLoading.value = false;
  }
};

// Refresh comments (exposed to parent)
const refreshComments = async () => {
  await loadComments();
};

// Expose functions to parent component
defineExpose({
  refreshComments
});

// Initialize comments on mount
onMounted(() => {
  // Load comments if we have a post slug
  if (props.postSlug) {
    loadComments();
  }
});
</script>
