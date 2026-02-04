<template>
  <div>
    <h1>둔갑술 시전!</h1>
    <p>홍길동이 <strong>{{ target }}</strong>(으)로 변신했습니다!</p>
  </div>
</template>


<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const target = ref('???')

const route = useRoute()
const router = useRouter()

onMounted(() => {
  if (route.query.target) {
    target.value = route.query.target
    // 브라우저 URL에서 query 부분 제거
    //router.push({path: '/result', query: { target } })
    router.replace('/result')
  }
})

</script>
