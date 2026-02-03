<template>
  <section class="board">
    <header class="board-head">
      <h2>보드</h2>
      <div class="badge">
        <span>칸 수: {{ totalCells }}</span>
        <span v-if="phase !== 'playing'" class="muted">({{ phase }})</span>
      </div>
    </header>

    <div class="grid" :style="gridStyle">
      <MoleCell v-for="cell in cells" :key="cell.index" :index="cell.index"
        :is-active="cell.index === activeIndex && phase === 'playing'" :disabled="phase !== 'playing'"
        @click-cell="handleClickCell" />
    </div>

    <footer class="board-foot">
      <p class="hint">
        ✅ 활성 칸을 누르면 <b>정답</b>입니다. (정답 여부 판정은 부모가 할 수도 있어요)
      </p>
    </footer>
  </section>
</template>

<script setup>
import { computed } from "vue";
import MoleCell from "./MoleCell.vue";

const props = defineProps({
  gridSize: { type: Number, required: true },
  activeIndex: { type: Number, required: true },
  phase: { type: String, required: true }, // idle/playing/paused/ended
  timeLeft: { type: Number, required: true },
  score: { type: Number, required: true },
});

const emit = defineEmits(["hit"]);

const totalCells = computed(() => props.gridSize * props.gridSize);
const cells = computed(() =>
  Array.from({ length: totalCells.value }, (_, i) => ({ index: i }))
);

const gridStyle = computed(() => ({
  gridTemplateColumns: `repeat(${props.gridSize}, 1fr)`,
}));

function handleClickCell(index) {
  // UI는 여기까지. 로직은 부모에서 점수 처리.
  const isCorrect = index === props.activeIndex;

  emit("hit", {
    index,
    isCorrect,
    at: Date.now(),
  });
}
</script>

<style scoped>
.board {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 14px;
  padding: 14px;
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.05);
}

.board-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 10px;
}

.badge {
  display: flex;
  gap: 10px;
  font-size: 13px;
  color: #333;
}

.muted {
  color: #888;
}

.grid {
  display: grid;
  gap: 10px;
}

.board-foot {
  margin-top: 10px;
}

.hint {
  font-size: 13px;
  color: #666;
  margin: 0;
}
</style>
