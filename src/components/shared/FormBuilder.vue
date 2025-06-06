<script setup lang="ts">
import { computed, ref } from 'vue';
import { useForm } from '@inertiajs/vue3';
import { useQuasar } from 'quasar';

// Types
interface FormField {
  name: string;
  type: 'text' | 'email' | 'password' | 'select' | 'textarea' | 'file' | 'date' | 'number' | 'checkbox' | 'radio';
  label: string;
  rules?: any[];
  options?: { label: string; value: any }[];
  multiple?: boolean;
  required?: boolean;
  placeholder?: string;
  hint?: string;
  readonly?: boolean;
  dense?: boolean;
  outlined?: boolean;
  filled?: boolean;
  clearable?: boolean;
  cols?: number; // For grid layout (1-12)
}

interface Props {
  fields: FormField[];
  modelValue: Record<string, any>;
  errors?: Record<string, string>;
  loading?: boolean;
  submitLabel?: string;
  showSubmit?: boolean;
  gridLayout?: boolean;
  readonly?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  submitLabel: 'Submit',
  showSubmit: true,
  gridLayout: false,
  readonly: false
});

const emit = defineEmits<{
  'update:modelValue': [value: Record<string, any>];
  submit: [data: Record<string, any>];
  fieldChange: [fieldName: string, value: any];
}>();

const $q = useQuasar();

// Computed
const formData = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

// Methods
function updateField(name: string, value: any) {
  const newData = { ...formData.value, [name]: value };
  emit('update:modelValue', newData);
  emit('fieldChange', name, value);
}

function handleSubmit() {
  emit('submit', formData.value);
}

function getFieldClass(field: FormField) {
  if (props.gridLayout && field.cols) {
    return `col-${field.cols}`;
  }
  return props.gridLayout ? 'col-12' : '';
}

function getFieldRules(field: FormField) {
  const rules = [...(field.rules || [])];
  
  if (field.required) {
    rules.unshift((val: any) => {
      if (field.type === 'checkbox') {
        return val === true || 'This field is required';
      }
      return (val && val.length > 0) || 'This field is required';
    });
  }
  
  if (field.type === 'email') {
    rules.push((val: string) => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return !val || emailPattern.test(val) || 'Please enter a valid email address';
    });
  }
  
  return rules;
}
</script>

<template>
  <q-form @submit="handleSubmit" class="form-builder">
    <div :class="gridLayout ? 'row q-gutter-md' : ''">
      <div
        v-for="field in fields"
        :key="field.name"
        :class="getFieldClass(field)"
        class="form-field"
      >
        <!-- Text Input -->
        <q-input
          v-if="['text', 'email', 'password', 'number'].includes(field.type)"
          :model-value="formData[field.name]"
          :label="field.label"
          :type="field.type"
          :rules="getFieldRules(field)"
          :error="!!errors?.[field.name]"
          :error-message="errors?.[field.name]"
          :placeholder="field.placeholder"
          :hint="field.hint"
          :readonly="field.readonly || readonly"
          :dense="field.dense"
          :outlined="field.outlined !== false"
          :filled="field.filled"
          :clearable="field.clearable"
          :loading="loading"
          @update:model-value="updateField(field.name, $event)"
        />

        <!-- Textarea -->
        <q-input
          v-else-if="field.type === 'textarea'"
          :model-value="formData[field.name]"
          :label="field.label"
          type="textarea"
          :rules="getFieldRules(field)"
          :error="!!errors?.[field.name]"
          :error-message="errors?.[field.name]"
          :placeholder="field.placeholder"
          :hint="field.hint"
          :readonly="field.readonly || readonly"
          :dense="field.dense"
          :outlined="field.outlined !== false"
          :filled="field.filled"
          :clearable="field.clearable"
          rows="4"
          @update:model-value="updateField(field.name, $event)"
        />

        <!-- Select -->
        <q-select
          v-else-if="field.type === 'select'"
          :model-value="formData[field.name]"
          :options="field.options"
          :label="field.label"
          :multiple="field.multiple"
          :rules="getFieldRules(field)"
          :error="!!errors?.[field.name]"
          :error-message="errors?.[field.name]"
          :hint="field.hint"
          :readonly="field.readonly || readonly"
          :dense="field.dense"
          :outlined="field.outlined !== false"
          :filled="field.filled"
          :clearable="field.clearable"
          emit-value
          map-options
          @update:model-value="updateField(field.name, $event)"
        />

        <!-- Date -->
        <q-input
          v-else-if="field.type === 'date'"
          :model-value="formData[field.name]"
          :label="field.label"
          :rules="getFieldRules(field)"
          :error="!!errors?.[field.name]"
          :error-message="errors?.[field.name]"
          :hint="field.hint"
          :readonly="field.readonly || readonly"
          :dense="field.dense"
          :outlined="field.outlined !== false"
          :filled="field.filled"
          :clearable="field.clearable"
          @update:model-value="updateField(field.name, $event)"
        >
          <template #append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date
                  :model-value="formData[field.name]"
                  @update:model-value="updateField(field.name, $event)"
                >
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <!-- File Upload -->
        <q-file
          v-else-if="field.type === 'file'"
          :model-value="formData[field.name]"
          :label="field.label"
          :rules="getFieldRules(field)"
          :error="!!errors?.[field.name]"
          :error-message="errors?.[field.name]"
          :hint="field.hint"
          :readonly="field.readonly || readonly"
          :dense="field.dense"
          :outlined="field.outlined !== false"
          :filled="field.filled"
          :clearable="field.clearable"
          :multiple="field.multiple"
          @update:model-value="updateField(field.name, $event)"
        >
          <template #prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>

        <!-- Checkbox -->
        <q-checkbox
          v-else-if="field.type === 'checkbox'"
          :model-value="formData[field.name]"
          :label="field.label"
          :disable="field.readonly || readonly"
          @update:model-value="updateField(field.name, $event)"
        />

        <!-- Radio Group -->
        <div v-else-if="field.type === 'radio'" class="q-gutter-sm">
          <div class="text-subtitle2">{{ field.label }}</div>
          <q-radio
            v-for="option in field.options"
            :key="option.value"
            :model-value="formData[field.name]"
            :val="option.value"
            :label="option.label"
            :disable="field.readonly || readonly"
            @update:model-value="updateField(field.name, $event)"
          />
          <div v-if="errors?.[field.name]" class="text-negative text-caption">
            {{ errors[field.name] }}
          </div>
        </div>
      </div>
    </div>

    <!-- Submit Button -->
    <div v-if="showSubmit && !readonly" class="q-mt-md">
      <q-btn
        type="submit"
        color="primary"
        :loading="loading"
        :label="submitLabel"
        class="q-px-xl"
      />
    </div>
  </q-form>
</template>

<style lang="scss" scoped>
.form-builder {
  .form-field {
    margin-bottom: 16px;
  }
  
  .q-field {
    .q-field__control {
      border-radius: 8px;
    }
  }
}
</style>
