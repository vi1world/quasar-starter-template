<script setup lang="ts">
import { useSmartForm, isMobileApp } from '@/composables/useSmartForm';
import { ref, inject } from 'vue';
import { useLang } from '@/composables/useLang';
import { useValidation } from '@/composables/useValidation';
import { useBase } from '@/composables/useBase';
import { useDevice } from '@/composables/useDevice';
import { getYearNow } from '@/utils/dateUtil';

// Laravel route helper function
const route = (name: string, params?: any) => {
  const routes: Record<string, string> = {
    'user.aggregation.login.submit': '/login',
    'user.aggregation.register': '/register',
    'user.aggregation.password.request': '/forgot-password',
    'social.redirect': '/auth/{provider}/redirect'
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
  biEye,
  biEyeSlash,
  biLock,
  biPerson,
} from '@quasar/extras/bootstrap-icons';
import { useMeta } from 'quasar';
import BaseButton from '@/components/base/BaseButton.vue';
import BaseInput from '@/components/base/BaseInput.vue';
import BaseLangugeSwitcherButton from '@/components/base/BaseLangugeSwitcherButton.vue';
import BaseThemeSwitcher from '@/components/base/BaseThemeSwitcher.vue';
import Ellipsis from '@/components/base/BaseEllipsis.vue';

// Props from Laravel
interface Props {
  canResetPassword?: boolean;
  status?: string;
  appName?: string;
  appLogo?: string;
  loginLeftImage?: string;
  googleLoginStatus?: number;
  facebookLoginStatus?: number;
}

const props = withDefaults(defineProps<Props>(), {
  canResetPassword: false,
  status: '',
  appName: 'Laravel',
  appLogo: '/logo/logo-black.png',
  loginLeftImage: '',
  googleLoginStatus: 0,
  facebookLoginStatus: 0
});

// Form handling with smart environment detection
const form = useSmartForm({
  email: '',
  password: '',
  remember: false,
});

const { t } = useLang();
const { required } = useValidation();
const { isDark } = useBase();
const { isSmallScreen } = useDevice();

const showPassword = ref<boolean>(false);
const loginForm = ref(null);
const appVersion = process.env.APP_VERSION;

// Meta tags
const metaData = {
  title: t('page.login'),
  titleTemplate: (title: any) => `${title} - ${props.appName}`,
  meta: {
    description: { name: 'description', content: `${props.appName} Login` },
  },
};
useMeta(metaData);

const onSubmit = () => {
  console.log('onSubmit called');
  console.log('Form data:', { email: form.email, password: '***', remember: form.remember });
  console.log('Route URL:', route('user.aggregation.login.submit'));

  form.post(route('user.aggregation.login.submit'), {
    onFinish: () => {
      console.log('Form submission finished');
      form.reset('password');
    },
    onSuccess: (response: any) => {
      console.log('Form submission successful:', response);
    },
    onError: (error: any) => {
      console.log('Form submission error:', error);
    }
  });
};

const onReset = () => {
  form.reset();
  showPassword.value = false;
};

// Social login functions
const loginWithGoogle = () => {
  window.location.href = route('social.redirect', { provider: 'google' });
};

const loginWithFacebook = () => {
  window.location.href = route('social.redirect', { provider: 'facebook' });
};

// Navigation function for mobile app - stay within Tauri app
const navigateToDashboard = () => {
  // Check if we're in a mobile context with Vue Router
  if (typeof window !== 'undefined' && window.location.hash) {
    // We're in mobile app with hash routing - use Vue Router
    const router = inject('router') as any;
    if (router && typeof router.push === 'function') {
      console.log('Using Vue Router to navigate to dashboard within mobile app');
      router.push('/dashboard');
    } else {
      // Fallback: use hash navigation within mobile app
      console.log('Using hash navigation to dashboard within mobile app');
      window.location.hash = '#/dashboard';
    }
  } else {
    // Fallback to regular web navigation
    window.location.href = route('user.aggregation.dashboard');
  }
};

// Navigation function for register page
const navigateToRegister = () => {
  // Check if we're in a mobile context with Vue Router
  if (typeof window !== 'undefined' && window.location.hash) {
    // We're in mobile app with hash routing - use Vue Router
    const router = inject('router') as any;
    if (router && typeof router.push === 'function') {
      router.push('/');
    } else {
      window.location.hash = '#/';
    }
  } else {
    // Fallback to regular navigation
    window.location.href = route('user.aggregation.register');
  }
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
              <Ellipsis :lines="2"> Welcome to Our {{ appName }} </Ellipsis>
            </h2>
            <div class="text-h5">
              <Ellipsis :lines="1"> Embark on your next adventure </Ellipsis>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column - Login Form -->
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
              Log In
            </div>
            <div class="text-body1 text-grey-6 q-my-md">
              Welcome back! Please sign in to your account.
            </div>
          </div>

          <!-- Status Message -->
          <div v-if="status" class="q-mb-md">
            <q-banner class="bg-positive text-white">
              {{ status }}
            </q-banner>
          </div>

          <q-form ref="loginForm" class="q-gutter-md" @submit.prevent="onSubmit" @reset="onReset()">
            <BaseInput
              v-model="form.email"
              :error="form.errors.email"
              :readonly="form.processing"
              :dense="false"
              label="Email or Username"
              :rules="[required]"
            >
              <template #prepend>
                <q-icon :name="biPerson" color="grey-9" />
              </template>
            </BaseInput>
            <BaseInput
              v-model="form.password"
              :error="form.errors.password"
              :readonly="form.processing"
              :dense="false"
              :type="showPassword ? 'text' : 'password'"
              label="Password"
              :rules="[required]"
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

            <div class="row items-center justify-between">
              <q-checkbox v-model="form.remember" label="Remember me" />
              <a
                :href="route('user.aggregation.password.request')"
                class="text-primary text-decoration-none"
              >
                Forgot Password?
              </a>
            </div>

            <div class="q-px-sm">
              <BaseButton
                unelevated
                :loading="form.processing"
                size="lg"
                color="primary"
                class="full-width text-white"
                label="Log In"
                type="submit"
              />
            </div>
          </q-form>

          <div class="text-center q-mt-lg">
            Don't have an account?
            <a @click="navigateToRegister" class="text-primary text-decoration-none cursor-pointer">Sign Up</a>

            <!-- Social Login Section -->
            <div v-if="googleLoginStatus == 1 || facebookLoginStatus == 1" class="q-mt-md">
              <q-separator class="q-my-md" />
              <div class="text-body2 text-grey-6 q-mb-md">Or continue with</div>
              <div class="row justify-center q-gutter-sm">
                <BaseButton
                  v-if="facebookLoginStatus == 1"
                  flat
                  round
                  size="md"
                  class="social-btn facebook-btn"
                  @click="loginWithFacebook"
                >
                  <q-icon name="fab fa-facebook-f" size="20px" />
                </BaseButton>
                <BaseButton
                  v-if="googleLoginStatus == 1"
                  flat
                  round
                  size="md"
                  class="social-btn google-btn"
                  @click="loginWithGoogle"
                >
                  <q-icon name="fab fa-google" size="20px" />
                </BaseButton>
              </div>
            </div>

            <q-separator class="q-my-md" />
            <div class="row items-center q-gutter-x-md justify-center">
              <BaseLangugeSwitcherButton anchor="top left" self="bottom left" close-on-click />
              <BaseThemeSwitcher />
              <div :class="isDark ? 'text-grey-5' : 'text-grey-7'">
                {{ `@ ${getYearNow()} ${appName} ${appVersion}` }}
              </div>
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

.social-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.facebook-btn {
  background-color: #1877f2;
  color: white;
}

.facebook-btn:hover {
  background-color: #166fe5;
  transform: translateY(-2px);
}

.google-btn {
  background-color: #db4437;
  color: white;
}

.google-btn:hover {
  background-color: #c23321;
  transform: translateY(-2px);
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
