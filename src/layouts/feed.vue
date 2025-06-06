<template>
  <q-layout view="hHh LpR fFf">
    <base-header bordered />
    <feed-drawer overlay />
    <q-page-container class="app-feed-container q-my-lg">
      <div class="row">
        <div v-if="screen.gt.sm" class="col-12 col-md-3 app-feed-page">
          <feed-left class="fixed" :communities="communities" />
        </div>
        <div class="col-12 col-md-6 app-feed-page">
          <feed-page />
        </div>
        <div v-if="screen.gt.sm" class="col-12 col-md-3 app-feed-page">
          <feed-right class="fixed" />
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import FeedDrawer from '@/components/feed/FeedDrawer.vue';
import BaseHeader from '@/components/base/BaseHeader.vue';
import FeedLeft from '@/components/feed/FeedLeft.vue';
import FeedRight from '@/components/feed/FeedRight.vue';
import FeedPage from '@/pages/example/feed/index.vue';
import { useQuasar } from 'quasar';
// Use mobile-compatible Inertia adapter
import { inject } from 'vue';

// Try to get usePage from mobile context, fallback to Inertia
let usePage: any;
try {
  // In mobile context, usePage is provided via inject
  usePage = inject('usePage') || (() => ({ props: { tenants: [] } }));
} catch (e) {
  // Fallback for web context
  const { usePage: inertiaUsePage } = require('@inertiajs/vue3');
  usePage = inertiaUsePage;
}

// Define community interface
interface Community {
  tenant_id: string;
  domain: string;
  role: number;
  role_name: string;
  is_primary: boolean;
  status: string;
}

// Get communities from Inertia page props
const page = usePage();
const communities = (page.props.tenants as Community[] || []);

// Debug: Log the communities data
console.log('Feed layout received communities:', {
  communities: communities,
  communitiesCount: communities?.length || 0
});

const { screen } = useQuasar();
</script>
