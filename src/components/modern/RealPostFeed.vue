<template>
  <div class="space-y-6">
    <!-- Real Post Creation Form -->
    <div class="card-contra p-6">
      <h4 class="text-xl font-black text-contra-black-950 mb-6">Create Post</h4>
      
      <!-- User Info -->
      <div class="flex items-center space-x-3 mb-4">
        <div class="w-12 h-12 bg-primary-500 rounded-2xl border-2 border-contra-black-950 flex items-center justify-center">
          <span class="font-black text-lg text-contra-black-950">{{ userInitial }}</span>
        </div>
        <h4 class="text-lg font-medium text-contra-black-950">{{ user?.name || 'User' }}</h4>
      </div>

      <!-- Post Form -->
      <form @submit.prevent="submitPost" class="space-y-4">
        <div>
          <textarea
            v-model="postBody"
            class="input-contra w-full h-32 resize-none"
            placeholder="What's on your mind?"
            required
          ></textarea>
        </div>

        <!-- File Upload -->
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <p class="text-sm font-medium text-gray-700">Add to your post:</p>
            <div class="flex items-center space-x-2">
              <label for="file-upload" class="cursor-pointer p-2 rounded-xl border-2 border-contra-black-950 hover:bg-primary-500 transition-all duration-200">
                <q-icon name="image" class="text-lg" />
              </label>
              <input
                id="file-upload"
                type="file"
                multiple
                accept=".png,.jpg,.svg,.jpeg,.gif,.mp4,.mov,.avi,.mkv,.webm,.flv"
                @change="handleFileUpload"
                class="hidden"
              />
              <label for="file-upload" class="cursor-pointer p-2 rounded-xl border-2 border-contra-black-950 hover:bg-primary-500 transition-all duration-200">
                <q-icon name="videocam" class="text-lg" />
              </label>
            </div>
          </div>
          
          <button
            type="submit"
            :disabled="!postBody.trim() || isSubmitting"
            class="btn-contra-primary"
          >
            {{ isSubmitting ? 'Posting...' : 'Post Now' }}
          </button>
        </div>

        <!-- File Preview -->
        <div v-if="selectedFiles.length > 0" class="space-y-2">
          <div v-for="(file, index) in selectedFiles" :key="index" class="flex items-center justify-between p-2 bg-gray-100 rounded-xl">
            <span class="text-sm">{{ file.name }}</span>
            <button @click="removeFile(index)" type="button" class="text-red-500 hover:text-red-700">
              <q-icon name="close" />
            </button>
          </div>
        </div>
      </form>
    </div>

    <!-- Real Posts Container -->
    <div id="post-block" class="space-y-6">
      <!-- Posts will be loaded here via AJAX -->
    </div>

    <!-- Load More Button -->
    <div class="text-center">
      <button 
        @click="loadMorePosts"
        class="btn-contra-primary transform hover:scale-105 active:scale-95"
        :disabled="isLoading"
      >
        <q-icon name="refresh" class="mr-2" />
        {{ isLoading ? 'Loading...' : 'Load more amazing posts' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, inject } from 'vue';
import { router } from '@inertiajs/vue3';

defineOptions({
  name: 'RealPostFeed',
});

// Props
interface Props {
  user?: any;
}

const props = withDefaults(defineProps<Props>(), {
  user: () => ({})
});

// Reactive data
const postBody = ref('');
const selectedFiles = ref<File[]>([]);
const isSubmitting = ref(false);
const isLoading = ref(false);

// Computed
const userInitial = computed(() => {
  return props.user?.name?.charAt(0)?.toUpperCase() || 'U';
});

// Methods
const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    selectedFiles.value = Array.from(target.files);
  }
};

const removeFile = (index: number) => {
  selectedFiles.value.splice(index, 1);
};

const submitPost = async () => {
  if (!postBody.value.trim()) return;
  
  isSubmitting.value = true;
  
  try {
    const formData = new FormData();
    formData.append('body', postBody.value);
    formData.append('_token', document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '');
    
    // Add files
    selectedFiles.value.forEach((file, index) => {
      formData.append(`file[${index}]`, file);
    });

    const response = await fetch('/posts', {
      method: 'POST',
      body: formData,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    });

    if (response.ok) {
      // Reset form
      postBody.value = '';
      selectedFiles.value = [];
      
      // Reload posts
      await loadPosts();
      
      // Show success message
      console.log('Post created successfully');
    } else {
      console.error('Failed to create post');
    }
  } catch (error) {
    console.error('Error creating post:', error);
  } finally {
    isSubmitting.value = false;
  }
};

const loadPosts = async () => {
  try {
    const response = await fetch('/more-post-load', {
      method: 'GET',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      const postBlock = document.getElementById('post-block');
      if (postBlock && data.status && data.data && data.data.html) {
        postBlock.innerHTML = data.data.html;

        // Re-initialize any JavaScript functionality for the new posts
        // This ensures that like buttons, comment forms, etc. work properly
        if (window.loadLike) {
          // Re-bind event listeners for the new content
          setTimeout(() => {
            // Trigger any post-load JavaScript initialization
            if (window.initializePostInteractions) {
              window.initializePostInteractions();
            }
          }, 100);
        }
      }
    }
  } catch (error) {
    console.error('Error loading posts:', error);
  }
};

const loadMorePosts = async () => {
  isLoading.value = true;
  try {
    await loadPosts();
  } finally {
    isLoading.value = false;
  }
};

// Lifecycle
onMounted(() => {
  loadPosts();
});
</script>

<style scoped>
/* Additional styles if needed */
</style>
