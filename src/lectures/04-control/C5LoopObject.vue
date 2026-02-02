<template>
  <h2>객체 렌더링</h2>
  <ol>
    <li v-for="(value, key) in userInfo" :key="key">
      {{ key }}: {{ value }}
    </li>
  </ol>
</template>

<script setup>
import { ref } from 'vue'

const userInfo = ref({
  name: '홍길동',
  age: 30,
  job: '의적'
})
</script>
