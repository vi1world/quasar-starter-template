<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { router } from '@inertiajs/vue3';
import { useQuasar } from 'quasar';
import { debounce } from 'quasar';

// Types
interface FilterField {
  name: string;
  type: 'text' | 'select' | 'date' | 'daterange';
  label: string;
  placeholder?: string;
  options?: { label: string; value: any }[];
  clearable?: boolean;
  multiple?: boolean;
}

interface Props {
  filters: FilterField[];
  modelValue: Record<string, any>;
  loading?: boolean;
  showClearAll?: boolean;
  preserveState?: boolean;
  preserveScroll?: boolean;
  only?: string[];
  debounceMs?: number;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  showClearAll: true,
  preserveState: true,
  preserveScroll: true,
  debounceMs: 300
});

const emit = defineEmits<{
  'update:modelValue': [value: Record<string, any>];
  search: [filters: Record<string, any>];
  clear: [];
}>();

const $q = useQuasar();

// Local state
const localFilters = ref({ ...props.modelValue });
const isExpanded = ref(false);

// Computed
const hasActiveFilters = computed(() => {
  return Object.values(localFilters.value).some(value => {
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return value !== null && value !== undefined && value !== '';
  });
});

const activeFiltersCount = computed(() => {
  return Object.values(localFilters.value).filter(value => {
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return value !== null && value !== undefined && value !== '';
  }).length;
});

// Debounced search function
const debouncedSearch = debounce(() => {
  performSearch();
}, props.debounceMs);

// Methods
function updateFilter(name: string, value: any) {
  localFilters.value[name] = value;
  emit('update:modelValue', { ...localFilters.value });
  
  // Auto-search for text inputs, immediate search for others
  if (props.filters.find(f => f.name === name)?.type === 'text') {
    debouncedSearch();
  } else {
    performSearch();
  }
}

function performSearch() {
  const cleanFilters = cleanEmptyFilters(localFilters.value);
  
  emit('search', cleanFilters);
  
  // Use Inertia router for navigation if available
  if (typeof router !== 'undefined') {
    router.get(window.location.pathname, cleanFilters, {
      preserveState: props.preserveState,
      preserveScroll: props.preserveScroll,
      only: props.only,
      replace: true
    });
  }
}

function cleanEmptyFilters(filters: Record<string, any>) {
  const cleaned: Record<string, any> = {};
  
  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      if (value.length > 0) {
        cleaned[key] = value;
      }
    } else if (value !== null && value !== undefined && value !== '') {
      cleaned[key] = value;
    }
  });
  
  return cleaned;
}

function clearAllFilters() {
  const clearedFilters: Record<string, any> = {};
  
  props.filters.forEach(filter => {
    if (filter.multiple || filter.type === 'daterange') {
      clearedFilters[filter.name] = [];
    } else {
      clearedFilters[filter.name] = '';
    }
  });
  
  localFilters.value = clearedFilters;
  emit('update:modelValue', clearedFilters);
  emit('clear');
  
  performSearch();
}

function toggleExpanded() {
  isExpanded.value = !isExpanded.value;
}

// Watch for external changes
watch(() => props.modelValue, (newValue) => {
  localFilters.value = { ...newValue };
}, { deep: true });
</script>

<template>
  <q-card class="search-filter-card">
    <q-card-section class="q-pb-none">
      <div class="row items-center justify-between">
        <div class="text-h6 text-grey-8">
          <q-icon name="filter_list" class="q-mr-sm" />
          Filters
          <q-badge
            v-if="activeFiltersCount > 0"
            :label="activeFiltersCount"
            color="primary"
            class="q-ml-sm"
          />
        </div>
        
        <div class="row q-gutter-sm">
          <q-btn
            v-if="showClearAll && hasActiveFilters"
            flat
            dense
            color="negative"
            icon="clear_all"
            label="Clear All"
            @click="clearAllFilters"
          />
          
          <q-btn
            v-if="filters.length > 3"
            flat
            dense
            :icon="isExpanded ? 'expand_less' : 'expand_more'"
            :label="isExpanded ? 'Less' : 'More'"
            @click="toggleExpanded"
          />
        </div>
      </div>
    </q-card-section>

    <q-card-section>
      <div class="row q-gutter-md">
        <!-- Always show first 3 filters -->
        <template v-for="(filter, index) in filters" :key="filter.name">
          <div
            v-if="index < 3 || isExpanded"
            class="col-12 col-sm-6 col-md-4"
          >
            <!-- Text Input -->
            <q-input
              v-if="filter.type === 'text'"
              :model-value="localFilters[filter.name]"
              :label="filter.label"
              :placeholder="filter.placeholder"
              :clearable="filter.clearable !== false"
              outlined
              dense
              debounce="300"
              @update:model-value="updateFilter(filter.name, $event)"
            >
              <template #prepend>
                <q-icon name="search" />
              </template>
            </q-input>

            <!-- Select -->
            <q-select
              v-else-if="filter.type === 'select'"
              :model-value="localFilters[filter.name]"
              :options="filter.options"
              :label="filter.label"
              :multiple="filter.multiple"
              :clearable="filter.clearable !== false"
              outlined
              dense
              emit-value
              map-options
              @update:model-value="updateFilter(filter.name, $event)"
            />

            <!-- Date -->
            <q-input
              v-else-if="filter.type === 'date'"
              :model-value="localFilters[filter.name]"
              :label="filter.label"
              outlined
              dense
              readonly
              @update:model-value="updateFilter(filter.name, $event)"
            >
              <template #append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date
                      :model-value="localFilters[filter.name]"
                      @update:model-value="updateFilter(filter.name, $event)"
                    >
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>

            <!-- Date Range -->
            <div v-else-if="filter.type === 'daterange'" class="row q-gutter-sm">
              <q-input
                :model-value="localFilters[filter.name]?.[0]"
                label="From Date"
                outlined
                dense
                readonly
                class="col"
                @update:model-value="updateFilter(filter.name, [$event, localFilters[filter.name]?.[1]])"
              >
                <template #append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date
                        :model-value="localFilters[filter.name]?.[0]"
                        @update:model-value="updateFilter(filter.name, [$event, localFilters[filter.name]?.[1]])"
                      >
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              
              <q-input
                :model-value="localFilters[filter.name]?.[1]"
                label="To Date"
                outlined
                dense
                readonly
                class="col"
                @update:model-value="updateFilter(filter.name, [localFilters[filter.name]?.[0], $event])"
              >
                <template #append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date
                        :model-value="localFilters[filter.name]?.[1]"
                        @update:model-value="updateFilter(filter.name, [localFilters[filter.name]?.[0], $event])"
                      >
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
        </template>
      </div>
    </q-card-section>

    <!-- Loading overlay -->
    <q-inner-loading :showing="loading">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
  </q-card>
</template>

<style lang="scss" scoped>
.search-filter-card {
  margin-bottom: 16px;
  
  .q-field {
    .q-field__control {
      border-radius: 8px;
    }
  }
}
</style>
