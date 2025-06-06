import { ref, computed } from 'vue';
import { router, usePage } from '@inertiajs/vue3';
import axios from 'axios';
import type { PostData } from '@/types/models';

// Use the PostData interface from the Quasar template
type Post = PostData;

interface PostsResponse {
  data: {
    html: string;
    posts: Post[];
  };
  status: boolean;
  message?: string;
}

export function usePosts() {
  const posts = ref<Post[]>([]);
  const isLoading = ref(false);
  const currentPage = ref(1);
  const hasMorePosts = ref(true);
  const page = usePage();

  // Get CSRF token from Inertia shared props
  function getCsrfToken(): string {
    return (page.props as any).csrf_token || '';
  }

  // Load posts from the server
  async function loadPosts(page: number = 1, reload: boolean = false) {
    if (isLoading.value) return;

    isLoading.value = true;

    try {
      const response = await axios.get('/posts-json', {
        params: {
          page: page,
          _token: getCsrfToken()
        }
      });

      const data = response.data;

      if (data.status && data.data) {
        if (reload || page === 1) {
          posts.value = data.data.posts || [];
          currentPage.value = 1;
        } else {
          posts.value.push(...(data.data.posts || []));
        }

        currentPage.value = page;

        // Check if there are more posts based on pagination info
        hasMorePosts.value = data.data.has_more || false;
      }
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      isLoading.value = false;
    }
  }

  // Load more posts (for infinite scroll)
  async function loadMorePosts() {
    if (!hasMorePosts.value || isLoading.value) return;
    await loadPosts(currentPage.value + 1, false);
  }

  // Refresh posts (reload from beginning)
  async function refreshPosts() {
    await loadPosts(1, true);
  }

  // Add a new post to the beginning of the list
  function addPost(post: Post) {
    posts.value.unshift(post);
  }

  // Remove a post from the list
  function removePost(postId: number) {
    const index = posts.value.findIndex(p => p.id === postId);
    if (index !== -1) {
      posts.value.splice(index, 1);
    }
  }

  // Update a post in the list
  function updatePost(postId: number, updatedPost: Partial<Post>) {
    const index = posts.value.findIndex(p => p.id === postId);
    if (index !== -1) {
      posts.value[index] = { ...posts.value[index], ...updatedPost };
    }
  }

  // Create a new post
  async function createPost(body: string, files?: File[]): Promise<boolean> {
    try {
      const formData = new FormData();
      formData.append('body', body);
      formData.append('_token', getCsrfToken());

      if (files) {
        files.forEach((file, index) => {
          formData.append(`files[${index}]`, file);
        });
      }

      const response = await axios.post('/posts/store', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-Inertia': 'true',
          'X-Inertia-Version': (page.props as any).version || '',
        },
      });

      if (response.data.status) {
        // Reload posts to show the new post
        await loadPosts(1, true);
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error creating post:', error);
      return false;
    }
  }

  // Like/unlike a post
  async function toggleLike(postId: number) {
    try {
      const response = await axios.post('/posts/like', {
        post_id: postId,
        _token: getCsrfToken()
      });

      if (response.data.status) {
        const post = posts.value.find(p => p.id === postId);
        if (post && post.laravel_data) {
          post.laravel_data.is_liked = !post.laravel_data.is_liked;
          post.laravel_data.likes_count += post.laravel_data.is_liked ? 1 : -1;
        }
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  }

  // Delete a post
  async function deletePost(postId: number) {
    try {
      const response = await axios.delete('/posts/delete', {
        data: {
          id: postId,
          _token: getCsrfToken()
        }
      });

      if (response.data.status) {
        removePost(postId);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  }

  return {
    posts: computed(() => posts.value),
    isLoading: computed(() => isLoading.value),
    hasMorePosts: computed(() => hasMorePosts.value),
    currentPage: computed(() => currentPage.value),
    loadPosts,
    loadMorePosts,
    refreshPosts,
    addPost,
    removePost,
    updatePost,
    createPost,
    toggleLike,
    deletePost
  };
}
