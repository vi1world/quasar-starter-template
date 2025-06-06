<template>
  <BaseCard>
    <!-- Reference Item (if exists) -->
    <slot name="refrenceItem">
      <template v-if="post.reference">
        <q-item>
          <q-item-section avatar>
            <q-avatar size="30px">
              <img
                class="bg-gray-8"
                src="https://i.pravatar.cc/450"
                spinner-color="white"
                no-native-menu
              />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>
              <profile-name :label="post.reference.name" color="wee-text-head" to="/user/bekaku" />
              <span class="text-caption q-ml-sm text-muted">{{
                post.reference.activity
              }}</span>
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon :name="post.reference.activityIcon" />
          </q-item-section>
        </q-item>
        <q-separator />
      </template>
    </slot>

    <!-- Header -->
    <slot name="header">
      <q-item>
        <q-item-section avatar top>
          <q-avatar size="48px">
            <q-img
              class="bg-gray-8"
              :src="userAvatar"
              spinner-color="white"
              no-native-menu
            />
            <q-badge
              floating
              color="positive"
              rounded
              transparent
              class="absolute"
              style="top: 30px"
            />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-weight-bold cursor-pointer">
            <profile-name
              :label="userName"
              color="wee-text-head wee-text-weight-bold"
              :to="`/user/${post.laravel_data.user.id}`"
            />
          </q-item-label>
          <q-item-label caption>
            {{ appFormatDateTime(post.postDatetime, FORMAT_DATE12) }}
          </q-item-label>
        </q-item-section>
        <q-item-section side top>
          <post-menu />
        </q-item-section>
      </q-item>
    </slot>

    <!-- Content -->
    <slot name="description">
      <q-card-section>
        <content-item
          :wrap-text="true"
          :content="post.content"
          :content-id="contentUniqeId"
          :open-post-view="false"
          :show-copy-text="false"
          :show-more="false"
          :showBackground="false"
        />
      </q-card-section>
    </slot>

    <!-- Hashtags -->
    <slot name="hashtag">
      <post-hashtag v-if="post.hashtag.length > 0" :items="post.hashtag" />
    </slot>

    <!-- Photos/Gallery -->
    <slot name="photos">
      <post-gallerry v-if="post.gallery.length > 0" :items="post.gallery" />
    </slot>

    <!-- Open Graph -->
    <template v-if="post.gallery.length == 0 && opengraphItem">
      <OpenGraphItem :item="opengraphItem" />
    </template>

    <!-- Engaging - Show real Laravel data -->
    <slot name="engaging">
      <div v-if="post.laravel_data" class="q-px-md q-pb-sm">
        <div class="row items-center text-caption text-grey-6">
          <div class="col">
            <span v-if="post.laravel_data.likes_count > 0">
              {{ post.laravel_data.likes_count }} {{ post.laravel_data.likes_count === 1 ? 'like' : 'likes' }}
            </span>
          </div>
          <div class="col-auto">
            <span v-if="post.laravel_data.comments_count > 0">
              {{ post.laravel_data.comments_count }} {{ post.laravel_data.comments_count === 1 ? 'comment' : 'comments' }}
            </span>
          </div>
        </div>
      </div>
    </slot>

    <!-- Actions -->
    <slot name="action">
      <post-action :action="currentUserAction" />
    </slot>

    <!-- Comments Area -->
    <slot name="commentsArea">
      <laravel-comment-area
        :post-id="post.id"
        :post-slug="post.laravel_data?.slug"
        @comment-added="handleCommentAdded"
      />
      <comment-sort class="q-ml-sm" />
    </slot>

    <!-- Comments List -->
    <slot name="commentsList">
      <laravel-comment-items
        ref="commentsListRef"
        :post-id="post.id"
        :post-slug="post.laravel_data?.slug"
        :initial-comments="postComments"
        :comments-count="post.laravel_data?.comments_count || 0"
      />
    </slot>
  </BaseCard>
</template>

<script setup lang="ts">
import ContentItem from '@/components/base/BaseContentItem.vue';
import CommentSort from '@/components/feed/CommentSort.vue';
import LaravelCommentArea from '@/components/feed/LaravelCommentArea.vue';
import LaravelCommentItems from '@/components/feed/LaravelCommentItems.vue';
import PostAction from '@/components/feed/PostAction.vue';
import PostEngaging from '@/components/feed/PostEngaging.vue';
import PostGallerry from '@/components/feed/PostGallerry.vue';
import PostHashtag from '@/components/feed/PostHashtag.vue';
import PostMenu from '@/components/feed/PostMenu.vue';
import ProfileName from '@/components/feed/ProfileName.vue';
import { useBase } from '@/composables/useBase';
import type { OgMeta, PostData } from '@/types/models';
import { catchUrlFromText } from '@/utils/appUtil';
import { FORMAT_DATE12 } from '@/utils/dateUtil';
import { AvatarPlaceHolder128 } from '@/libs/constant';
import { onMounted, ref, useId, computed } from 'vue';
import BaseCard from '../base/BaseCard.vue';
import OpenGraphItem from '../base/OpenGraphItem.vue';

const { post } = defineProps<{
  post: PostData;
  index: number;
}>();

const contentUniqeId = useId();
const { appFormatDateTime } = useBase();
const opengraphItem = ref<OgMeta>();
const commentsListRef = ref();

// Computed properties for Laravel data
const userAvatar = computed(() => {
  // Use the real user image from Laravel, or a default avatar if none exists
  if (post.laravel_data?.user?.image) {
    return post.laravel_data.user.image;
  }
  // Use the Quasar template's default avatar as fallback
  return AvatarPlaceHolder128;
});

const userName = computed(() => {
  return post.laravel_data?.user?.name || 'Unknown User';
});

// Computed property for current user action (if they liked the post)
const currentUserAction = computed(() => {
  // If user has liked the post, show "LOVE_IT" action
  if (post.laravel_data?.is_liked) {
    return 'LOVE_IT';
  }
  // Otherwise, no action
  return undefined;
});

// Computed property for post comments
const postComments = computed(() => {
  // TODO: In the future, this will come from the post data
  // For now, return empty array as comments will be loaded separately
  return [];
});

onMounted(() => {
  checkOgLink();
  // Debug: Log the post data to see what we're getting
  console.log('Post data:', post);
  console.log('Laravel data:', post.laravel_data);
  console.log('User image:', post.laravel_data?.user?.image);
});

const checkOgLink = async () => {
  const matches = catchUrlFromText(post.content);
  if (matches && matches.length > 0) {
    // For now, we'll use dummy data. In the future, this could call a real OG service
    opengraphItem.value = {
      domain: 'example.com',
      url: matches[0],
      title: 'Link Preview',
      desc: 'This is a preview of the shared link.',
      image: 'https://via.placeholder.com/400x200',
      imageAlt: 'Link preview image',
    };
  }
};

// Handle comment added event
const handleCommentAdded = () => {
  // Refresh the comments list
  if (commentsListRef.value && commentsListRef.value.refreshComments) {
    commentsListRef.value.refreshComments();
  }
};

// Note: Event handlers are now handled by the PostAction component
</script>
