<template>
  <BaseCard>
    <q-form @submit.prevent="submitPost">
      <q-card-section>
        <q-item>
          <q-item-section avatar>
            <q-avatar size="48px" class="shadow-5">
              <q-img :src="userAvatar" spinner-color="white" no-native-menu />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-input
              v-model="postBody"
              type="textarea"
              :placeholder="t('dSologan')"
              outlined
              dense
              rows="1"
              style="border-radius: 25px"
              class="bg-app-content-item"
              @focus="expandTextarea"
              @blur="collapseTextarea"
            />
          </q-item-section>
          <q-item-section v-if="!isSmallScreen" side>
            <q-btn
              type="submit"
              class="text-capitalize"
              :icon="biPencil"
              color="primary"
              label="Post it!"
              unelevated
              rounded
              :loading="form.processing"
              :disable="!postBody.trim()"
            />
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-actions align="around">
        <q-btn
          class="text-capitalize"
          color="info"
          flat
          :icon="biCardImage"
          label="Photo"
          @click="triggerFileUpload('image')"
        />
        <q-separator vertical />
        <q-btn
          class="text-capitalize"
          color="green"
          flat
          :icon="biPlayBtn"
          label="Video"
          @click="triggerFileUpload('video')"
        />
        <q-separator vertical />
        <q-btn
          class="text-capitalize"
          color="orange"
          flat
          :icon="biPencilSquare"
          label="Write article"
          @click="goToArticleCreate"
        />
      </q-card-actions>

      <!-- Hidden file input -->
      <input
        ref="fileInput"
        type="file"
        style="display: none"
        multiple
        @change="handleFileSelect"
      />
    </q-form>
  </BaseCard>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { usePage, router, useForm } from '@inertiajs/vue3';
import { useLang } from '@/composables/useLang';
import { useAuthenStore } from '@/stores/authenStore';
import { biCardImage, biPencil, biPencilSquare, biPlayBtn } from '@quasar/extras/bootstrap-icons';
import BaseCard from '../base/BaseCard.vue';
import { useDevice } from 'src/composables/useDevice';



const { t } = useLang();
const authenStore = useAuthenStore();
const { isSmallScreen } = useDevice();
const page = usePage();

// Define emits
const emit = defineEmits<{
  postCreated: [];
}>();

const postBody = ref('');
const fileInput = ref<HTMLInputElement>();
const selectedFiles = ref<File[]>([]);

// Use Inertia's useForm for proper CSRF handling
const form = useForm({
  body: '',
  file: [] as File[]
});

// Get user avatar from props or auth store
const userAvatar = computed(() => {
  const pageProps = page.props as any;
  return pageProps.user?.image || authenStore.loginedAvatar || '/images/no_picture_thumb.jpg';
});

// Submit post using Inertia's useForm (handles CSRF automatically)
function submitPost() {
  if (!postBody.value.trim()) return;

  // Check minimum length requirement (PostRequest requires min:2)
  if (postBody.value.trim().length < 2) {
    alert('Post must be at least 2 characters long.');
    return;
  }

  // Update form data
  form.body = postBody.value;
  form.file = selectedFiles.value;

  // Debug: Log what we're sending
  console.log('=== INERTIA FORM SUBMISSION ===');
  console.log('Body:', form.body);
  console.log('Files count:', form.file.length);
  console.log('Form processing:', form.processing);

  // Submit using Inertia (handles CSRF automatically)
  // Use the correct Laravel route: /posts/store
  form.post('/posts/store', {
    preserveScroll: true,
    preserveState: false, // Allow state refresh to update posts
    onSuccess: () => {
      console.log('Post created successfully!');

      // Reset form and UI
      postBody.value = '';
      selectedFiles.value = [];
      form.reset();

      // Clear file input
      if (fileInput.value) {
        fileInput.value.value = '';
      }

      // Emit event to parent to refresh posts
      emit('postCreated');
    },
    onError: (errors) => {
      console.error('Post submission error:', errors);

      let errorMessage = 'Failed to create post. Please try again.';
      if (errors.body) {
        errorMessage = Array.isArray(errors.body) ? errors.body[0] : errors.body;
      } else if (errors.file) {
        errorMessage = Array.isArray(errors.file) ? errors.file[0] : errors.file;
      }

      alert(errorMessage);
    },
    onFinish: () => {
      // This runs regardless of success or error
      console.log('Form submission finished');
    }
  });
}

// Handle file selection
function handleFileSelect(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    selectedFiles.value = Array.from(target.files);
  }
}

// Trigger file upload
function triggerFileUpload(type: 'image' | 'video') {
  if (fileInput.value) {
    if (type === 'image') {
      fileInput.value.accept = '.png,.jpg,.svg,.jpeg,.gif';
    } else if (type === 'video') {
      fileInput.value.accept = '.mp4,.mov,.avi,.mkv,.webm,.flv';
    }
    fileInput.value.click();
  }
}

// Navigate to article creation
function goToArticleCreate() {
  router.visit('/articles/create');
}

// Expand textarea on focus
function expandTextarea(event: Event) {
  const target = event.target as HTMLTextAreaElement;
  target.rows = 3;
}

// Collapse textarea on blur if empty
function collapseTextarea(event: Event) {
  const target = event.target as HTMLTextAreaElement;
  if (!postBody.value.trim()) {
    target.rows = 1;
  }
}
</script>
