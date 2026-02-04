<template>
  <div>
    <div class="mb-3 d-flex gap-2">
      <button type="button" class="btn btn-outline-primary btn-sm" @click="toggleSize">
        크기 변경 (현재: {{ sizeLabel }})
      </button>
      <button type="button" class="btn btn-outline-secondary btn-sm" @click="toggleReadonly">
        읽기 전용 {{ readonly ? '해제' : '설정' }}
      </button>
      <button type="button" class="btn btn-outline-secondary btn-sm" @click="toggleDisabled">
        비활성화 {{ disabled ? '해제' : '설정' }}
      </button>
    </div>

    <CommonInput
      label="email"
      type="email"
      placeholder="이메일을 입력하세요."
      :disabled="disabled"
      :size="size"
      :readonly="readonly"
      @enter="handleEnter"
    />
    <CommonInput
      label="name"
      placeholder="이름을 입력하세요."
      :disabled="disabled"
      :size="size"
      :readonly="readonly"
      @enter="handleEnter"
    />
    <CommonInput
      label="password"
      type="password"
      placeholder="비밀번호를 입력하세요."
      :disabled="disabled"
      :size="size"
      :readonly="readonly"
      @enter="handleEnter"
    />
  </div>
</template>

<script setup>
import CommonInput from './CommonInput.vue';
import { computed, ref } from 'vue';

const size = ref('md');
const readonly = ref(true);
const disabled = ref(false);
const sizeLabel = computed(() => size.value);

function toggleSize() {
  size.value = size.value === 'sm' ? 'md' : size.value === 'md' ? 'lg' : 'sm';
}

function toggleReadonly() {
  readonly.value = !readonly.value;
}

function toggleDisabled() {
  disabled.value = !disabled.value;
}

function handleEnter(payload){
  const labelText = payload?.label ? `${payload.label} ` : '';
  alert(`${labelText}$ 입력되었습니다.`);
}
</script>
