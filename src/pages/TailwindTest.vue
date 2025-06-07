<template>
  <q-page class="p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold text-blue-600 mb-8">Tailwind CSS Test</h1>
      
      <!-- Basic Colors Test -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Color Test</h2>
        <div class="grid grid-cols-4 gap-4">
          <div class="bg-red-500 text-white p-4 rounded">Red</div>
          <div class="bg-green-500 text-white p-4 rounded">Green</div>
          <div class="bg-blue-500 text-white p-4 rounded">Blue</div>
          <div class="bg-yellow-500 text-white p-4 rounded">Yellow</div>
        </div>
      </div>

      <!-- Spacing Test -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Spacing Test</h2>
        <div class="space-y-4">
          <div class="p-2 bg-gray-200">Padding 2</div>
          <div class="p-4 bg-gray-300">Padding 4</div>
          <div class="p-6 bg-gray-400">Padding 6</div>
        </div>
      </div>

      <!-- Flexbox Test -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Flexbox Test</h2>
        <div class="flex justify-between items-center bg-gray-100 p-4 rounded">
          <div class="bg-purple-500 text-white p-2 rounded">Left</div>
          <div class="bg-purple-500 text-white p-2 rounded">Center</div>
          <div class="bg-purple-500 text-white p-2 rounded">Right</div>
        </div>
      </div>

      <!-- Custom Accent Colors Test -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Custom Accent Colors Test</h2>
        <div class="grid grid-cols-3 gap-4">
          <div class="bg-accent-500 text-white p-4 rounded">Accent 500</div>
          <div class="bg-accent-600 text-white p-4 rounded">Accent 600</div>
          <div class="bg-accent-700 text-white p-4 rounded">Accent 700</div>
        </div>
      </div>

      <!-- Button Test -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Button Test</h2>
        <div class="space-x-4">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Primary Button
          </button>
          <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Secondary Button
          </button>
        </div>
      </div>

      <!-- Typography Test -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Typography Test</h2>
        <div class="space-y-2">
          <p class="text-xs">Extra Small Text</p>
          <p class="text-sm">Small Text</p>
          <p class="text-base">Base Text</p>
          <p class="text-lg">Large Text</p>
          <p class="text-xl">Extra Large Text</p>
          <p class="text-2xl">2XL Text</p>
        </div>
      </div>

      <!-- Font Family Test -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Font Family Test</h2>
        <div class="space-y-2">
          <p class="font-sans">Sans Serif (Nunito)</p>
          <p class="font-title">Title Font (Capriola)</p>
          <p class="font-content-sans">Content Sans (Nunito)</p>
        </div>
      </div>

      <!-- Dark Mode Test -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold mb-4">Dark Mode Test</h2>
        <div class="bg-white dark:bg-gray-800 text-black dark:text-white p-4 rounded border">
          This text should change color in dark mode
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
defineOptions({
  name: 'TailwindTest',
});
</script>
