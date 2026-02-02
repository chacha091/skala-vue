<template>
  <div class="app">
    <!-- 왼쪽 카드 -->
    <div class="card">
      <h2>🏪 식량 창고</h2>

      <div
        v-for="food in foods"
        :key="food.id"
        class="food-item"
        :class="{ disabled: food.stock === 0 }"
      >
        <label class="food-row">
          <input
            type="checkbox"
            v-model="selectedFoods"
            :value="food.id"
            :disabled="food.stock === 0"
          />

          <div class="food-info">
            <span class="food-name">{{ food.name }}</span>
            <span
              class="stock-badge"
              :class="{ zero: food.stock === 0 }"
            >
              📦 재고 {{ food.stock }}
            </span>
          </div>
        </label>
      </div>

      <button
        class="primary-btn"
        :disabled="isDeliverDisabled"
        @click="handleDeliver"
      >
        전달하기
      </button>
    </div>

    <!-- 오른쪽 카드 -->
    <div class="card">
      <h2>👤 사람</h2>

      <div
        v-for="person in people"
        :key="person.id"
        class="person-item"
      >
        <label class="person-row">
          <input
            type="radio"
            name="selectedPerson"
            v-model="selectedPerson"
            :value="person.id"
          />
          <span class="person-name">{{ person.name }}</span>
        </label>

        <div
          v-if="Object.keys(person.receivedFoods).length"
          class="received"
        >
          <span
            v-for="(qty, foodId) in person.receivedFoods"
            :key="foodId"
            class="badge"
          >
            {{ getFoodName(Number(foodId)) }} × {{ qty }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const foods = ref([
  { id: 1, name: '🍚 쌀', stock: 5 },
  { id: 2, name: '🍞 빵', stock: 5 },
  { id: 3, name: '🍖 고기', stock: 5 },
  { id: 4, name: '🥤 물', stock: 5 }
])

const people = ref([
  { id: 1, name: '👨 철수', receivedFoods: {} },
  { id: 2, name: '👩 영희', receivedFoods: {} },
  { id: 3, name: '🧑 민수', receivedFoods: {} }
])

const selectedFoods = ref([])
const selectedPerson = ref(null)

const getFoodName = (id) => {
  const food = foods.value.find(f => f.id === id)
  return food ? food.name : ''
}

// 🔥 버튼 비활성화 조건
const isDeliverDisabled = computed(() => {
  if (!selectedPerson.value) return true
  if (selectedFoods.value.length === 0) return true

  // 선택된 음식 중 재고 있는 게 하나도 없으면 비활성화
  const hasAvailable = selectedFoods.value.some(id => {
    const food = foods.value.find(f => f.id === id)
    return food && food.stock > 0
  })

  return !hasAvailable
})

const handleDeliver = () => {
  const person = people.value.find(
    p => p.id === selectedPerson.value
  )
  if (!person) return

  selectedFoods.value.forEach(foodId => {
    const food = foods.value.find(f => f.id === foodId)
    if (!food || food.stock <= 0) return

    food.stock--

    if (!person.receivedFoods[foodId]) {
      person.receivedFoods[foodId] = 0
    }
    person.receivedFoods[foodId]++
  })

  selectedFoods.value = []
  selectedPerson.value = null
}
</script>

<style scoped>
.app {
  display: flex;
  gap: 32px;
  padding: 50px;
  background: linear-gradient(135deg, #f0f4ff, #f9fbff);
  min-height: 70vh;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
}

.card {
  flex: 1;
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 15px 40px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
}

h2 {
  margin-bottom: 25px;
  font-weight: 600;
}

.food-item,
.person-item {
  margin-bottom: 16px;
}

.food-row,
.person-row {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.food-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.food-name {
  font-weight: 500;
}

.stock-badge {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 20px;
  background: #e3f2fd;
  color: #1565c0;
}

.stock-badge.zero {
  background: #ffebee;
  color: #c62828;
}

.disabled {
  opacity: 0.5;
}

.primary-btn {
  margin-top: auto;
  padding: 14px;
  border: none;
  border-radius: 14px;
  font-size: 16px;
  font-weight: 600;
  background: linear-gradient(135deg, #4caf50, #43a047);
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.primary-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(76,175,80,0.3);
}

.primary-btn:disabled {
  background: #cfd8dc;
  cursor: not-allowed;
}

.received {
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.badge {
  background: #e8f5e9;
  color: #2e7d32;
  padding: 4px 10px;
  border-radius: 14px;
  font-size: 12px;
}

.person-name {
  font-weight: 500;
}
</style>
