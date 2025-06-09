<template>
  <div class="space-y-6">
    <!-- Real Post Feed Component -->
    <RealPostFeed :user="user" />
  </div>
</template>

<script setup lang="ts">
import RealPostFeed from '@/components/modern/RealPostFeed.vue';

defineOptions({
  name: 'AlumniHomePage',
});

// Props from Laravel controller
interface Props {
  user?: any;
  upcomingEvents?: any[];
  latestJobs?: any[];
  latestNews?: any[];
  latestNotice?: any[];
}

const props = withDefaults(defineProps<Props>(), {
  user: () => ({}),
  upcomingEvents: () => [],
  latestJobs: () => [],
  latestNews: () => [],
  latestNotice: () => []
});

</script>
