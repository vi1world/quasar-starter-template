<template>
  <q-page class="p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold text-blue-600 mb-8">Icon Test Page</h1>
      
      <!-- Material Icons Test -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Material Icons Test</h2>
        <div class="grid grid-cols-6 gap-4">
          <div class="text-center p-4 bg-gray-100 rounded">
            <q-icon name="dashboard" class="text-3xl text-blue-600 mb-2" />
            <p class="text-sm">dashboard</p>
          </div>
          <div class="text-center p-4 bg-gray-100 rounded">
            <q-icon name="people" class="text-3xl text-green-600 mb-2" />
            <p class="text-sm">people</p>
          </div>
          <div class="text-center p-4 bg-gray-100 rounded">
            <q-icon name="settings" class="text-3xl text-purple-600 mb-2" />
            <p class="text-sm">settings</p>
          </div>
          <div class="text-center p-4 bg-gray-100 rounded">
            <q-icon name="analytics" class="text-3xl text-orange-600 mb-2" />
            <p class="text-sm">analytics</p>
          </div>
          <div class="text-center p-4 bg-gray-100 rounded">
            <q-icon name="attach_money" class="text-3xl text-green-600 mb-2" />
            <p class="text-sm">attach_money</p>
          </div>
          <div class="text-center p-4 bg-gray-100 rounded">
            <q-icon name="shopping_cart" class="text-3xl text-red-600 mb-2" />
            <p class="text-sm">shopping_cart</p>
          </div>
          <div class="text-center p-4 bg-gray-100 rounded">
            <q-icon name="trending_up" class="text-3xl text-blue-600 mb-2" />
            <p class="text-sm">trending_up</p>
          </div>
          <div class="text-center p-4 bg-gray-100 rounded">
            <q-icon name="notifications" class="text-3xl text-yellow-600 mb-2" />
            <p class="text-sm">notifications</p>
          </div>
          <div class="text-center p-4 bg-gray-100 rounded">
            <q-icon name="search" class="text-3xl text-gray-600 mb-2" />
            <p class="text-sm">search</p>
          </div>
          <div class="text-center p-4 bg-gray-100 rounded">
            <q-icon name="menu" class="text-3xl text-slate-600 mb-2" />
            <p class="text-sm">menu</p>
          </div>
          <div class="text-center p-4 bg-gray-100 rounded">
            <q-icon name="dark_mode" class="text-3xl text-indigo-600 mb-2" />
            <p class="text-sm">dark_mode</p>
          </div>
          <div class="text-center p-4 bg-gray-100 rounded">
            <q-icon name="light_mode" class="text-3xl text-yellow-500 mb-2" />
            <p class="text-sm">light_mode</p>
          </div>
        </div>
      </div>

      <!-- Navigation Icons -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Navigation Icons</h2>
        <div class="grid grid-cols-6 gap-4">
          <div class="text-center p-4 bg-gray-100 rounded">
            <q-icon name="keyboard_arrow_down" class="text-3xl text-gray-600 mb-2" />
            <p class="text-sm">keyboard_arrow_down</p>
          </div>
          <div class="text-center p-4 bg-gray-100 rounded">
            <q-icon name="keyboard_arrow_up" class="text-3xl text-gray-600 mb-2" />
            <p class="text-sm">keyboard_arrow_up</p>
          </div>
          <div class="text-center p-4 bg-gray-100 rounded">
            <q-icon name="chevron_right" class="text-3xl text-gray-600 mb-2" />
            <p class="text-sm">chevron_right</p>
          </div>
          <div class="text-center p-4 bg-gray-100 rounded">
            <q-icon name="close" class="text-3xl text-red-600 mb-2" />
            <p class="text-sm">close</p>
          </div>
          <div class="text-center p-4 bg-gray-100 rounded">
            <q-icon name="menu_open" class="text-3xl text-blue-600 mb-2" />
            <p class="text-sm">menu_open</p>
          </div>
          <div class="text-center p-4 bg-gray-100 rounded">
            <q-icon name="logout" class="text-3xl text-red-500 mb-2" />
            <p class="text-sm">logout</p>
          </div>
        </div>
      </div>

      <!-- Activity Icons -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Activity Icons</h2>
        <div class="grid grid-cols-6 gap-4">
          <div class="text-center p-4 bg-gray-100 rounded">
            <q-icon name="person_add" class="text-3xl text-blue-600 mb-2" />
            <p class="text-sm">person_add</p>
          </div>
          <div class="text-center p-4 bg-gray-100 rounded">
            <q-icon name="edit" class="text-3xl text-green-600 mb-2" />
            <p class="text-sm">edit</p>
          </div>
          <div class="text-center p-4 bg-gray-100 rounded">
            <q-icon name="download" class="text-3xl text-purple-600 mb-2" />
            <p class="text-sm">download</p>
          </div>
          <div class="text-center p-4 bg-gray-100 rounded">
            <q-icon name="add" class="text-3xl text-green-600 mb-2" />
            <p class="text-sm">add</p>
          </div>
          <div class="text-center p-4 bg-gray-100 rounded">
            <q-icon name="bar_chart" class="text-3xl text-blue-600 mb-2" />
            <p class="text-sm">bar_chart</p>
          </div>
          <div class="text-center p-4 bg-gray-100 rounded">
            <q-icon name="person" class="text-3xl text-gray-600 mb-2" />
            <p class="text-sm">person</p>
          </div>
        </div>
      </div>

      <!-- Status Check -->
      <div class="bg-white p-6 rounded-lg border">
        <h3 class="text-lg font-semibold mb-4">Icon Status Check</h3>
        <div class="space-y-2">
          <p class="text-sm">
            <span class="font-medium">Material Icons Font:</span>
            <span id="material-icons-status" class="ml-2 px-2 py-1 rounded text-xs">Checking...</span>
          </p>
          <p class="text-sm">
            <span class="font-medium">Quasar Icon Set:</span>
            <span class="ml-2 text-green-600">material-icons</span>
          </p>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

defineOptions({
  name: 'IconTest',
});

onMounted(() => {
  // Check if Material Icons font is loaded
  const checkFont = () => {
    const statusEl = document.getElementById('material-icons-status');
    if (statusEl) {
      // Check if the font is available
      if (document.fonts && document.fonts.check) {
        const isFontLoaded = document.fonts.check('1em Material Icons');
        if (isFontLoaded) {
          statusEl.textContent = 'Loaded ✓';
          statusEl.className = 'ml-2 px-2 py-1 rounded text-xs bg-green-100 text-green-800';
        } else {
          statusEl.textContent = 'Not Loaded ✗';
          statusEl.className = 'ml-2 px-2 py-1 rounded text-xs bg-red-100 text-red-800';
        }
      } else {
        statusEl.textContent = 'Cannot Check';
        statusEl.className = 'ml-2 px-2 py-1 rounded text-xs bg-yellow-100 text-yellow-800';
      }
    }
  };

  // Check immediately and after a delay
  setTimeout(checkFont, 100);
  setTimeout(checkFont, 1000);
});
</script>
