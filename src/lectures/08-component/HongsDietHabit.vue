<template>
  <div class="habit">
    <p class="title">
      <b>{{ displayTitle }}</b>
    </p>

    <div class="habit-list">
      <button
        v-for="(habit, idx) in displayHabits"
        :key="idx"
        type="button"
        @click="changeWeight(habit.deltaKg)"
      >
        {{ habit.label }} ({{ formatDelta(habit.deltaKg) }})
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  title: String,
  habits: Array,
});

const emit = defineEmits(["change-weight"]);

const defaultHabits = [
  { label: "샘플 +1kg", deltaKg: 1 },
  { label: "샘플 -1kg", deltaKg: -1 },
];

const displayTitle = computed(() => props.title || "📦 Habit 컴포넌트");

const displayHabits = computed(() =>
  props.habits && props.habits.length ? props.habits : defaultHabits
);

function changeWeight(deltaKg) {
  emit("change-weight", deltaKg);
  console.log("weight change:", deltaKg);
}

function formatDelta(deltaKg) {
  return `${deltaKg > 0 ? "+" : ""}${deltaKg}kg`;
}
</script>

<style scoped>
.habit {
  padding: 16px;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.07);
}

.title {
  margin: 0 0 12px;
  font-size: 18px;
}

.habit-list {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.habit-list button {
  padding: 8px 14px;
  border-radius: 8px;
  border: none;
  background-color: #4a90e2;
  color: white;
  cursor: pointer;
  transition: 0.2s;
}

.habit-list button:hover {
  transform: translateY(-2px);
}

.standalone-info {
  margin-top: 12px;
  font-size: 13px;
  color: #888;
}
</style>
