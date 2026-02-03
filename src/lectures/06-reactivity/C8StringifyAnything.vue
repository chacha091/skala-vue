<template>
  <div>
    <h3>stringify anything</h3>
    <button @click="showString(num)">num 출력</button>
    <button @click="showString(obj)">obj 출력</button>
    <button @click="showString(arr)">arr 출력</button>
    <button @click="showString(ref1)">ref1 출력</button>
    <button @click="showString(reactive2)">reactive2 출력</button>
    <div>결과: {{ result }}</div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const num = 123
const obj = { name: '홍길동', age: 30 }
const arr = [1, 2, 3]
const ref1 = ref({ city: '서울' })
const reactive2 = reactive({ job: '개발자' })

const result = ref('')


function toJsonString(value) {
  // Vue 3에서 ref, reactive, 일반 객체, 배열, 프리미티브 타입 등 어떤 값이 들어와도 JSON 문자열로 안전하게 변환하는 toJsonString 함수
  console.log('toJsonString 호출:', value)
  if(value && typeof value === 'object'){
    // ref인 경우 .value 사용
    if('value' in value){
      return JSON.stringify(value.value, null, 2)
    }
    // reactive인 경우 직접 사용
    return JSON.stringify(value, null, 2)
  }
  // primitive 타입인 경우 그대로 문자열로 변환
  return JSON.stringify(value)
}

function showString(target) {
  result.value = toJsonString(target)
}
</script>

<style scoped>
button {
  margin-right: 8px;
}
</style>