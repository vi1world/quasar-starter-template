<template>
  <div class="space-y-12">
    <!-- Header -->
    <div class="text-center">
      <h2 class="text-display font-black text-slate-900 dark:text-white mb-4">
        Design System <span class="text-contra-gradient">Evolution</span>
      </h2>
      <p class="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
        Compare the evolution from Misskey's clean design to Contra's bold, vibrant aesthetic with enhanced visual impact.
      </p>
    </div>

    <!-- Button Comparison -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Misskey Style -->
      <div class="space-y-6">
        <h3 class="text-2xl font-bold text-slate-900 dark:text-white">
          Misskey Design (Legacy)
        </h3>
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
          <div class="space-y-4">
            <button class="btn-misskey btn-misskey-accent">
              <q-icon name="add" class="mr-2" />
              Primary Action
            </button>
            <button class="btn-misskey btn-misskey-plain">
              <q-icon name="visibility" class="mr-2" />
              Secondary Action
            </button>
          </div>
          
          <div class="mt-8">
            <div class="card-misskey p-6">
              <div class="flex items-center space-x-4 mb-4">
                <div class="w-12 h-12 bg-accent-100 dark:bg-accent-900 rounded-lg flex items-center justify-center">
                  <q-icon name="trending_up" class="text-xl text-accent-600 dark:text-accent-400" />
                </div>
                <div>
                  <h4 class="text-lg font-semibold text-slate-900 dark:text-white">Clean & Minimal</h4>
                  <p class="text-sm text-slate-600 dark:text-slate-400">Subtle and professional</p>
                </div>
              </div>
              <p class="text-slate-600 dark:text-slate-400">
                Misskey's design focuses on clarity and simplicity with muted colors and gentle animations.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Contra Style -->
      <div class="space-y-6">
        <h3 class="text-2xl font-bold text-slate-900 dark:text-white">
          Contra Design (Enhanced)
        </h3>
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
          <div class="space-y-4">
            <button class="btn-contra-primary">
              <q-icon name="rocket_launch" class="mr-2" />
              Primary Action
            </button>
            <button class="btn-contra-electric">
              <q-icon name="flash_on" class="mr-2" />
              Electric Action
            </button>
            <button class="btn-contra-outline">
              <q-icon name="visibility" class="mr-2" />
              Outline Style
            </button>
          </div>
          
          <div class="mt-8">
            <div class="card-contra-gradient p-6">
              <div class="flex items-center space-x-4 mb-4">
                <div class="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                  <q-icon name="auto_awesome" class="text-xl text-white" />
                </div>
                <div>
                  <h4 class="text-lg font-bold text-white">Bold & Vibrant</h4>
                  <p class="text-sm text-white/90">Maximum visual impact</p>
                </div>
              </div>
              <p class="text-white/90">
                Contra's design emphasizes bold typography, vibrant colors, and engaging micro-interactions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Typography Comparison -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Misskey Typography -->
      <div class="space-y-6">
        <h3 class="text-2xl font-bold text-slate-900 dark:text-white">
          Misskey Typography
        </h3>
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 space-y-4">
          <h1 class="text-4xl font-bold text-slate-900 dark:text-white" style="font-family: 'Capriola', sans-serif;">
            Heading Style
          </h1>
          <h2 class="text-2xl font-semibold text-slate-700 dark:text-slate-300" style="font-family: 'Nunito', sans-serif;">
            Subheading Style
          </h2>
          <p class="text-slate-600 dark:text-slate-400" style="font-family: 'Nunito', sans-serif;">
            Body text with Nunito font family. Clean, readable, and professional appearance suitable for long-form content.
          </p>
        </div>
      </div>

      <!-- Contra Typography -->
      <div class="space-y-6">
        <h3 class="text-2xl font-bold text-slate-900 dark:text-white">
          Contra Typography
        </h3>
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 space-y-4">
          <h1 class="text-hero font-black text-slate-900 dark:text-white">
            Bold Impact
          </h1>
          <h2 class="text-headline font-bold text-contra-gradient">
            Vibrant Headings
          </h2>
          <p class="text-lg text-slate-600 dark:text-slate-400 font-medium">
            Body text with Montserrat font family. Bold, confident, and modern appearance that commands attention.
          </p>
        </div>
      </div>
    </div>

    <!-- Color Palette Comparison -->
    <div class="space-y-8">
      <h3 class="text-2xl font-bold text-slate-900 dark:text-white text-center">
        Color Palette Evolution
      </h3>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Misskey Colors -->
        <div class="space-y-4">
          <h4 class="text-xl font-semibold text-slate-900 dark:text-white">Misskey Palette</h4>
          <div class="grid grid-cols-4 gap-4">
            <div class="space-y-2">
              <div class="w-full h-16 bg-accent-600 rounded-lg"></div>
              <p class="text-sm text-slate-600 dark:text-slate-400 text-center">Accent Green</p>
            </div>
            <div class="space-y-2">
              <div class="w-full h-16 bg-slate-600 rounded-lg"></div>
              <p class="text-sm text-slate-600 dark:text-slate-400 text-center">Neutral Gray</p>
            </div>
            <div class="space-y-2">
              <div class="w-full h-16 bg-blue-500 rounded-lg"></div>
              <p class="text-sm text-slate-600 dark:text-slate-400 text-center">Info Blue</p>
            </div>
            <div class="space-y-2">
              <div class="w-full h-16 bg-green-500 rounded-lg"></div>
              <p class="text-sm text-slate-600 dark:text-slate-400 text-center">Success Green</p>
            </div>
          </div>
        </div>

        <!-- Contra Colors -->
        <div class="space-y-4">
          <h4 class="text-xl font-semibold text-slate-900 dark:text-white">Contra Palette</h4>
          <div class="grid grid-cols-4 gap-4">
            <div class="space-y-2">
              <div class="w-full h-16 bg-primary-600 rounded-lg"></div>
              <p class="text-sm text-slate-600 dark:text-slate-400 text-center">Persian Blue</p>
            </div>
            <div class="space-y-2">
              <div class="w-full h-16 bg-electric-500 rounded-lg"></div>
              <p class="text-sm text-slate-600 dark:text-slate-400 text-center">Electric Green</p>
            </div>
            <div class="space-y-2">
              <div class="w-full h-16 bg-sunshine-500 rounded-lg"></div>
              <p class="text-sm text-slate-600 dark:text-slate-400 text-center">Lightning Yellow</p>
            </div>
            <div class="space-y-2">
              <div class="w-full h-16 bg-coral-500 rounded-lg"></div>
              <p class="text-sm text-slate-600 dark:text-slate-400 text-center">Flamingo Red</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Animation Showcase -->
    <div class="text-center space-y-8">
      <h3 class="text-2xl font-bold text-slate-900 dark:text-white">
        Enhanced Animations
      </h3>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="card-contra p-6 hover:shadow-contra-lg hover:-translate-y-2 transition-all duration-300">
          <div class="w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-float">
            <q-icon name="trending_up" class="text-2xl text-primary-600 dark:text-primary-400" />
          </div>
          <h4 class="text-lg font-bold text-slate-900 dark:text-white mb-2">Hover Effects</h4>
          <p class="text-slate-600 dark:text-slate-400">Smooth scale and shadow transitions</p>
        </div>
        
        <div class="card-contra-electric p-6 hover:shadow-contra-hover hover:-translate-y-2 transition-all duration-300">
          <div class="w-16 h-16 bg-white border-2 border-contra-black-950 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-slow">
            <q-icon name="auto_awesome" class="text-2xl text-contra-black-950" />
          </div>
          <h4 class="text-lg font-bold text-white mb-2">Bold Effects</h4>
          <p class="text-white">Strong borders and solid colors</p>
        </div>
        
        <div class="card-contra-sunset p-6 hover:shadow-glow-sunshine hover:-translate-y-2 transition-all duration-300">
          <div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-bounce-slow">
            <q-icon name="rocket_launch" class="text-2xl text-white" />
          </div>
          <h4 class="text-lg font-bold text-white mb-2">Micro-interactions</h4>
          <p class="text-white/90">Delightful motion and feedback</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Component for showcasing design system comparison
</script>

<style scoped>
/* Additional animations for demo */
.animate-pulse-slow {
  animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-bounce-slow {
  animation: bounce 2s infinite;
}
</style>
