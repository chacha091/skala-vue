<template>
  <div>
    <h1>🧙 둔갑술 선택 메뉴</h1>
    <button class="btn primary" @click="goToDisguise('호랑이')">호랑이로 둔갑</button>
    <button class="btn primary" @click="goToDisguise('도깨비')">도깨비로 둔갑</button>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goToDisguise(target) {
  //disguise?target=호랑이” 형태로 경로 전환
  router.push({path: '/result', query: { target } })

}
</script>

<style scoped>
.btn {
  padding: 8px 14px;
  margin: 8px;
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
</style>