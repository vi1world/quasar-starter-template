<template>
  <q-page padding class="flex flex-center">
    <div class="text-center">
      <h1 class="text-h3 q-mb-md">Simple Login Test</h1>
      <p>If you can see this, the layout is working!</p>
      
      <q-form class="q-gutter-md" style="max-width: 400px">
        <q-input
          v-model="email"
          label="Email"
          type="email"
          outlined
        />
        
        <q-input
          v-model="password"
          label="Password"
          type="password"
          outlined
        />
        
        <q-btn
          label="Login"
          color="primary"
          class="full-width"
          @click="onLogin"
        />
      </q-form>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('admin@mydomain.com')
const password = ref('P@ssw0rd')

const onLogin = () => {
  console.log('Login clicked!', { email: email.value, password: password.value })
}
</script>
