<template>
  <q-item>
    <q-item-section avatar top>
      <q-avatar size="36px">
        <img :src="currentUserAvatar" />
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <q-input
        dense
        outlined
        v-model="commentText"
        type="textarea"
        autogrow
        label="Add comment"
        counter
        maxlength="255"
        :loading="isSubmitting"
        @keydown.ctrl.enter="submitComment"
        @keydown.meta.enter="submitComment"
      >
        <template #append>
          <q-btn 
            flat 
            round 
            :icon="biEmojiSmile" 
            @click="toggleEmojiPicker"
          >
            <q-tooltip>Add emoji</q-tooltip>
          </q-btn>
          <q-btn 
            flat 
            round 
            :icon="biImage" 
            @click="selectImage"
          >
            <q-tooltip>Add image</q-tooltip>
          </q-btn>
          <q-btn 
            v-if="commentText.trim()"
            flat 
            round 
            icon="send" 
            color="primary"
            @click="submitComment"
          >
            <q-tooltip>Post comment (Ctrl+Enter)</q-tooltip>
          </q-btn>
        </template>
      </q-input>
      
      <!-- File input for images (hidden) -->
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        multiple
        style="display: none"
        @change="handleFileSelect"
      />
      
      <!-- Selected images preview -->
      <div v-if="selectedImages.length > 0" class="q-mt-sm">
        <div class="row q-gutter-sm">
          <div 
            v-for="(image, index) in selectedImages" 
            :key="index"
            class="relative-position"
          >
            <q-img
              :src="image.preview"
              style="width: 60px; height: 60px; border-radius: 8px;"
              class="cursor-pointer"
            />
            <q-btn
              round
              dense
              size="xs"
              icon="close"
              color="negative"
              class="absolute-top-right"
              style="margin: -8px;"
              @click="removeImage(index)"
            />
          </div>
        </div>
      </div>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { AvatarPlaceHolder128 } from '@/libs/constant';
import { biEmojiSmile, biImage } from '@quasar/extras/bootstrap-icons';
import { ref, computed } from 'vue';
import { useQuasar } from 'quasar';
import { usePage } from '@inertiajs/vue3';
import axios from 'axios';

// Props
interface Props {
  postId: number;
  postSlug?: string; // Add optional post slug
}

const props = defineProps<Props>();
const emit = defineEmits<{
  commentAdded: [];
}>();
const $q = useQuasar();
const page = usePage();

// Reactive data
const commentText = ref('');
const isSubmitting = ref(false);
const selectedImages = ref<Array<{ file: File; preview: string }>>([]);
const fileInput = ref<HTMLInputElement>();

// Computed properties
const currentUserAvatar = computed(() => {
  const auth = (page.props as any).auth;
  if (auth?.user?.image) {
    return auth.user.image;
  }
  return AvatarPlaceHolder128;
});

// Methods
const toggleEmojiPicker = () => {
  // TODO: Implement emoji picker
  $q.notify({
    message: 'Emoji picker coming soon!',
    type: 'info',
    position: 'top'
  });
};

const selectImage = () => {
  fileInput.value?.click();
};

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files;
  
  if (files) {
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          selectedImages.value.push({
            file,
            preview: e.target?.result as string
          });
        };
        reader.readAsDataURL(file);
      }
    });
  }
  
  // Reset the input
  if (target) {
    target.value = '';
  }
};

const removeImage = (index: number) => {
  selectedImages.value.splice(index, 1);
};

const submitComment = async () => {
  if (!commentText.value.trim() && selectedImages.value.length === 0) {
    return;
  }
  
  isSubmitting.value = true;
  
  try {
    const formData = new FormData();
    formData.append('body', commentText.value.trim());
    formData.append('post_id', props.postId.toString());
    formData.append('_token', (page.props as any).csrf_token || '');
    
    // Add images if any
    selectedImages.value.forEach((image, index) => {
      formData.append(`images[${index}]`, image.file);
    });
    
    // Check if we have a post slug
    if (!props.postSlug) {
      throw new Error('Post slug is required for comment submission');
    }

    // Submit comment to Laravel backend
    const response = await axios.post('/posts/posts/comments', {
      body: commentText.value.trim(),
      slug: props.postSlug,
      _token: (page.props as any).csrf_token || '',
    });

    if (response.data.status) {
      $q.notify({
        message: response.data.message || 'Comment posted successfully!',
        type: 'positive',
        position: 'top'
      });

      // Reset form
      commentText.value = '';
      selectedImages.value = [];

      // Emit event to refresh comments
      emit('commentAdded');
    } else {
      throw new Error(response.data.message || 'Failed to post comment');
    }
    
  } catch (error) {
    console.error('Error submitting comment:', error);
    $q.notify({
      message: 'Failed to post comment. Please try again.',
      type: 'negative',
      position: 'top'
    });
  } finally {
    isSubmitting.value = false;
  }
};
</script>
