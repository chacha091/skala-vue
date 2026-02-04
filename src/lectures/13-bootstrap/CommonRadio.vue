<template>
  <div class="form-check" :class="wrapperClass">
    <input
      class="form-check-input"
      type="radio"
      :name="name"
      :id="inputId"
      :value="value"
      :checked="modelValue === value"
      :disabled="disabled"
      :style="sizeStyle"
      @change="handleChange"
    >
    <label class="form-check-label" :for="inputId">{{ displayLabel }}</label>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: 'radioDefault',
  },
  value: {
    type: [String, Number],
    default: '',
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: 'md',
    validator(value) {
      return ['sm', 'md', 'lg'].includes(value);
    },
  },
});

const emit = defineEmits(['update:modelValue', 'change']);

const displayLabel = computed(() => (props.label ? props.label : '예시'));

const inputId = computed(() => {
  const safeName = String(props.name).replace(/\s+/g, '-');
  const safeValue = String(props.value).replace(/\s+/g, '-');
  return `radio-${safeName}-${safeValue}`;
});

const sizeStyle = computed(() => {
  if (props.size === 'sm') return { transform: 'scale(0.9)' };
  if (props.size === 'md') return { transform: 'scale(1.0)' };
  if (props.size === 'lg') return { transform: 'scale(1.1)' };
  return {};
});

const wrapperClass = computed(() => {
  if (props.size === 'sm') return 'small';
  if (props.size === 'md') return 'medium';
  if (props.size === 'lg') return 'fs-5';
  return '';
});

function handleChange() {
  emit('update:modelValue', props.value);
  emit('change', {
    label: props.label,
    value: props.value,
  });
}

</script>
