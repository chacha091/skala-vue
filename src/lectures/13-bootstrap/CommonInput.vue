<template>
  <!-- 부트스트랩이 설치되고 필요한 스타일과 스크립트가 로드되어야 합니다. -->
  <div class="mb-3">
    <label :for="inputId" class="form-label">{{ label }}</label>
    <input
      :id="inputId"
      v-model="inputValue"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :class="['form-control', sizeClass]"
      @keyup.enter="emitEnter"
    >
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
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

const emit = defineEmits(['enter']);
const inputValue = ref('');

const inputId = computed(() => (props.label ? `input-${props.label}` : 'input-common'));
const sizeClass = computed(() => {
  if (props.size === 'sm') return 'form-control-sm';
  if (props.size === 'lg') return 'form-control-lg';
  if (props.size === 'md') return 'form-control-md';
  return '';
});

function emitEnter() {
  emit('enter', { label: props.label, value: inputValue.value });
}
</script>
