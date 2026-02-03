<template>
  <button class="cell" :class="{ active: isActive }" :disabled="disabled" @click="onClick"
    :aria-label="isActive ? '두더지 있음' : '빈 칸'">
    <span class="emoji mole" v-if="isActive">🐹</span>
    <span class="emoji ghost" v-else>🕳️</span>
  </button>
</template>

<script setup>
const props = defineProps({
  index: { type: Number, required: true },
  isActive: { type: Boolean, required: true },
  disabled: { type: Boolean, default: false },
});

const emit = defineEmits(["click-cell"]);

function onClick() {
  // 클릭한 칸 인덱스를 부모(보드)로 전달
  emit("click-cell", props.index);
}
</script>

<style scoped>
.cell {
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 16px;
  border: 1px solid #e6e6e6;
  background: #fafafa;
  cursor: pointer;
  font-size: 30px;
  display: grid;
  place-items: center;
  transition: transform 0.08s ease;
}

.cell:hover {
  transform: translateY(-1px);
}

.cell:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.active {
  background: #fff6dd;
  border-color: #ffd271;
}

.emoji {
  filter: drop-shadow(0 6px 10px rgba(0, 0, 0, 0.12));
}

.mole {
  display: inline-block;
  animation: mole-pop 220ms ease-out both;
  transform-origin: center bottom;
}

.ghost {
  opacity: 0.65;
}

@keyframes mole-pop {
  from {
    transform: translateY(16px) scale(0.9);
    opacity: 0;
  }
  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}
</style>
