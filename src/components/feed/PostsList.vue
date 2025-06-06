<template>
  <div class="posts-list">
    <!-- Loading indicator for initial load -->
    <div v-if="isLoading && posts.length === 0" class="text-center q-pa-md">
      <q-spinner-dots size="40px" color="primary" />
      <div class="q-mt-sm text-grey-6">Loading posts...</div>
    </div>

    <!-- Posts list -->
    <div v-else-if="posts.length > 0">
      <LaravelFeedPost
        v-for="(post, index) in posts"
        :key="post.id"
        :post="post"
        :index="index"
        class="q-mb-md"
      />

      <!-- Load more button -->
      <div v-if="hasMorePosts" class="text-center q-pa-md">
        <q-btn 
          v-if="!isLoading"
          @click="loadMorePosts"
          color="primary"
          outline
          rounded
          label="Load More Posts"
          icon="expand_more"
        />
        <q-spinner-dots v-else size="30px" color="primary" />
      </div>

      <!-- End of posts message -->
      <div v-else class="text-center q-pa-md text-grey-6">
        <q-icon name="check_circle" size="24px" class="q-mr-sm" />
        You're all caught up!
      </div>
    </div>

    <!-- Empty state -->
    <div v-else class="text-center q-pa-xl">
      <q-icon name="post_add" size="64px" color="grey-4" />
      <div class="text-h6 text-grey-6 q-mt-md">No posts yet</div>
      <div class="text-body2 text-grey-5">Be the first to share something!</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue';
import { usePosts } from '@/composables/usePosts';
import { router } from '@inertiajs/vue3';
import LaravelFeedPost from './LaravelFeedPost.vue';

// Use the posts composable
const {
  posts,
  isLoading,
  hasMorePosts,
  loadPosts,
  loadMorePosts,
  refreshPosts,
  toggleLike,
  deletePost
} = usePosts();

// Expose refresh function for parent components
defineExpose({
  refreshPosts
});

// Listen for Inertia navigation events to refresh posts when needed
let removeInertiaListener: (() => void) | null = null;

onMounted(() => {
  // Listen for Inertia finish events (after form submissions)
  removeInertiaListener = router.on('finish', (event) => {
    // Check if this was a successful POST request to posts/store
    if (event.detail.visit.method === 'post' &&
        event.detail.visit.url.pathname === '/posts/store' &&
        !event.detail.visit.hasErrors) {
      // Refresh posts after successful post creation
      console.log('Inertia detected successful post creation, refreshing posts...');
      refreshPosts();
    }
  });
});

onUnmounted(() => {
  if (removeInertiaListener) {
    removeInertiaListener();
  }
});

// Event handlers
function handleLike(postId: number) {
  toggleLike(postId);
}

function handleDelete(postId: number) {
  if (confirm('Are you sure you want to delete this post?')) {
    deletePost(postId);
  }
}

function handleComment(postId: number) {
  // TODO: Implement comment functionality
  console.log('Comment on post:', postId);
}

// Infinite scroll functionality
function handleScroll() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  
  // Load more when user is near bottom (within 200px)
  if (scrollTop + windowHeight >= documentHeight - 200) {
    if (hasMorePosts.value && !isLoading.value) {
      loadMorePosts();
    }
  }
}

// Lifecycle hooks
onMounted(() => {
  // Load initial posts
  loadPosts(1, true);
  
  // Add scroll listener for infinite scroll
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  // Remove scroll listener
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.posts-list {
  min-height: 200px;
}
</style>
