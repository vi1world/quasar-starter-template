<template>
  <section 
    :class="[
      'relative min-h-screen flex items-center justify-center overflow-hidden',
      backgroundClass
    ]"
  >
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden">
      <!-- Floating Orbs -->
      <div 
        v-for="(orb, index) in orbs" 
        :key="index"
        :class="[
          'absolute rounded-full opacity-20 animate-float',
          orb.class
        ]"
        :style="{
          left: orb.left,
          top: orb.top,
          width: orb.size,
          height: orb.size,
          animationDelay: orb.delay
        }"
      ></div>
      
      <!-- Grid Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div 
          class="w-full h-full"
          style="background-image: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 50px 50px;"
        ></div>
      </div>
    </div>

    <!-- Content Container -->
    <div class="container-contra relative z-10">
      <div class="text-center space-y-8 animate-slide-up">
        
        <!-- Badge/Announcement -->
        <div 
          v-if="badge"
          class="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-white/20 backdrop-blur-lg border border-white/30 text-white/90 text-sm font-medium animate-scale-in"
        >
          <q-icon v-if="badgeIcon" :name="badgeIcon" class="text-lg" />
          <span>{{ badge }}</span>
        </div>

        <!-- Main Heading -->
        <h1 class="text-hero text-white font-black leading-none tracking-tight max-w-4xl mx-auto">
          <span v-html="title"></span>
        </h1>

        <!-- Subtitle -->
        <p 
          v-if="subtitle"
          class="text-xl md:text-2xl text-white/90 font-medium max-w-2xl mx-auto leading-relaxed"
        >
          {{ subtitle }}
        </p>

        <!-- CTA Buttons -->
        <div 
          v-if="primaryCta || secondaryCta"
          class="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 pt-8"
        >
          <button 
            v-if="primaryCta"
            @click="$emit('primary-click')"
            class="btn-contra bg-white text-slate-900 hover:bg-white/90 shadow-2xl hover:shadow-glow-sunshine transform hover:scale-105 active:scale-95"
          >
            <q-icon v-if="primaryIcon" :name="primaryIcon" class="mr-2" />
            {{ primaryCta }}
          </button>
          
          <button 
            v-if="secondaryCta"
            @click="$emit('secondary-click')"
            class="btn-contra bg-transparent border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-lg"
          >
            <q-icon v-if="secondaryIcon" :name="secondaryIcon" class="mr-2" />
            {{ secondaryCta }}
          </button>
        </div>

        <!-- Stats or Features -->
        <div 
          v-if="stats && stats.length > 0"
          class="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 max-w-4xl mx-auto"
        >
          <div 
            v-for="(stat, index) in stats"
            :key="index"
            class="text-center space-y-2 animate-fade-in"
            :style="{ animationDelay: `${index * 0.2}s` }"
          >
            <div class="text-4xl font-black text-white">{{ stat.value }}</div>
            <div class="text-white/80 font-medium">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div 
      v-if="showScrollIndicator"
      class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow"
    >
      <div class="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
        <div class="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
      </div>
    </div>

    <!-- Decorative Elements -->
    <div class="absolute top-1/4 left-10 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
    <div class="absolute top-1/3 right-20 w-1 h-1 bg-white/40 rounded-full animate-pulse" style="animation-delay: 1s;"></div>
    <div class="absolute bottom-1/4 left-1/4 w-1.5 h-1.5 bg-white/20 rounded-full animate-pulse" style="animation-delay: 2s;"></div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Stat {
  value: string;
  label: string;
}

interface Props {
  title: string;
  subtitle?: string;
  badge?: string;
  badgeIcon?: string;
  primaryCta?: string;
  primaryIcon?: string;
  secondaryCta?: string;
  secondaryIcon?: string;
  variant?: 'primary' | 'electric' | 'sunset';
  stats?: Stat[];
  showScrollIndicator?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  showScrollIndicator: true
});

defineEmits<{
  'primary-click': [];
  'secondary-click': [];
}>();

const backgroundClass = computed(() => {
  switch (props.variant) {
    case 'electric':
      return 'hero-electric';
    case 'sunset':
      return 'hero-sunset';
    default:
      return 'hero-contra';
  }
});

const orbs = computed(() => {
  const baseOrbs = [
    {
      class: 'bg-white/10',
      left: '10%',
      top: '20%',
      size: '200px',
      delay: '0s'
    },
    {
      class: 'bg-white/5',
      left: '80%',
      top: '10%',
      size: '150px',
      delay: '2s'
    },
    {
      class: 'bg-white/8',
      left: '70%',
      top: '70%',
      size: '100px',
      delay: '4s'
    },
    {
      class: 'bg-white/6',
      left: '20%',
      top: '80%',
      size: '120px',
      delay: '1s'
    },
    {
      class: 'bg-white/4',
      left: '50%',
      top: '30%',
      size: '80px',
      delay: '3s'
    }
  ];

  return baseOrbs;
});
</script>

<style scoped>
.animate-slide-up {
  animation: slideUp 0.8s ease-out;
}

.animate-scale-in {
  animation: scaleIn 0.6s ease-out 0.2s both;
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out both;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
