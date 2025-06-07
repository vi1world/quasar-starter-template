<template>
  <q-page class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center justify-center bg-green-50">
      <div class="text-center p-8">
        <div class="space-y-8">
          <!-- Main Heading -->
          <h1 class="text-6xl font-bold text-green-800">
            Welcome to
            <span class="text-green-600">Misskey</span>
          </h1>

          <!-- Subtitle -->
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            A modern, beautiful, and powerful social platform that connects people around the world.
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button class="bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 transition-colors">
              Get Started
            </button>
            <button class="bg-white text-green-600 px-8 py-3 rounded-full font-bold border-2 border-green-600 hover:bg-green-50 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-white">
      <div class="max-w-6xl mx-auto px-6">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-gray-800 mb-4">
            Key Features
          </h2>
          <p class="text-xl text-gray-600">
            Discover what makes our platform special.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="feature in features" :key="feature.title" class="text-center p-6 bg-gray-50 rounded-lg">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <q-icon :name="feature.icon" class="text-2xl text-green-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">
              {{ feature.title }}
            </h3>
            <p class="text-gray-600">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-16 bg-green-600">
      <div class="max-w-6xl mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div v-for="stat in stats" :key="stat.label">
            <div class="text-4xl font-bold text-white mb-2">
              {{ stat.value }}
            </div>
            <div class="text-lg text-green-100">
              {{ stat.label }}
            </div>
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup lang="ts">
defineOptions({
  name: 'MisskeyDemo',
});

const features = [
  {
    icon: 'public',
    title: 'Open Source',
    description: 'Built with transparency and community collaboration.',
  },
  {
    icon: 'hub',
    title: 'Federated',
    description: 'Connect with users across different platforms.',
  },
  {
    icon: 'extension',
    title: 'Powerful',
    description: 'Rich features and customization options.',
  },
];

const stats = [
  {
    value: '1M+',
    label: 'Active Users',
  },
  {
    value: '500+',
    label: 'Servers',
  },
  {
    value: '99.9%',
    label: 'Uptime',
  },
];
</script>
