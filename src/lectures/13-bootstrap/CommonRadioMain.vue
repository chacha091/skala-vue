<template>
  <div class="wrapper">
    <!-- 상단 컨트롤 -->
    <div class="control-card">
      <button class="btn primary" @click="toggleSize">
        크기 변경 ({{ sizeLabel }})
      </button>

      <button class="btn" @click="genderDisabled = !genderDisabled">
        성별 {{ genderDisabled ? '활성화' : '비활성화' }}
      </button>

      <button class="btn" @click="schoolDisabled = !schoolDisabled">
        학교 {{ schoolDisabled ? '활성화' : '비활성화' }}
      </button>
    </div>

    <!-- 성별 -->
    <div class="card">
      <div class="card-header">
        <span>성별</span>
        <span class="badge">{{ genderLabel }}</span>
      </div>

      <div class="radio-group">
        <CommonRadio
          v-for="option in genderOptions"
          :key="`gender-${option.value}`"
          :label="option.label"
          :value="option.value"
          name="gender"
          v-model="genderValue"
          :size="size"
          :disabled="genderDisabled"
        />
      </div>
    </div>

    <!-- 학교 -->
    <div class="card">
      <div class="card-header">
        <span>학교</span>
        <span class="badge">{{ schoolLabel }}</span>
      </div>

      <div class="radio-group">
        <CommonRadio
          v-for="option in schoolOptions"
          :key="`school-${option.value}`"
          :label="option.label"
          :value="option.value"
          name="school"
          v-model="schoolValue"
          :size="size"
          :disabled="schoolDisabled"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import CommonRadio from "./CommonRadio.vue";

const genderOptions = [
  { label: "남", value: "m" },
  { label: "여", value: "f" },
];

const schoolOptions = [
  { label: "초등학교", value: "01" },
  { label: "중학교", value: "02" },
  { label: "고등학교", value: "03" },
  { label: "대학교", value: "04" },
];

const genderValue = ref("m");
const schoolValue = ref("02");
const size = ref("md");
const genderDisabled = ref(false);
const schoolDisabled = ref(false);

const sizeLabel = computed(() => size.value);

const genderLabel = computed(
  () => genderOptions.find(o => o.value === genderValue.value)?.label ?? "-"
);

const schoolLabel = computed(
  () => schoolOptions.find(o => o.value === schoolValue.value)?.label ?? "-"
);

function toggleSize() {
  size.value = size.value === "sm"
    ? "md"
    : size.value === "md"
    ? "lg"
    : "sm";
}
</script>

<style scoped>
.wrapper {
  max-width: 520px;
  margin: 40px auto;
  padding: 20px;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, "Noto Sans KR", sans-serif;
}

/* 상단 버튼 카드 */
.control-card {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 24px;
  padding: 16px;
  border-radius: 16px;
  background: white;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
}

.btn {
  padding: 8px 14px;
  border-radius: 10px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s ease;
}

.btn:hover {
  transform: translateY(-2px);
}

.primary {
  background: #1f7ae0;
  color: white;
  border-color: #1f7ae0;
}

/* 카드 */
.card {
  background: white;
  border-radius: 18px;
  padding: 18px;
  margin-bottom: 20px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-3px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
  font-weight: 600;
}

/* 선택값 배지 */
.badge {
  background: #eef5ff;
  color: #1f7ae0;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 13px;
}

/* 라디오 그룹 */
.radio-group {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
</style>
