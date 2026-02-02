<template>
  <div>
    <input v-model="inputValue" placeholder="내용을 입력하세요" />
    <button @click="showMessage">확인</button>
    
    <!-- innerHTML은 {{ }}가 아닌 v-html로만 가능 but 보안 이슈 있음 -->
    <div v-html="message"></div>  
  </div>
</template>

<script setup>
import { ref } from 'vue'

const inputValue = ref('')
const message = ref('')

function showMessage() {
  message.value = inputValue.value;

  // XSS 취약점 예시
  // <img src="x"  onerror="window.location.href='https://google.com'" />
}
</script>
