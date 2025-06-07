<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900">
    
    <!-- Contra Navigation -->
    <ContraNavigation
      logo-text="Contra Design"
      :nav-items="navItems"
      :user-menu-items="userMenuItems"
      :notification-count="3"
      cta-text="Get Started"
      @cta-click="handleCtaClick"
      @notifications-click="handleNotificationsClick"
    />

    <!-- Hero Section -->
    <ContraHero
      title="Experience the <span class='text-sunshine-400'>Future</span> of Design"
      subtitle="Bold, vibrant, and uniquely crafted components that make your applications stand out from the crowd."
      badge="✨ New Design System"
      badge-icon="auto_awesome"
      primary-cta="Explore Components"
      primary-icon="rocket_launch"
      secondary-cta="View Documentation"
      secondary-icon="description"
      variant="primary"
      :stats="heroStats"
      @primary-click="scrollToComponents"
      @secondary-click="openDocs"
    />

    <!-- Stats Section -->
    <section id="components" class="py-24 bg-white dark:bg-slate-800">
      <div class="container-contra">
        <div class="text-center mb-16">
          <h2 class="text-headline font-black text-slate-900 dark:text-white mb-6">
            Powerful <span class="text-contra-gradient">Analytics</span> at Your Fingertips
          </h2>
          <p class="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Track your progress with beautiful, interactive components that bring your data to life.
          </p>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ContraStatsCard
            title="Total Users"
            :value="12500"
            icon="people"
            description="Active users this month"
            :trend="12.5"
            color="primary"
            @click="handleStatsClick('users')"
          />
          
          <ContraStatsCard
            title="Revenue"
            value="$45.2K"
            icon="trending_up"
            description="Monthly recurring revenue"
            :trend="8.3"
            :progress="75"
            variant="gradient"
            color="electric"
            @click="handleStatsClick('revenue')"
          />
          
          <ContraStatsCard
            title="Conversion Rate"
            value="3.24%"
            icon="conversion_path"
            description="Visitor to customer rate"
            :trend="-2.1"
            :progress="65"
            color="sunshine"
            @click="handleStatsClick('conversion')"
          />
          
          <ContraStatsCard
            title="Support Tickets"
            :value="89"
            icon="support_agent"
            description="Open tickets this week"
            :trend="15.7"
            variant="gradient"
            color="coral"
            @click="handleStatsClick('support')"
          />
        </div>
      </div>
    </section>

    <!-- Component Showcase -->
    <section class="py-24 bg-slate-50 dark:bg-slate-900">
      <div class="container-contra">
        <div class="text-center mb-16">
          <h2 class="text-headline font-black text-slate-900 dark:text-white mb-6">
            <span class="text-electric-gradient">Component</span> Variations
          </h2>
          <p class="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Explore different styles and variants of our Contra-inspired design system.
          </p>
        </div>

        <!-- Button Showcase -->
        <div class="mb-16">
          <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            Interactive Buttons
          </h3>
          <div class="flex flex-wrap items-center justify-center gap-6">
            <button class="btn-contra-primary">
              <q-icon name="rocket_launch" class="mr-2" />
              Primary Action
            </button>
            
            <button class="btn-contra-electric">
              <q-icon name="flash_on" class="mr-2" />
              Electric Vibes
            </button>
            
            <button class="btn-contra-sunshine">
              <q-icon name="wb_sunny" class="mr-2" />
              Sunshine Bright
            </button>
            
            <button class="btn-contra-coral">
              <q-icon name="favorite" class="mr-2" />
              Coral Passion
            </button>
            
            <button class="btn-contra-outline">
              <q-icon name="visibility" class="mr-2" />
              Outline Style
            </button>
          </div>
        </div>

        <!-- Card Showcase -->
        <div class="mb-16">
          <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            Beautiful Cards
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="card-contra p-8 text-center">
              <div class="w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <q-icon name="design_services" class="text-2xl text-primary-600 dark:text-primary-400" />
              </div>
              <h4 class="text-xl font-bold text-slate-900 dark:text-white mb-4">Design System</h4>
              <p class="text-slate-600 dark:text-slate-400">Comprehensive design tokens and components for consistent UI.</p>
            </div>
            
            <div class="card-contra-gradient p-8 text-center">
              <div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <q-icon name="palette" class="text-2xl text-white" />
              </div>
              <h4 class="text-xl font-bold text-white mb-4">Vibrant Colors</h4>
              <p class="text-white/90">Bold and energetic color palette inspired by modern design trends.</p>
            </div>
            
            <div class="card-contra-electric p-8 text-center">
              <div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <q-icon name="auto_awesome" class="text-2xl text-white" />
              </div>
              <h4 class="text-xl font-bold text-white mb-4">Micro-interactions</h4>
              <p class="text-white/90">Smooth animations and transitions that delight users.</p>
            </div>
          </div>
        </div>

        <!-- Typography Showcase -->
        <div class="text-center space-y-8">
          <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-8">
            Typography Scale
          </h3>
          
          <div class="space-y-6">
            <h1 class="text-hero font-black text-slate-900 dark:text-white">
              Hero Typography
            </h1>
            <h2 class="text-display font-extra-bold text-slate-800 dark:text-slate-100">
              Display Heading
            </h2>
            <h3 class="text-headline font-bold text-slate-700 dark:text-slate-200">
              Headline Text
            </h3>
            <p class="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              This is a large paragraph text that demonstrates the readability and spacing of our typography system. It's designed to be both beautiful and functional.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-electric-600 text-white relative overflow-hidden">
      <!-- Background Elements -->
      <div class="absolute inset-0">
        <div class="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
        <div class="absolute bottom-10 right-10 w-24 h-24 bg-white/5 rounded-full animate-float" style="animation-delay: 2s;"></div>
      </div>
      
      <div class="container-contra relative z-10 text-center">
        <h2 class="text-display font-black mb-6">
          Ready to Transform Your UI?
        </h2>
        <p class="text-xl mb-12 max-w-2xl mx-auto opacity-90">
          Start building with our Contra-inspired design system and create applications that truly stand out.
        </p>
        
        <div class="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <button class="btn-contra bg-white text-slate-900 hover:bg-white/90 shadow-2xl">
            <q-icon name="download" class="mr-2" />
            Download Components
          </button>
          
          <button class="btn-contra bg-transparent border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-lg">
            <q-icon name="code" class="mr-2" />
            View Source Code
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ContraNavigation from '@/components/modern/ContraNavigation.vue';
import ContraHero from '@/components/modern/ContraHero.vue';
import ContraStatsCard from '@/components/modern/ContraStatsCard.vue';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Components', to: '/components' },
  { label: 'Documentation', to: '/docs' },
  { label: 'Examples', to: '/examples' },
];

const userMenuItems = [
  { label: 'Profile', icon: 'person', action: 'profile' },
  { label: 'Settings', icon: 'settings', action: 'settings' },
  { label: 'Help', icon: 'help', action: 'help' },
  { label: 'Logout', icon: 'logout', action: 'logout' },
];

const heroStats = [
  { value: '50+', label: 'Components' },
  { value: '99%', label: 'Satisfaction' },
  { value: '24/7', label: 'Support' },
];

const handleCtaClick = () => {
  console.log('CTA clicked');
};

const handleNotificationsClick = () => {
  console.log('Notifications clicked');
};

const scrollToComponents = () => {
  document.getElementById('components')?.scrollIntoView({ behavior: 'smooth' });
};

const openDocs = () => {
  console.log('Opening documentation');
};

const handleStatsClick = (type: string) => {
  console.log(`Stats clicked: ${type}`);
};
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
