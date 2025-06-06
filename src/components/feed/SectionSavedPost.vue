<template>
  <BaseCard :style="{ width: `${FeedSectionWidth}px` }">
    <q-list>
      <q-item-label header
        ><q-icon :name="biBookmark" class="q-mr-sm" />My Bookmarks</q-item-label
      >
      <q-item v-for="(item, index) in bookmarksList" :key="index" clickable>
        <q-item-section avatar>
          <q-img :src="item.image" class="bg-gray-1" spinner-color="primary" no-native-menu />
        </q-item-section>
        <q-item-section>
          <q-item-label lines="1">{{ item.title }}</q-item-label>
          <q-item-label caption> {{ item.source }} </q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple @click="navigateToBookmarks">
        <q-item-section side>
          <q-icon color="primary" :name="biChevronDown" />
        </q-item-section>
        <q-item-section class="text-primary">View All Bookmarks</q-item-section>
      </q-item>
    </q-list>
  </BaseCard>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { biChevronDown, biBookmark } from '@quasar/extras/bootstrap-icons';
import { useLang } from '@/composables/useLang';
import { FeedSectionWidth } from '@/libs/constant';
import { router } from '@inertiajs/vue3';
import BaseCard from '../base/BaseCard.vue';

const { t } = useLang();

// Sample bookmarks data - in a real app, this would come from an API
const bookmarksList = ref([
  {
    image: 'https://picsum.photos/160',
    title: 'Sobering up has had a negative affect on relationship with [25f] gf. How to handle?',
    source: 'BigGumbyLover',
  },
  {
    image: 'https://picsum.photos/160',
    title: 'Worker disappears after he was accidentally paid more than 300 times his salary',
    source: 'Flair_Helper',
  },
  {
    image: 'https://i.redd.it/5jrr5k4sbs991.jpg',
    title:
      'The only picture we have of my great grandfather (left), with an unknown man (circa 1910)',
    source: 'TrebleRose68',
  },
]);

// Navigate to the bookmarks page
const navigateToBookmarks = () => {
  router.visit('/bookmarks');
};
</script>
