<script setup lang="ts">
import {
  biEye,
  biEyeSlash,
  biLock,
  biPerson,
  biX,
} from '@quasar/extras/bootstrap-icons';
import { ref } from 'vue';

// Simplified state management
const email = ref<string>('admin@mydomain.com');
const password = ref<string>('P@ssw0rd');
const showPassword = ref<boolean>(false);
const loading = ref<boolean>(false);
// Simplified login functions
const onSubmit = async () => {
  loading.value = true;
  console.log('Login attempt:', { email: email.value, password: password.value });

  // Simulate login for now
  setTimeout(() => {
    loading.value = false;
    alert('Login functionality will be implemented later!');
  }, 1000);
};

const onReset = () => {
  email.value = '';
  password.value = '';
  showPassword.value = false;
};
</script>
<template>
  <q-page padding class="bg-white">
    <!-- Contra Login Container -->
    <div class="contra-login-container">
      <!-- Close Button -->
      <button class="contra-close-btn" @click="$router.go(-1)">
        <q-icon :name="biX" size="24px" class="text-black" />
      </button>

      <!-- Login Content -->
      <div class="contra-login-content">
        <!-- Logo -->
        <div class="contra-logo-container">
          <div class="contra-logo-circle">
            <span class="contra-logo-text">C</span>
          </div>
        </div>

        <!-- Login Title -->
        <h1 class="contra-login-title">Login</h1>

        <!-- Login Form -->
        <q-form ref="loginForm" class="contra-login-form" @submit.prevent="onSubmit" @reset="onReset()">
          <!-- Email Input -->
          <div class="contra-input-group">
            <div class="contra-input-wrapper">
              <q-icon :name="biPerson" class="contra-input-icon" />
              <input
                v-model="email"
                :readonly="loading"
                type="email"
                placeholder="Email address"
                class="contra-input"
                required
              />
            </div>
          </div>

          <!-- Password Input -->
          <div class="contra-input-group">
            <div class="contra-input-wrapper">
              <q-icon :name="biLock" class="contra-input-icon" />
              <input
                v-model="password"
                :readonly="loading"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                class="contra-input"
                required
              />
              <button
                type="button"
                class="contra-password-toggle"
                @click="showPassword = !showPassword"
              >
                <q-icon :name="showPassword ? biEye : biEyeSlash" class="text-gray-500" />
              </button>
            </div>
          </div>

          <!-- Sign In Button -->
          <button
            type="submit"
            class="contra-signin-btn"
            :disabled="loading"
          >
            <span class="contra-signin-text">
              {{ loading ? 'Signing in...' : 'Sign in' }}
            </span>
            <q-icon name="arrow_forward" class="contra-signin-icon" />
          </button>
        </q-form>

        <!-- Create New Account Link -->
        <div class="contra-signup-link">
          <span class="text-gray-600">You are new? </span>
          <a href="/signup" class="contra-create-link">Create new</a>
        </div>
      </div>
    </div>
  </q-page>
</template>
<style scoped>
/* Contra Design System - Login Page Styles */

.contra-login-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  position: relative;
  padding: 24px;
}

.contra-close-btn {
  position: absolute;
  top: 24px;
  left: 24px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid #000000;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.contra-close-btn:hover {
  background-color: #000000;
}

.contra-close-btn:hover .q-icon {
  color: #ffffff !important;
}

.contra-login-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 400px;
  margin: 0 auto;
  width: 100%;
}

.contra-logo-container {
  margin-bottom: 48px;
}

.contra-logo-circle {
  width: 120px;
  height: 120px;
  background-color: #ffbd12;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid #000000;
}

.contra-logo-text {
  font-size: 48px;
  font-weight: 900;
  color: #000000;
  font-family: 'Montserrat', sans-serif;
}

.contra-login-title {
  font-size: 48px;
  font-weight: 900;
  color: #000000;
  margin-bottom: 48px;
  font-family: 'Montserrat', sans-serif;
}

.contra-login-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.contra-input-group {
  width: 100%;
}

.contra-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.contra-input-icon {
  position: absolute;
  left: 16px;
  z-index: 2;
  color: #6b7280;
  font-size: 20px;
}

.contra-input {
  width: 100%;
  padding: 16px 16px 16px 52px;
  font-size: 18px;
  font-weight: 500;
  border: 2px solid #000000;
  border-radius: 12px;
  background-color: #ffffff;
  color: #000000;
  outline: none;
  transition: border-color 0.2s ease;
  font-family: 'Montserrat', sans-serif;
}

.contra-input:focus {
  border-color: #ff6b35;
}

.contra-input::placeholder {
  color: #6b7280;
  font-weight: 500;
}

.contra-password-toggle {
  position: absolute;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  z-index: 2;
}

.contra-signin-btn {
  width: 100%;
  padding: 20px 24px;
  background-color: #000000;
  border: none;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 24px;
}

.contra-signin-btn:hover:not(:disabled) {
  background-color: #333333;
  transform: translateY(-1px);
}

.contra-signin-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.contra-signin-text {
  font-size: 18px;
  font-weight: 900;
  color: #ffffff;
  font-family: 'Montserrat', sans-serif;
}

.contra-signin-icon {
  color: #ffffff;
  font-size: 20px;
}

.contra-signup-link {
  margin-top: 48px;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
}

.contra-create-link {
  color: #ff6b35 !important;
  font-weight: 700;
  text-decoration: none;
}

.contra-create-link:hover {
  text-decoration: underline;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .contra-login-container {
    padding: 16px;
  }

  .contra-close-btn {
    top: 16px;
    left: 16px;
    width: 40px;
    height: 40px;
  }

  .contra-logo-circle {
    width: 100px;
    height: 100px;
  }

  .contra-logo-text {
    font-size: 40px;
  }

  .contra-login-title {
    font-size: 36px;
    margin-bottom: 32px;
  }

  .contra-input {
    padding: 14px 14px 14px 48px;
    font-size: 16px;
  }

  .contra-signin-btn {
    padding: 18px 20px;
  }

  .contra-signin-text {
    font-size: 16px;
  }
}
</style>
