<template>
  <div class="space-y-4">
    <!-- User Avatar and Input -->
    <div class="flex space-x-3">
      <q-avatar size="48px">
        <img
          src="/images/no_picture_thumb.jpg"
          alt="User Avatar"
          class="rounded-full"
        />
      </q-avatar>
      
      <div class="flex-1">
        <textarea
          v-model="postContent"
          placeholder="What's happening?"
          class="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent resize-none"
          rows="3"
          @input="adjustTextareaHeight"
          ref="textareaRef"
        ></textarea>
        
        <!-- Character Count -->
        <div class="flex justify-end mt-2">
          <span 
            :class="[
              'text-xs',
              characterCount > 280 ? 'text-red-500' : 'text-slate-500 dark:text-slate-400'
            ]"
          >
            {{ characterCount }}/280
          </span>
        </div>
      </div>
    </div>

    <!-- Media Preview -->
    <div v-if="selectedImages.length > 0" class="grid grid-cols-2 gap-2">
      <div
        v-for="(image, index) in selectedImages"
        :key="index"
        class="relative group"
      >
        <img
          :src="image.preview"
          :alt="`Preview ${index + 1}`"
          class="w-full h-32 object-cover rounded-lg"
        />
        <button
          @click="removeImage(index)"
          class="absolute top-2 right-2 w-6 h-6 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <q-icon name="close" class="text-sm" />
        </button>
      </div>
    </div>

    <!-- Poll Preview -->
    <div v-if="showPoll" class="border border-slate-300 dark:border-slate-600 rounded-lg p-4">
      <div class="space-y-3">
        <div
          v-for="(option, index) in pollOptions"
          :key="index"
          class="flex items-center space-x-2"
        >
          <input
            v-model="pollOptions[index]"
            :placeholder="`Option ${index + 1}`"
            class="flex-1 p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
          />
          <button
            v-if="pollOptions.length > 2"
            @click="removePollOption(index)"
            class="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <q-icon name="close" class="text-sm" />
          </button>
        </div>
        
        <div class="flex items-center justify-between">
          <button
            v-if="pollOptions.length < 4"
            @click="addPollOption"
            class="text-sm text-accent-600 dark:text-accent-400 hover:text-accent-700 dark:hover:text-accent-300 font-medium"
          >
            Add option
          </button>
          
          <button
            @click="showPoll = false"
            class="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium"
          >
            Remove poll
          </button>
        </div>
      </div>
    </div>

    <!-- Actions and Post Button -->
    <div class="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-700">
      <!-- Action Buttons -->
      <div class="flex items-center space-x-1">
        <!-- Image Upload -->
        <button
          @click="triggerImageUpload"
          class="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          :disabled="selectedImages.length >= 4"
        >
          <q-icon name="image" class="text-lg" />
        </button>
        <input
          ref="imageInputRef"
          type="file"
          multiple
          accept="image/*"
          class="hidden"
          @change="handleImageUpload"
        />

        <!-- Poll -->
        <button
          @click="togglePoll"
          class="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          :class="{ 'text-accent-600 dark:text-accent-400': showPoll }"
        >
          <q-icon name="poll" class="text-lg" />
        </button>

        <!-- Emoji -->
        <button class="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
          <q-icon name="emoji_emotions" class="text-lg" />
        </button>

        <!-- Location -->
        <button class="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
          <q-icon name="location_on" class="text-lg" />
        </button>
      </div>

      <!-- Post Button -->
      <button
        @click="submitPost"
        :disabled="!canPost"
        class="px-6 py-2 bg-accent-600 hover:bg-accent-700 disabled:bg-slate-300 disabled:dark:bg-slate-600 text-white rounded-lg font-medium transition-colors"
        :class="{ 'opacity-50 cursor-not-allowed': !canPost }"
      >
        Post
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue';

const postContent = ref('');
const selectedImages = ref<Array<{ file: File; preview: string }>>([]);
const showPoll = ref(false);
const pollOptions = ref(['', '']);
const textareaRef = ref<HTMLTextAreaElement>();
const imageInputRef = ref<HTMLInputElement>();

const characterCount = computed(() => postContent.value.length);

const canPost = computed(() => {
  return postContent.value.trim().length > 0 && characterCount.value <= 280;
});

const adjustTextareaHeight = async () => {
  await nextTick();
  if (textareaRef.value) {
    textareaRef.value.style.height = 'auto';
    textareaRef.value.style.height = textareaRef.value.scrollHeight + 'px';
  }
};

const triggerImageUpload = () => {
  imageInputRef.value?.click();
};

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files;
  
  if (files) {
    Array.from(files).forEach(file => {
      if (selectedImages.value.length < 4) {
        const reader = new FileReader();
        reader.onload = (e) => {
          selectedImages.value.push({
            file,
            preview: e.target?.result as string,
          });
        };
        reader.readAsDataURL(file);
      }
    });
  }
  
  // Reset input
  if (target) target.value = '';
};

const removeImage = (index: number) => {
  selectedImages.value.splice(index, 1);
};

const togglePoll = () => {
  showPoll.value = !showPoll.value;
  if (!showPoll.value) {
    pollOptions.value = ['', ''];
  }
};

const addPollOption = () => {
  if (pollOptions.value.length < 4) {
    pollOptions.value.push('');
  }
};

const removePollOption = (index: number) => {
  if (pollOptions.value.length > 2) {
    pollOptions.value.splice(index, 1);
  }
};

const submitPost = () => {
  if (!canPost.value) return;
  
  // Here you would typically send the post data to your backend
  console.log('Submitting post:', {
    content: postContent.value,
    images: selectedImages.value,
    poll: showPoll.value ? pollOptions.value.filter(option => option.trim()) : null,
  });
  
  // Reset form
  postContent.value = '';
  selectedImages.value = [];
  showPoll.value = false;
  pollOptions.value = ['', ''];
  
  // Reset textarea height
  if (textareaRef.value) {
    textareaRef.value.style.height = 'auto';
  }
};
</script>
