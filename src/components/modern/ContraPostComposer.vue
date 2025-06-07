<template>
  <div class="space-y-6">
    <!-- User Avatar and Input -->
    <div class="flex space-x-4">
      <div class="relative">
        <div class="w-12 h-12 bg-primary-600 border-2 border-primary-700 rounded-2xl flex items-center justify-center">
          <span class="text-white font-black">U</span>
        </div>
        <!-- Online Status -->
        <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
      </div>

      <div class="flex-1 space-y-4">
        <!-- Main Text Input -->
        <div class="relative">
          <textarea
            v-model="postContent"
            placeholder="What's happening? Share something amazing..."
            class="input-contra resize-none"
            rows="3"
            @input="adjustTextareaHeight"
            ref="textareaRef"
          ></textarea>
          
          <!-- Character Count with Progress Ring -->
          <div class="absolute bottom-3 right-3">
            <div class="relative w-8 h-8">
              <svg class="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
                <circle
                  cx="16"
                  cy="16"
                  r="14"
                  stroke="rgba(255,255,255,0.2)"
                  stroke-width="2"
                  fill="none"
                />
                <circle
                  cx="16"
                  cy="16"
                  r="14"
                  :stroke="characterCount > 280 ? '#f95a2c' : characterCount > 240 ? '#ffbd12' : 'rgba(255,255,255,0.6)'"
                  stroke-width="2"
                  fill="none"
                  :stroke-dasharray="87.96"
                  :stroke-dashoffset="87.96 - (characterCount / 280) * 87.96"
                  class="transition-all duration-300"
                />
              </svg>
              <div class="absolute inset-0 flex items-center justify-center">
                <span 
                  :class="[
                    'text-xs font-bold',
                    characterCount > 280 ? 'text-coral-300' : 'text-white/80'
                  ]"
                >
                  {{ Math.max(0, 280 - characterCount) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Image Preview Grid -->
        <div v-if="selectedImages.length > 0" class="grid grid-cols-2 gap-3">
          <div 
            v-for="(image, index) in selectedImages" 
            :key="index"
            class="relative group"
          >
            <img
              :src="image.preview"
              :alt="`Preview ${index + 1}`"
              class="w-full h-32 object-cover rounded-xl border border-white/20"
            />
            <button
              @click="removeImage(index)"
              class="absolute top-2 right-2 w-6 h-6 bg-coral-500 hover:bg-coral-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110"
            >
              <q-icon name="close" class="text-sm" />
            </button>
            <!-- Image overlay with gradient -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl pointer-events-none"></div>
          </div>
        </div>

        <!-- Poll Options -->
        <div v-if="showPoll" class="space-y-3">
          <div class="flex items-center space-x-2 mb-3">
            <q-icon name="poll" class="text-white/80" />
            <span class="text-sm font-medium text-white/90">Create a poll</span>
          </div>
          
          <div 
            v-for="(option, index) in pollOptions" 
            :key="index"
            class="flex items-center space-x-3"
          >
            <input
              v-model="pollOptions[index]"
              :placeholder="`Option ${index + 1}`"
              class="flex-1 p-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all duration-300"
            />
            <button
              v-if="pollOptions.length > 2"
              @click="removePollOption(index)"
              class="w-8 h-8 bg-coral-500/20 hover:bg-coral-500/40 text-coral-300 rounded-lg flex items-center justify-center transition-all duration-300"
            >
              <q-icon name="remove" class="text-sm" />
            </button>
          </div>
          
          <button
            v-if="pollOptions.length < 4"
            @click="addPollOption"
            class="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white/80 rounded-xl transition-all duration-300"
          >
            <q-icon name="add" class="text-sm" />
            <span class="text-sm">Add option</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Actions and Post Button -->
    <div class="flex items-center justify-between pt-4 border-t border-white/20">
      <!-- Action Buttons -->
      <div class="flex items-center space-x-2">
        <!-- Image Upload -->
        <button
          @click="triggerImageUpload"
          class="w-10 h-10 bg-white/10 hover:bg-white/20 text-white/80 hover:text-white rounded-xl flex items-center justify-center transition-all duration-300 group"
          :disabled="selectedImages.length >= 4"
          :class="{ 'opacity-50 cursor-not-allowed': selectedImages.length >= 4 }"
        >
          <q-icon name="image" class="text-lg group-hover:scale-110 transition-transform duration-300" />
        </button>
        <input
          ref="imageInputRef"
          type="file"
          multiple
          accept="image/*"
          class="hidden"
          @change="handleImageUpload"
        />

        <!-- GIF Button -->
        <button class="w-10 h-10 bg-white/10 hover:bg-white/20 text-white/80 hover:text-white rounded-xl flex items-center justify-center transition-all duration-300 group">
          <q-icon name="gif" class="text-lg group-hover:scale-110 transition-transform duration-300" />
        </button>

        <!-- Poll Button -->
        <button
          @click="showPoll = !showPoll"
          :class="[
            'w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group',
            showPoll 
              ? 'bg-sunshine-500/20 text-sunshine-300' 
              : 'bg-white/10 hover:bg-white/20 text-white/80 hover:text-white'
          ]"
        >
          <q-icon name="poll" class="text-lg group-hover:scale-110 transition-transform duration-300" />
        </button>

        <!-- Emoji Button -->
        <button class="w-10 h-10 bg-white/10 hover:bg-white/20 text-white/80 hover:text-white rounded-xl flex items-center justify-center transition-all duration-300 group">
          <q-icon name="emoji_emotions" class="text-lg group-hover:scale-110 transition-transform duration-300" />
        </button>

        <!-- Location Button -->
        <button class="w-10 h-10 bg-white/10 hover:bg-white/20 text-white/80 hover:text-white rounded-xl flex items-center justify-center transition-all duration-300 group">
          <q-icon name="location_on" class="text-lg group-hover:scale-110 transition-transform duration-300" />
        </button>
      </div>

      <!-- Post Button -->
      <button
        @click="submitPost"
        :disabled="!canPost"
        class="btn-contra bg-white text-slate-900 hover:bg-white/90 disabled:bg-white/20 disabled:text-white/50 shadow-glow-sunshine transform hover:scale-105 active:scale-95"
        :class="{ 'opacity-50 cursor-not-allowed': !canPost }"
      >
        <q-icon name="send" class="mr-2" />
        Post
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue';

defineEmits<{
  'post-created': [];
}>();

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
            preview: e.target?.result as string
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
  
  // Emit event for parent components
  // emit('post-created');
};
</script>

<style scoped>
/* Custom scrollbar for textarea */
textarea::-webkit-scrollbar {
  width: 4px;
}

textarea::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}

textarea::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}

textarea::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
</style>
