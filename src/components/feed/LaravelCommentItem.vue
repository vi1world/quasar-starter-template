<template>
  <q-item :style="isReply ? 'padding-left: 10%' : ''">
    <q-item-section avatar top>
      <q-avatar size="36px">
        <q-img :src="userAvatar" />
      </q-avatar>
    </q-item-section>
    
    <q-item-section>
      <!-- User name and timestamp -->
      <q-item-label lines="1">
        <span class="cursor-pointer text-weight-bold">{{ comment.user.name }}</span>
        <span class="text-muted text-caption q-ml-sm">{{ formattedDate }}</span>
      </q-item-label>
      
      <!-- Comment content -->
      <q-item-label>
        <div
          class="bg-app-content-item q-pa-md"
          style="border-radius: 15px"
        >
          {{ comment.body }}
        </div>
      </q-item-label>
      
      <!-- Actions (Like, Reply) -->
      <q-item-label lines="1">
        <div class="row q-my-sm">
          <div class="q-pr-sm">
            <base-link 
              :label="comment.is_liked ? 'Loved' : 'Love it'" 
              to="#" 
              class="text-caption"
              :class="comment.is_liked ? 'text-pink' : ''"
              @click="handleLike"
            />
            <span v-if="comment.likes_count && comment.likes_count > 0" class="q-mx-sm">
              <q-icon 
                :name="biHeart" 
                :color="comment.is_liked ? 'pink' : 'grey-6'"
              />
              <span class="text-caption text-muted q-ml-xs">{{ comment.likes_count }}</span>
            </span>
          </div>
          
          <q-separator vertical />
          
          <div class="q-pl-sm">
            <base-link 
              label="Reply" 
              to="#" 
              class="text-caption"
              @click="toggleReplyForm"
            />
          </div>
        </div>
      </q-item-label>
      
      <!-- Reply form (if showing) -->
      <div v-if="showReplyForm" class="q-mt-sm">
        <q-input
          v-model="replyText"
          dense
          outlined
          autogrow
          placeholder="Write a reply..."
          maxlength="255"
          counter
        >
          <template #append>
            <q-btn 
              flat 
              round 
              icon="send" 
              color="primary"
              :disable="!replyText.trim()"
              @click="submitReply"
            />
            <q-btn 
              flat 
              round 
              icon="close" 
              @click="cancelReply"
            />
          </template>
        </q-input>
      </div>
      
      <!-- Replies -->
      <div v-if="comment.replies && comment.replies.length > 0" class="q-mt-sm">
        <LaravelCommentItem
          v-for="reply in comment.replies"
          :key="reply.id"
          :comment="reply"
          :post-id="postId"
          :is-reply="true"
          @reply="$emit('reply', $event)"
          @like="$emit('like', $event)"
          @delete="$emit('delete', $event)"
        />
      </div>
    </q-item-section>
    
    <!-- Menu button -->
    <q-item-section side top>
      <q-btn dense :icon="biThreeDots" size="sm" flat round>
        <q-menu>
          <q-list style="min-width: 100px">
            <q-item 
              v-if="canEdit"
              clickable 
              v-close-popup 
              @click="editComment"
            >
              <q-item-section>Edit</q-item-section>
            </q-item>
            <q-item 
              v-if="canDelete"
              clickable 
              v-close-popup 
              @click="deleteComment"
            >
              <q-item-section>Delete</q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="reportComment">
              <q-item-section>Report</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import BaseLink from '@/components/base/BaseLink.vue';
import { AvatarPlaceHolder128 } from '@/libs/constant';
import { biHeart, biThreeDots } from '@quasar/extras/bootstrap-icons';
import { ref, computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import { useQuasar } from 'quasar';

// Props
interface Props {
  comment: {
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
    replies?: any[];
    parent_id?: number;
  };
  postId: number;
  isReply?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isReply: false
});

// Emits
const emit = defineEmits<{
  reply: [commentId: number, replyText: string];
  like: [commentId: number];
  delete: [commentId: number];
}>();

const page = usePage();
const $q = useQuasar();

// Reactive data
const showReplyForm = ref(false);
const replyText = ref('');

// Computed properties
const userAvatar = computed(() => {
  return props.comment.user.image || AvatarPlaceHolder128;
});

const formattedDate = computed(() => {
  return new Date(props.comment.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
});

const currentUser = computed(() => {
  return (page.props as any).auth?.user;
});

const canEdit = computed(() => {
  return currentUser.value?.id === props.comment.user.id;
});

const canDelete = computed(() => {
  return currentUser.value?.id === props.comment.user.id || currentUser.value?.role === 'admin';
});

// Methods
const handleLike = () => {
  emit('like', props.comment.id);
};

const toggleReplyForm = () => {
  showReplyForm.value = !showReplyForm.value;
  if (!showReplyForm.value) {
    replyText.value = '';
  }
};

const submitReply = () => {
  if (replyText.value.trim()) {
    emit('reply', props.comment.id, replyText.value.trim());
    replyText.value = '';
    showReplyForm.value = false;
  }
};

const cancelReply = () => {
  replyText.value = '';
  showReplyForm.value = false;
};

const editComment = () => {
  // TODO: Implement edit functionality
  $q.notify({
    message: 'Edit comment functionality will be implemented next!',
    type: 'info',
    position: 'top'
  });
};

const deleteComment = () => {
  emit('delete', props.comment.id);
};

const reportComment = () => {
  // TODO: Implement report functionality
  $q.notify({
    message: 'Report comment functionality will be implemented next!',
    type: 'info',
    position: 'top'
  });
};
</script>
