<script setup lang="ts">
import { ref, computed } from 'vue';
import { useForm } from '@inertiajs/vue3';
import { useLang } from '@/composables/useLang';
import { useValidation } from '@/composables/useValidation';
import { useBase } from '@/composables/useBase';
import { useDevice } from '@/composables/useDevice';
import { getYearNow } from '@/utils/dateUtil';

// Laravel route helper function
const route = (name: string, params?: any) => {
  const routes: Record<string, string> = {
    'user.aggregation.password.update': '/reset-password',
    'user.aggregation.login': '/login',
    'user.aggregation.landing': '/',
  };
  
  let url = routes[name] || '#';
  
  // Replace parameters in URL
  if (params && typeof params === 'object') {
    Object.keys(params).forEach(key => {
      url = url.replace(`{${key}}`, params[key]);
    });
  }
  
  return url;
};

import {
  biEnvelope,
  biLock,
  biEye,
  biEyeSlash,
} from '@quasar/extras/bootstrap-icons';
import { useMeta } from 'quasar';
import BaseButton from '@/components/base/BaseButton.vue';
import BaseInput from '@/components/base/BaseInput.vue';
import BaseLangugeSwitcherButton from '@/components/base/BaseLangugeSwitcherButton.vue';
import BaseThemeSwitcher from '@/components/base/BaseThemeSwitcher.vue';
import Ellipsis from '@/components/base/BaseEllipsis.vue';

// Props from Laravel
interface Props {
  appName?: string;
  appLogo?: string;
  loginLeftImage?: string;
  token?: string;
  email?: string;
  errors?: Record<string, string>;
}

const props = withDefaults(defineProps<Props>(), {
  appName: 'Laravel',
  appLogo: '/logo/logo-black.png',
  loginLeftImage: '',
  token: '',
  email: '',
  errors: () => ({})
});

// Form handling with Inertia
const form = useForm({
  token: props.token,
  email: props.email,
  password: '',
  password_confirmation: '',
});

// Composables
const { t, currenLocale } = useLang();
const { required } = useValidation();
const { isDark } = useBase();
const { isSmallScreen } = useDevice();

const showPassword = ref<boolean>(false);
const showPasswordConfirmation = ref<boolean>(false);
const resetPasswordForm = ref(null);
const appVersion = process.env.APP_VERSION;

// Meta tags
const metaData = {
  title: 'Reset Password',
  titleTemplate: (title: any) => `${title} - ${props.appName}`,
  meta: {
    description: { name: 'description', content: 'Enter your new password below.' },
    keywords: { name: 'keywords', content: 'reset password, new password' },
  },
};
useMeta(metaData);

// Password validation
const passwordsMatch = computed(() => {
  if (!form.password || !form.password_confirmation) return true;
  return form.password === form.password_confirmation;
});

const passwordValidation = (val: string) => {
  if (!val) return 'Password is required';
  if (val.length < 8) return 'Password must be at least 8 characters long';
  return true;
};

const confirmPasswordValidation = (val: string) => {
  if (!val) return 'Password confirmation is required';
  if (val !== form.password) return 'Passwords do not match';
  return true;
};

const onSubmit = () => {
  if (!passwordsMatch.value) {
    return;
  }
  
  form.post(route('user.aggregation.password.update'), {
    onFinish: () => {
      form.reset('password', 'password_confirmation');
    },
  });
};

const onReset = () => {
  form.reset('password', 'password_confirmation');
  showPassword.value = false;
  showPasswordConfirmation.value = false;
};
</script>

<template>
  <q-layout view="hHh LpR fFf">
    <q-page-container>
      <q-page
        :padding="false"
        :class="{ 'bg-white': !isDark, 'app-second-bg-color-theme-dark': isDark }"
      >
    <div class="row items-center" :class="{ 'q-pa-md': !isSmallScreen }" style="height: 100vh">
      <!-- Left Column - Fantasy Background -->
      <div class="col-12 col-md-6 fantasy-bg">
        <div class="overlay flex flex-center text-white">
          <div class="q-pa-xl text-center">
            <h2 class="text-h3 text-weight-bold q-mb-md">
              <Ellipsis :lines="2"> Reset Password </Ellipsis>
            </h2>
            <div class="text-h5">
              <Ellipsis :lines="2"> Enter your new password below. </Ellipsis>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column - Reset Password Form -->
      <div class="col-12 col-md-6 flex flex-center">
        <div
          class="q-pa-md"
          :style="{
            width: !isSmallScreen ? '70%' : '90%',
            maxWidth: !isSmallScreen ? '80%' : '90%',
          }"
        >
          <div class="text-center q-mb-xl">
            <q-avatar size="100px" class="q-mb-md" square>
              <q-img
                :src="isDark ? '/logo/logo-white.png' : '/logo/logo-black.png'"
                spinner-color="white"
                alt="logo"
                style="height: auto; max-width: 120px"
              />
            </q-avatar>
            <div class="text-h4 text-weight-bolder q-my-md">
              Reset Password
            </div>
            <div class="text-body1 text-grey-6 q-my-md">
              Enter your new password below.
            </div>
          </div>

          <!-- Error Messages -->
          <div v-if="Object.keys(errors).length > 0" class="q-mb-md">
            <q-banner class="bg-negative text-white">
              <div v-for="(error, field) in errors" :key="field">
                {{ error }}
              </div>
            </q-banner>
          </div>

          <q-form ref="resetPasswordForm" class="q-gutter-md" @submit.prevent="onSubmit" @reset="onReset()">
            <!-- Hidden fields -->
            <input type="hidden" :value="form.token" />
            
            <BaseInput
              v-model="form.email"
              :error="form.errors.email"
              :readonly="true"
              :dense="false"
              label="Email Address"
              type="email"
              required
            >
              <template #prepend>
                <q-icon :name="biEnvelope" color="grey-9" />
              </template>
            </BaseInput>

            <BaseInput
              v-model="form.password"
              :error="form.errors.password"
              :readonly="form.processing"
              :dense="false"
              :type="showPassword ? 'text' : 'password'"
              label="New Password"
              :rules="[passwordValidation]"
              required
              placeholder="********"
            >
              <template #prepend>
                <q-icon :name="biLock" color="grey-9" />
              </template>
              <template #append>
                <q-icon
                  :name="showPassword ? biEye : biEyeSlash"
                  class="cursor-pointer"
                  color="grey-9"
                  @click="showPassword = !showPassword"
                />
              </template>
            </BaseInput>

            <BaseInput
              v-model="form.password_confirmation"
              :error="form.errors.password_confirmation"
              :readonly="form.processing"
              :dense="false"
              :type="showPasswordConfirmation ? 'text' : 'password'"
              label="Confirm New Password"
              :rules="[confirmPasswordValidation]"
              required
              placeholder="********"
            >
              <template #prepend>
                <q-icon :name="biLock" color="grey-9" />
              </template>
              <template #append>
                <q-icon
                  :name="showPasswordConfirmation ? biEye : biEyeSlash"
                  class="cursor-pointer"
                  color="grey-9"
                  @click="showPasswordConfirmation = !showPasswordConfirmation"
                />
              </template>
            </BaseInput>

            <div class="text-caption text-grey-6 q-mb-md">
              Password must be at least 8 characters long.
            </div>

            <div class="q-px-sm">
              <BaseButton
                unelevated
                :loading="form.processing"
                :disable="!passwordsMatch"
                size="lg"
                color="primary"
                class="full-width text-white"
                label="Reset Password"
                type="submit"
              />
            </div>
          </q-form>

          <div class="text-center q-mt-lg">
            <div class="q-mb-md">
              <BaseButton
                outline
                size="lg"
                color="primary"
                class="full-width"
                label="Back to Login"
                :to="route('user.aggregation.login')"
              />
            </div>

            <q-separator class="q-my-md" />
            <div class="row items-center q-gutter-x-md justify-center">
              <BaseLangugeSwitcherButton anchor="top left" self="bottom left" close-on-click />
              <BaseThemeSwitcher />
              <div :class="isDark ? 'text-grey-5' : 'text-grey-7'">
                {{ `@ ${getYearNow()} ${appName} ${appVersion}` }}
              </div>
            </div>

            <div class="text-center q-mt-md">
              <a :href="route('user.aggregation.landing')" class="text-grey-6 text-decoration-none">
                <q-icon name="arrow_back" size="16px" class="q-mr-xs" />
                Back to Landing Page
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.fantasy-bg {
  background-image: url('https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
  background-size: cover;
  background-position: center;
  min-height: 90vh;
  border-radius: 20px;
  position: relative;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(16, 0, 43, 0) 0%, rgba(52, 0, 87, 0.6) 100%);
  border-radius: 20px;
}

@media (max-width: 768px) {
  .fantasy-bg {
    min-height: 40vh;
    border-radius: 0 0 0 0;
  }

  .overlay {
    border-radius: 0 0 0 0;
  }
}

@media (max-width: 1180px) {
  .fantasy-bg {
    min-height: 40vh;
    border-radius: 0 0 0 0;
  }
  .overlay {
    border-radius: 0 0 0 0;
  }
}
</style>
