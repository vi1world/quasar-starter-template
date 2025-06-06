<template>
  <BaseCard :style="{ width: `${FeedSectionWidth}px` }">
    <q-list>
      <q-item-label header>
        <q-icon :name="biGlobe" class="q-mr-sm" />{{ t('communities.myCommunities') }}
      </q-item-label>

      <!-- Show message when no communities -->
      <div v-if="!communities || communities.length === 0" class="text-center q-pa-md">
        <q-icon name="group_off" size="2rem" color="grey-5" class="q-mb-sm" />
        <p class="text-grey-6 text-caption">{{ t('communities.noCommunitiesJoined') }}</p>
      </div>

      <!-- Show communities list -->
      <template v-else>
        <q-item 
          v-for="(community, index) in displayedCommunities" 
          :key="index" 
          clickable
          @click="visitCommunity(community)"
        >
          <q-item-section side top>
            <q-avatar size="32px" color="primary" text-color="white">
              <q-icon :name="biGlobe" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label lines="1" class="text-weight-medium">
              {{ community.domain }}
            </q-item-label>
            <q-item-label caption class="row items-center q-gutter-xs">
              <q-badge 
                :color="community.role === 'Admin' ? 'positive' : 'info'" 
                :label="community.role_name"
                dense
              />
              <span v-if="community.is_primary" class="text-orange">
                <q-icon name="star" size="12px" />
                {{ t('communities.primary') }}
              </span>
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn 
              flat 
              dense 
              round 
              :icon="biBoxArrowUpRight" 
              size="sm"
              color="grey-6"
              @click.stop="visitCommunity(community)"
            >
              <q-tooltip>{{ t('communities.visitCommunity') }}</q-tooltip>
            </q-btn>
          </q-item-section>
        </q-item>

        <!-- Show "See more" if there are more than 3 communities -->
        <q-item 
          v-if="communities.length > maxDisplayed" 
          clickable 
          v-ripple
          @click="toggleShowAll"
        >
          <q-item-section side>
            <q-icon 
              color="primary" 
              :name="showAll ? biChevronUp : biChevronDown" 
            />
          </q-item-section>
          <q-item-section class="text-primary">
            {{ showAll ? t('communities.showLess') : t('base.seeMore') }}
            <span v-if="!showAll" class="text-grey-6">
              ({{ communities.length - maxDisplayed }} {{ t('base.more') }})
            </span>
          </q-item-section>
        </q-item>
      </template>
    </q-list>
  </BaseCard>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { biChevronDown, biChevronUp, biGlobe, biBoxArrowUpRight } from '@quasar/extras/bootstrap-icons';
import { useLang } from '@/composables/useLang';
import { FeedSectionWidth } from '@/libs/constant';
import BaseCard from '../base/BaseCard.vue';

// Define props interface
interface Community {
  tenant_id: string;
  domain: string;
  role: number;
  role_name: string;
  is_primary: boolean;
  status: string;
}

interface Props {
  communities?: Community[];
}

const props = withDefaults(defineProps<Props>(), {
  communities: () => []
});

const { t } = useLang();

// State for showing all communities
const showAll = ref(false);
const maxDisplayed = 3;

// Computed property for displayed communities
const displayedCommunities = computed(() => {
  if (!props.communities || props.communities.length === 0) {
    return [];
  }
  
  if (showAll.value || props.communities.length <= maxDisplayed) {
    return props.communities;
  }
  
  return props.communities.slice(0, maxDisplayed);
});

// Toggle show all communities
const toggleShowAll = () => {
  showAll.value = !showAll.value;
};

// Visit community function
const visitCommunity = (community: Community) => {
  const protocol = window.location.protocol;
  const url = `${protocol}//${community.domain}`;
  window.open(url, '_blank');
};

// Debug: Log the received communities data
console.log('My Communities component received:', {
  communities: props.communities,
  communitiesCount: props.communities?.length || 0
});
</script>

<style scoped>
.q-item {
  min-height: 48px;
}

.q-item-label {
  font-size: 0.875rem;
}

.q-badge {
  font-size: 0.75rem;
}
</style>
