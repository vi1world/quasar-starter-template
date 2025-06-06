<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import { useAuthenStore } from '@/stores/authenStore';
import { useAppMeta } from '@/composables/useAppMeta';
import BasePage from '@/components/base/BasePage.vue';
import BaseCard from '@/components/base/BaseCard.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import { useMeta } from 'quasar';

// Define props interface
interface Props {
  auth?: any;
  meta?: any;
  user?: any;
  bookmarks?: any[];
  hasMore?: boolean;
  totalCount?: number;
  tenants?: any[];
  currentTenantFilter?: string;
  currentSearchQuery?: string;
  currentSortBy?: string;
  currentSortOrder?: string;
  sortOptions?: Record<string, string>;
  [key: string]: any;
}

const props = defineProps<Props>();
const page = usePage();
const authenStore = useAuthenStore();

// Initialize auth store with data from Laravel
onMounted(() => {
  if (props.auth || page.props.auth) {
    authenStore.initializeFromProps(props.auth || page.props.auth);
  }
});

useAppMeta();
useMeta({
  title: 'My Bookmarks',
});

// Reactive data
const bookmarks = ref(props.bookmarks || []);
const searchQuery = ref(props.currentSearchQuery || '');
const selectedTenant = ref(props.currentTenantFilter || '');
const sortBy = ref(props.currentSortBy || 'created_at');
const sortOrder = ref(props.currentSortOrder || 'desc');
const isLoading = ref(false);
const showHelpModal = ref(false);

// Computed properties
const filteredBookmarksCount = computed(() => bookmarks.value.length);
const totalBookmarks = computed(() => props.totalCount || 0);

// Methods
const filterBookmarks = () => {
  console.log('Filtering bookmarks:', {
    search: searchQuery.value,
    tenant: selectedTenant.value,
    sort: sortBy.value,
    order: sortOrder.value
  });
};

const clearSearch = () => {
  searchQuery.value = '';
  filterBookmarks();
};

const clearAllFilters = () => {
  searchQuery.value = '';
  selectedTenant.value = '';
  sortBy.value = 'created_at';
  sortOrder.value = 'desc';
  filterBookmarks();
};

const loadMoreBookmarks = () => {
  if (isLoading.value) return;
  isLoading.value = true;

  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
};

const deleteBookmark = (bookmarkId: number) => {
  if (!confirm('Are you sure you want to delete this bookmark?')) {
    return;
  }

  const index = bookmarks.value.findIndex(b => b.id === bookmarkId);
  if (index > -1) {
    bookmarks.value.splice(index, 1);
  }

  console.log('Deleting bookmark:', bookmarkId);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString();
};

const getTenantName = (tenantId: string) => {
  const tenant = props.tenants?.find(t => t.tenant_id === tenantId);
  return tenant?.domain || 'Unknown';
};
</script>

<template>
  <BasePage scroll-event show-to-top>
    <BaseCard
      title="My Bookmarks"
      :bordered="false"
      flat
      sub-title="Manage your bookmarks from all communities"
    >
      <!-- Header Section -->
      <q-card-section>
        <div class="row items-center justify-between q-mb-md">
          <div class="col-auto">
            <div class="text-h6 q-mb-xs">My Bookmarks</div>
            <div class="text-body2 text-grey-6">
              Manage your bookmarks from all communities
              <q-badge v-if="totalBookmarks > 0" color="primary" class="q-ml-sm">
                {{ totalBookmarks }} total
              </q-badge>
            </div>
          </div>
          <div class="col-auto">
            <BaseButton
              label="How to bookmark"
              icon="help"
              outline
              @click="showHelpModal = true"
            />
          </div>
        </div>
      </q-card-section>

      <!-- Bookmarks List -->
      <q-card-section>
        <BaseCard>
          <q-card-section class="q-pb-none">
            <div class="row items-center justify-between">
              <div class="text-h6">Your Bookmarks</div>
              <div class="text-body2 text-grey-6">
                {{ filteredBookmarksCount }} of {{ totalBookmarks }} bookmarks
              </div>
            </div>
          </q-card-section>

          <q-separator />

          <!-- Empty State -->
          <div class="text-center q-pa-xl">
            <q-icon name="bookmark_border" size="4rem" color="grey-5" />
            <div class="text-h6 q-mt-md text-grey-6">No bookmarks found</div>
            <div class="text-body2 text-grey-5 q-mb-md">
              Start bookmarking pages from your communities to see them here.
            </div>
          </div>
        </BaseCard>
      </q-card-section>
    </BaseCard>

    <!-- Help Modal -->
    <q-dialog v-model="showHelpModal">
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">How to Bookmark Pages</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-body2">
            Visit any page on your community websites and look for the bookmark icon to save pages.
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <BaseButton label="Close" flat @click="showHelpModal = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </BasePage>
</template>

<style scoped>
.bookmark-item:hover {
  background-color: rgba(0, 0, 0, 0.02);
}

body.body--dark .bookmark-item:hover {
  background-color: rgba(255, 255, 255, 0.05);
}
</style>