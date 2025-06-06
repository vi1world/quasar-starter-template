<script setup lang="ts">
import { biCommand, biGear, biQuestionCircle, biSearch, biPower } from '@quasar/extras/bootstrap-icons';
import { useQuasar } from 'quasar';
import { useBase } from 'src/composables/useBase';
import { useLang } from 'src/composables/useLang';
import { useAppStore } from 'src/stores/appStore';
import { useAuthenStore } from 'src/stores/authenStore';
import { defineAsyncComponent, onBeforeUnmount, onMounted, ref, computed } from 'vue';
import { alumniMenu } from '@/libs/navs';
import BaseDrawer from '../base/BaseDrawer.vue';
import AlumniMenuItems from './AlumniMenuItems.vue';
import { getYearNow } from '@/utils/dateUtil';
// import { useDevice } from 'src/composables/useDevice';
import { usePage } from '@inertiajs/vue3';

const SearchMenu = defineAsyncComponent(() => import('@/components/search/SearchMenu.vue'));

const {
  overlay = false,
  bordered = false,
  miniToOverlay = true,
  width = 270,
  tranparent = false,
  expanAll = false,
} = defineProps<{
  overlay?: boolean;
  miniToOverlay?: boolean;
  bordered?: boolean;
  width?: number;
  tranparent?: boolean;
  expanAll?: boolean
}>();

const { version: quasarVersion, screen } = useQuasar();
const { t } = useLang();
const { appNavigateTo } = useBase();
// const { isMobileOrTablet: checkMobileOrTablet, isSmallScreen } = useDevice();
const appStore = useAppStore();
const authenStore = useAuthenStore();
const page = usePage();

const modelValue = defineModel<boolean>({ default: true });
const miniState = ref(true);
const isMobileOrTablet = ref<boolean>(false);
const searchTimeout = ref<any>();
const showSearch = ref(false);

// Get user data from Inertia shared props
const user = computed(() => {
  return page.props.auth?.user || authenStore.auth || null;
});

// Get app data from Inertia shared props
const appData = computed(() => {
  return page.props.app || {};
});

// Get features data from Inertia shared props
const features = computed(() => {
  return page.props.features || {};
});

// Get tenant data from Inertia shared props
const tenant = computed(() => {
  return page.props.tenant || {};
});

// Check if user has specific role
const hasRole = (role: string): boolean => {
  if (!user.value) return false;

  // Map Laravel role constants to strings
  const roleMap: { [key: number]: string } = {
    1: 'admin',      // USER_ROLE_ADMIN
    2: 'alumni',     // USER_ROLE_ALUMNI
    3: 'super_admin', // USER_ROLE_SUPER_ADMIN
    4: 'board_member' // USER_ROLE_BOARD_MEMBER
  };

  const userRole = roleMap[user.value.role] || '';
  return userRole === role;
};

// Check if user has specific permission
const hasPermission = (permission: string): boolean => {
  if (!user.value) return false;

  // Check Laravel permissions from shared data
  const userPermissions = page.props.auth?.permissions || [];
  if (userPermissions.includes(permission)) return true;

  // Fallback to role-based permissions
  if (permission === 'admin') return hasRole('admin');
  if (permission === 'alumni') return hasRole('alumni') || hasRole('admin');

  return true; // Default to true for other permissions
};

// Check if user is alumni (either role or is_alumni flag)
const isAlumni = computed(() => {
  if (!user.value) return false;
  return hasRole('alumni') || user.value.is_alumni === 1;
});

// Check if central domain and addon conditions
const shouldShowItem = (item: any): boolean => {
  // Check central domain restrictions
  if (!tenant.value.is_central || !features.value.alusaas) {
    // Apply the same logic as Laravel Blade sidebar
    return true;
  }
  return true;
};

// Filter menu items based on user permissions and roles
const filteredMenu = computed(() => {
  if (!user.value) return [];

  const filterMenuItems = (items: any[]): any[] => {
    return items.filter(item => {
      // Check addon requirements
      if (item.addon && !features.value[item.addon.toLowerCase()]) {
        return false;
      }

      // Check hideIfAddon conditions
      if (item.hideIfAddon && features.value[item.hideIfAddon.toLowerCase()]) {
        return false;
      }

      // Check central domain restrictions (similar to Laravel Blade logic)
      if (tenant.value.is_central && features.value.alusaas) {
        // Apply specific central domain restrictions here if needed
        // For now, we'll allow all items
      }

      // Check if item has role restrictions
      if (item.roles && item.roles.length > 0) {
        const hasRequiredRole = item.roles.some((role: string) => hasRole(role));
        if (!hasRequiredRole) return false;
      }

      // Check if item has permission restrictions
      if (item.permissions && item.permissions.length > 0) {
        const hasRequiredPermission = item.permissions.some((perm: string) => hasPermission(perm));
        if (!hasRequiredPermission) return false;
      }

      // Filter children recursively
      if (item.children) {
        item.children = filterMenuItems(item.children);
        // Hide parent if no children are visible and it has permission restrictions
        if (item.children.length === 0 && (item.permissions || item.roles)) return false;
      }

      return true;
    });
  };

  return filterMenuItems(JSON.parse(JSON.stringify(alumniMenu)));
});

// Get app logo
const appLogo = computed(() => {
  return appData.value.logo || '/assets/images/logo.png';
});

// Get app name
const appName = computed(() => {
  return appData.value.name || 'Alumni Portal';
});

onMounted(() => {
  // For web browsers, use screen size instead of device detection
  const isMobileScreen = !screen.gt.sm; // Mobile if screen is sm or smaller
  isMobileOrTablet.value = isMobileScreen;
  miniState.value = !isMobileScreen;
  appStore.setMobileOrTablet(isMobileScreen);
  appStore.setDrawerOpen(!isMobileScreen);
});

const onOpenSearch = () => {
  showSearch.value = true;
};

const onSearchMenuClick = (to: string) => {
  showSearch.value = false;
  setTimeout(() => {
    appNavigateTo(to);
  }, 500);
};

const onDrawerHide = () => {
  console.log('onDrawerHide', modelValue.value);
};

const onMounseover = () => {
  if (!isMobileOrTablet.value) {
    miniState.value = false;
  }
};

const onMounseout = () => {
  if (!isMobileOrTablet.value) {
    miniState.value = true;
  }
};

const handleLogout = () => {
  // Create a form and submit it to logout route (Laravel CSRF protection)
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = '/logout';

  // Add CSRF token
  const csrfInput = document.createElement('input');
  csrfInput.type = 'hidden';
  csrfInput.name = '_token';
  csrfInput.value = page.props.csrf_token;
  form.appendChild(csrfInput);

  document.body.appendChild(form);
  form.submit();
};

onBeforeUnmount(() => {
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value);
  }
  searchTimeout.value = null;
});
</script>

<template>
  <BaseDrawer
    v-model="modelValue"
    :mini="miniState && !appStore.expandDrawer"
    :mini-to-overlay="miniToOverlay && !appStore.expandDrawer"
    :width="width"
    :overlay="overlay || appStore.isMobileOrTablet"
    :bordered="bordered"
    :tranparent
    @mouseover="onMounseover"
    @mouseout="onMounseout"
    @hide="onDrawerHide"
  >
    <q-scroll-area class="fit">
      <!-- Logo Section -->
      <div v-show="!miniState || appStore.expandDrawer" class="q-pa-md">
        <div class="row justify-center q-mb-md">
          <q-btn flat dense round to="/" class="btn--no-hover">
            <q-avatar style="height: auto; width: 44px" square>
              <img :alt="appName" :src="appLogo" />
            </q-avatar>
          </q-btn>
        </div>
        <q-separator />
      </div>

      <!-- Search Section -->
      <div v-show="!miniState || appStore.expandDrawer">
        <q-item clickable dense class="search-item" @click="onOpenSearch">
          <q-item-section side>
            <q-icon :name="biSearch" size="xs" class="text-muted" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-muted">
              {{ t('base.searchMenu') }}
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon :name="biCommand" size="xs" class="text-muted" />
          </q-item-section>
        </q-item>
      </div>

      <!-- Main Navigation -->
      <AlumniMenuItems :items="filteredMenu" :expan-all>
        <template #after>
          <q-separator />
          
          <!-- Help -->
          <q-item dense clickable>
            <q-item-section side>
              <q-icon class="q-text-black" :name="biQuestionCircle" size="20px" />
            </q-item-section>
            <q-item-section>{{ t('base.help') }}</q-item-section>
          </q-item>
          
          <!-- Settings -->
          <q-item dense clickable to="/settings">
            <q-item-section side>
              <q-icon class="q-text-black" :name="biGear" size="20px" />
            </q-item-section>
            <q-item-section>{{ t('base.setting') }}</q-item-section>
          </q-item>
          
          <!-- Logout -->
          <q-item dense clickable @click="handleLogout">
            <q-item-section side>
              <q-icon class="q-text-black" :name="biPower" size="20px" />
            </q-item-section>
            <q-item-section>{{ t('auth.logout') || 'Logout' }}</q-item-section>
          </q-item>
          
          <q-separator />
          
          <!-- Footer -->
          <q-item>
            <q-item-section class="text-center">
              <q-item-label caption>
                {{ `@ ${getYearNow()} ${appName}` }}
              </q-item-label>
              <q-item-label caption>
                {{ `Quasar ${quasarVersion}` }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </AlumniMenuItems>
    </q-scroll-area>

    <SearchMenu v-if="showSearch" v-model="showSearch" @on-click="onSearchMenuClick" />
  </BaseDrawer>
</template>

<style lang="scss" scoped>
.search-item {
  padding: 10px;
  margin: 10px 10px 20px 10px;
  border-radius: 10px;
  border: var(--app-main-border-color) 1px solid;
}
</style>
