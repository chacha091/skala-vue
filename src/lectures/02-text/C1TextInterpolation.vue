<template>
  <div>
    <input v-model="inputValue" placeholder="내용을 입력하세요" />
    <button @click="showMessage">확인</button>
    <div> Message(보간법): {{ message }} </div>
    <div v-text="message"> </div> <!-- v-text는 다른 내용 추가할 수 없음 -->
  </div>
</template>

<script setup>
import { ref } from 'vue'

const inputValue = ref('')
const message = ref('')

function showMessage() {
  message.value = inputValue.value;   // reactivity를 설정하려면 .value를 써줘야 함
}
</script>
