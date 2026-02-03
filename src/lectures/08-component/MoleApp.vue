<template>
  <main class="app">
    <header class="header">
      <h1>🐹 두더지 잡기 (UI 제공 / 로직 실습)</h1>
      <p class="sub">props + emit 흐름을 연습해보세요.</p>
    </header>

    <section class="panel">
      <div class="stats">
        <div class="stat">
          <span class="label">상태</span><br/>
          <span class="value">{{ phase }}</span>
        </div>
        <div class="stat">
          <span class="label">점수</span><br/>
          <span class="value">{{ score }}</span>
        </div>
        <div class="stat">
          <span class="label">남은 시간</span><br/>
          <span class="value">{{ timeLeft }}s</span>
        </div>
        <div class="stat">
          <span class="label">라운드</span><br/>
          <span class="value">{{ round }}</span>
        </div>
      </div>

      <div class="controls">
        <div class="btn-row">
          <button class="btn primary" :disabled="phase === 'playing'" @click="onStart">
            시작
          </button>
          <button class="btn" :disabled="phase !== 'playing'" @click="onStop">
            일시정지
          </button>
          <button class="btn danger" @click="onReset">
            리셋
          </button>
        </div>
        <div class="settings">
          <div class="settings-row">
            <label class="field">
              <span>보드 크기</span>
              <select v-model.number="gridSize" :disabled="phase === 'playing'">
                <option :value="3">3 x 3</option>
                <option :value="4">4 x 4</option>
                <option :value="5">5 x 5</option>
              </select>
            </label>

            <label class="field">
              <span>게임 시간(초)</span>
              <input v-model.number="duration" type="number" min="5" max="120" step="1" :disabled="phase === 'playing'" />
            </label>

            <label class="field">
              <span>이동 간격(ms)</span>
              <input v-model.number="moveInterval" type="number" min="200" max="2000" step="50"
                :disabled="phase === 'playing'" />
            </label>
          </div>
        </div>
      </div>

      <div class="tips">
        <strong>실습 과제</strong>
        <ul>
          <li>타이머(setInterval)로 <code>timeLeft</code> 감소 + 0이면 게임 종료</li>
          <li>두더지 위치를 무작위로 이동시키는 로직 구현</li>
          <li>칸 클릭 시 정답이면 점수 증가, 오답이면 감점(선택)</li>
          <li>일시정지/재시작 시 interval 정리(clearInterval) 처리</li>
        </ul>
      </div>
    </section>

    <section class="board-wrap">
      <WhackBoard :grid-size="gridSize" :active-index="activeIndex" :phase="phase" :time-left="timeLeft" :score="score"
        @hit="onHit" />
    </section>
  </main>
</template>

<script setup>
import { ref, computed, watch, onBeforeUnmount } from "vue";
import WhackBoard from "./WhackBoard.vue";

/**
 * =========================
 * 상태(부모가 관리)
 * =========================
 */
const phase = ref("idle"); // 'idle' | 'playing' | 'paused' | 'ended'
const score = ref(0);
const round = ref(1);

const gridSize = ref(3);
const duration = ref(20); // seconds
const timeLeft = ref(duration.value);

const moveInterval = ref(600); // ms
const activeIndex = ref(-1); // 현재 두더지 위치 (0 ~ gridSize^2 - 1)
const totalCells = computed(() => gridSize.value * gridSize.value);

/**
 * =========================
 * 실습: interval 핸들러 보관
 * =========================
 */

 // 두더지 이동용 interval id
const moveTimerId = ref();
// 카운트다운용 interval id
const countdownTimerId = ref();

function clearTimers() {
  if (moveTimerId.value) {
    clearInterval(moveTimerId.value);
    moveTimerId.value = null;
  }

  if (countdownTimerId.value) {
    clearInterval(countdownTimerId.value);
    countdownTimerId.value = null;
  }
}

// 랜덤 위치 생성
function getRandomIndex(excludeIndex = -1) {
  const total = totalCells.value;

  if (total <= 0) return -1;
  if (total === 1) return 0;

  let nextIndex = Math.floor(Math.random() * total);

  // 직전 위치와 같지 않도록 반복
  while (nextIndex === excludeIndex) {
    nextIndex = Math.floor(Math.random() * total);
  }

  return nextIndex;
}

function onStart() {
  phase.value = "playing";
  timeLeft.value = duration.value;
  score.value = 0;
  activeIndex.value = getRandomIndex();

  clearTimers();

  moveTimerId.value = setInterval(() => {
    activeIndex.value = getRandomIndex(activeIndex.value);
  }, moveInterval.value);

  countdownTimerId.value = setInterval(() => {
    timeLeft.value = Math.max(0, timeLeft.value - 1);
  }, 1000);
}

function onStop() {
  phase.value = "paused";
  clearTimers();
}

function onReset() {
  phase.value = "idle";
  clearTimers();

  score.value = 0;
  round.value = 1;
  timeLeft.value = duration.value;
  activeIndex.value = -1;
}

/**
 * 자식(보드)에서 칸 클릭 시 올라오는 이벤트
 */
function onHit(payload) {
  // payload: { index: number, isCorrect: boolean, at: number }
  if (phase.value !== "playing") return;

  if (payload.isCorrect) {
    score.value += 1;
  } else {
    score.value = Math.max(0, score.value - 1);
  }

  if (payload.isCorrect) {
    activeIndex.value = getRandomIndex(activeIndex.value);
  }
}

/**
 * =========================
 * 실습: 게임 종료 처리
 * =========================
 */
function endGame() {
  phase.value = "ended";
  clearTimers();
  activeIndex.value = -1;
}

onBeforeUnmount(() => {
  clearTimers();
});

// 타이머 0 되면 자동 종료
watch(timeLeft, (value) => {
  if (value <= 0) {
    endGame();
  }
});
</script>

<style scoped>
/* ===== 앱 전체 ===== */
.app {
  width: 500px;              
  margin: 40px auto;         /* 가운데 정렬 */
  padding: 20px;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, "Noto Sans KR", sans-serif;
}

/* ===== 패널 ===== */
.panel {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 14px;
  padding: 14px;
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.05);
}

/* ===== 통계 ===== */
.stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr); 
  gap: 10px;
  margin-bottom: 16px;
}

.stat {
  padding: 10px;
  border-radius: 12px;
  background: #fafafa;
  border: 1px solid #f0f0f0;
  text-align: center;
}

.label {
  font-size: 12px;
  color: #777;
}

.value {
  font-size: 18px;
  font-weight: 800;
  margin-top: 4px;
}

/* ===== 컨트롤 ===== */
.controls {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.btn-row {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.btn-row.btn{
  flex: 1;
}

.btn {
  padding: 10px 40px;
  border: 2px solid #ddd;
  border-radius: 15px;
  background: #fff;
  cursor: pointer;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.primary {
  background: #1f7ae0;
  border-color: #1f7ae0;
  color: white;
}

.danger {
  background: #ffecec;
  border-color: #e04b4b;
  color: #b40000;
}

/* ===== 설정 ===== */
.settings-row{
  display: flex;
  gap: 20px;
  justify-content: center;
}

.settings-row.btn{
  flex: 1;
}

.settings {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;
}

.field input,
.field select {
  padding: 10px;
  border-radius: 12px;
  border: 1px solid #ddd;
}

/* ===== 팁 ===== */
.tips {
  margin-top: 12px;
  padding: 10px 12px;
  border-radius: 12px;
  background: #f7fbff;
  border: 1px solid #dbeeff;
  font-size: 13px;
}

/* ===== 보드 ===== */
.board-wrap {
  margin-top: 20px;
}

</style>
