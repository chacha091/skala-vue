<template>
  <div class="bmi-container">
    <h2>홍길동의 BMI 상태</h2>

    <section class="bmi-section">
      <div class="control-group">
        <p>
          <label>체중(kg): </label>
          <input v-model.number="weightKg" type="number" min="0" step="1" />
        </p>
        <p>
          <label>키(cm): </label>
          <input v-model.number="heightCm" type="number" min="0" step="1" />
        </p>
        <p>현재 체중: {{ weightKg }}kg</p>
        <p>현재 키: {{ heightCm }}cm</p>
        <p class="info">BMI: {{ bmi.toFixed(1) }} ({{ judgment }})</p>
      </div>

      <div class="habits">
        <HongsDietHabit
          title="🍔 음식 먹기"
          :habits="foodHabits"
          @change-weight="applyWeightChange"
        />
        <HongsDietHabit
          title="🏃 기술 연습"
          :habits="exerciseHabits"
          @change-weight="applyWeightChange"
        />
      </div>
    </section>
  </div>
</template>

<script setup>

import { computed, ref } from "vue";
import HongsDietHabit from "./HongDietHabit.vue";

const heightCm = ref(170);
const weightKg = ref(60);

const foodHabits = [
  { label: "햄버거", deltaKg: 1 },
  { label: "피자", deltaKg: 2 },
];

const exerciseHabits = [
  { label: "걷기", deltaKg: -1 },
  { label: "달리기", deltaKg: -2 },
];

const bmi = computed(() => {
  const heightM = heightCm.value / 100;
  return weightKg.value / (heightM * heightM);
});

const judgment = computed(() => {
  if (bmi.value < 18.5) return "저체중";
  if (bmi.value < 23) return "정상";
  if (bmi.value < 25) return "과체중";
  return "비만 - 다이어트 하세요";
});

function applyWeightChange(deltaKg) {
  weightKg.value = Math.max(0, weightKg.value + deltaKg);
}

</script>

<style scoped>
.bmi-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.control-group {
  margin-bottom: 12px;
}

.info {
  margin-top: 8px;
  font-weight: bold;
}

.habits {
  margin-top: 16px;
  display: grid;
  gap: 12px;
}
</style>
