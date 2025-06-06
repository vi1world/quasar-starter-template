<script setup lang="ts">
import { ref } from 'vue';
import { useForm } from '@inertiajs/vue3';
import { useLang } from '@/composables/useLang';
import { useValidation } from '@/composables/useValidation';
import { useBase } from '@/composables/useBase';
import { useDevice } from '@/composables/useDevice';
import { getYearNow } from '@/utils/dateUtil';

// Laravel route helper function
const route = (name: string, params?: any) => {
  const routes: Record<string, string> = {
    'user.aggregation.password.email': '/forgot-password',
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
  status?: string;
  errors?: Record<string, string>;
}

const props = withDefaults(defineProps<Props>(), {
  appName: 'Laravel',
  appLogo: '/logo/logo-black.png',
  loginLeftImage: '',
  status: '',
  errors: () => ({})
});

// Form handling with Inertia
const form = useForm({
  email: '',
});

// Composables
const { t, currenLocale } = useLang();
const { required } = useValidation();
const { isDark } = useBase();
const { isSmallScreen } = useDevice();

const forgotPasswordForm = ref(null);
const appVersion = process.env.APP_VERSION;

// Meta tags
const metaData = {
  title: 'Forgot Password',
  titleTemplate: (title: any) => `${title} - ${props.appName}`,
  meta: {
    description: { name: 'description', content: 'Enter your email address and we\'ll send you a link to reset your password.' },
    keywords: { name: 'keywords', content: 'forgot password, reset password, email' },
  },
};
useMeta(metaData);

const onSubmit = () => {
  form.post(route('user.aggregation.password.email'), {
    onFinish: () => {
      // Don't reset email on finish to show what was submitted
    },
  });
};

const onReset = () => {
  form.reset();
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
              <Ellipsis :lines="2"> Enter your email address and we'll send you a link to reset your password. </Ellipsis>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column - Forgot Password Form -->
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
              Forgot Password
            </div>
            <div class="text-body1 text-grey-6 q-my-md">
              Remember your password?
              <a :href="route('user.aggregation.login')" class="text-primary text-decoration-none">Sign in</a>
            </div>
          </div>

          <!-- Status Message -->
          <div v-if="status" class="q-mb-md">
            <q-banner class="bg-positive text-white">
              {{ status }}
            </q-banner>
          </div>

          <!-- Error Messages -->
          <div v-if="Object.keys(errors).length > 0" class="q-mb-md">
            <q-banner class="bg-negative text-white">
              <div v-for="(error, field) in errors" :key="field">
                {{ error }}
              </div>
            </q-banner>
          </div>

          <q-form ref="forgotPasswordForm" class="q-gutter-md" @submit.prevent="onSubmit" @reset="onReset()">
            <BaseInput
              v-model="form.email"
              :error="form.errors.email"
              :readonly="form.processing"
              :dense="false"
              label="Email Address"
              :rules="[required]"
              type="email"
              required
              placeholder="Your Email"
            >
              <template #prepend>
                <q-icon :name="biEnvelope" color="grey-9" />
              </template>
            </BaseInput>

            <div class="q-px-sm">
              <BaseButton
                unelevated
                :loading="form.processing"
                size="lg"
                color="primary"
                class="full-width text-white"
                label="Send Password Reset Link"
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
