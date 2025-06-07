<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-3xl font-bold text-slate-900 dark:text-slate-100">
          Dashboard
        </h1>
        <p class="mt-2 text-slate-600 dark:text-slate-400">
          Welcome back! Here's what's happening with your platform today.
        </p>
      </div>
      <div class="mt-4 sm:mt-0 flex space-x-3">
        <button class="inline-flex items-center px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
          <q-icon name="download" class="mr-2 text-sm" />
          Export
        </button>
        <button class="inline-flex items-center px-4 py-2 bg-accent-600 hover:bg-accent-700 text-white rounded-lg text-sm font-medium transition-colors">
          <q-icon name="add" class="mr-2 text-sm" />
          New Report
        </button>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <ModernStatsCard
        title="Total Revenue"
        value="$45,231.89"
        icon="attach_money"
        change-type="increase"
        change-value="+20.1%"
        change-description="from last month"
        icon-bg="bg-green-100 dark:bg-green-900/20"
        icon-color="text-green-600 dark:text-green-400"
      />
      <ModernStatsCard
        title="Subscriptions"
        value="+2350"
        icon="people"
        change-type="increase"
        change-value="+180.1%"
        change-description="from last month"
        icon-bg="bg-blue-100 dark:bg-blue-900/20"
        icon-color="text-blue-600 dark:text-blue-400"
      />
      <ModernStatsCard
        title="Sales"
        value="+12,234"
        icon="shopping_cart"
        change-type="increase"
        change-value="+19%"
        change-description="from last month"
        icon-bg="bg-purple-100 dark:bg-purple-900/20"
        icon-color="text-purple-600 dark:text-purple-400"
      />
      <ModernStatsCard
        title="Active Now"
        value="+573"
        icon="trending_up"
        change-type="increase"
        change-value="+201"
        change-description="since last hour"
        icon-bg="bg-orange-100 dark:bg-orange-900/20"
        icon-color="text-orange-600 dark:text-orange-400"
      />
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Chart -->
      <div class="lg:col-span-2">
        <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Overview
              </h3>
              <p class="text-sm text-slate-600 dark:text-slate-400">
                Revenue and sales analytics
              </p>
            </div>
            <div class="flex space-x-2">
              <button class="px-3 py-1 text-xs font-medium bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300 rounded-lg">
                Revenue
              </button>
              <button class="px-3 py-1 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
                Sales
              </button>
            </div>
          </div>
          <div class="h-80 flex items-center justify-center bg-slate-50 dark:bg-slate-700 rounded-lg">
            <div class="text-center">
              <q-icon name="bar_chart" class="text-4xl text-slate-400 mb-2" />
              <p class="text-slate-500 dark:text-slate-400">Chart will be rendered here</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Sales -->
      <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Recent Sales
            </h3>
            <p class="text-sm text-slate-600 dark:text-slate-400">
              You made 265 sales this month
            </p>
          </div>
        </div>
        <div class="space-y-4">
          <div v-for="sale in recentSales" :key="sale.id" class="flex items-center space-x-4">
            <img
              :src="sale.avatar"
              :alt="sale.name"
              class="w-10 h-10 rounded-full object-cover"
            />
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                {{ sale.name }}
              </p>
              <p class="text-sm text-slate-500 dark:text-slate-400 truncate">
                {{ sale.email }}
              </p>
            </div>
            <div class="text-sm font-medium text-slate-900 dark:text-slate-100">
              {{ sale.amount }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Activity Feed -->
    <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
      <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-6">
        Recent Activity
      </h3>
      <div class="space-y-4">
        <div v-for="activity in activities" :key="activity.id" class="flex items-start space-x-4">
          <div 
            :class="[
              'w-8 h-8 rounded-full flex items-center justify-center text-white text-sm',
              activity.type === 'user' ? 'bg-blue-500' :
              activity.type === 'sale' ? 'bg-green-500' :
              activity.type === 'system' ? 'bg-orange-500' : 'bg-gray-500'
            ]"
          >
            <q-icon :name="activity.icon" class="text-sm" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm text-slate-900 dark:text-slate-100">
              {{ activity.description }}
            </p>
            <p class="text-xs text-slate-500 dark:text-slate-400">
              {{ activity.time }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ModernStatsCard from '@/components/modern/ModernStatsCard.vue';

defineOptions({
  name: 'ModernDashboard',
});

const recentSales = [
  {
    id: 1,
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    amount: '+$1,999.00',
    avatar: '/images/no_picture_thumb.jpg',
  },
  {
    id: 2,
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    amount: '+$539.00',
    avatar: '/images/no_picture_thumb.jpg',
  },
  {
    id: 3,
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    amount: '+$299.00',
    avatar: '/images/no_picture_thumb.jpg',
  },
  {
    id: 4,
    name: 'William Kim',
    email: 'will@email.com',
    amount: '+$99.00',
    avatar: '/images/no_picture_thumb.jpg',
  },
];

const activities = [
  {
    id: 1,
    type: 'user',
    icon: 'person_add',
    description: 'New user registered: john.doe@example.com',
    time: '2 minutes ago',
  },
  {
    id: 2,
    type: 'sale',
    icon: 'shopping_cart',
    description: 'New sale completed: $299.00',
    time: '5 minutes ago',
  },
  {
    id: 3,
    type: 'system',
    icon: 'settings',
    description: 'System backup completed successfully',
    time: '10 minutes ago',
  },
  {
    id: 4,
    type: 'user',
    icon: 'edit',
    description: 'User profile updated: jane.smith@example.com',
    time: '15 minutes ago',
  },
];
</script>
