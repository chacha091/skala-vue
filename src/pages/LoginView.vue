<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card shadow-sm" style="width: 400px;">
      <div class="card-body p-5">
        <h3 class="text-center mb-4">로그인</h3>
        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label class="form-label">이메일 주소</label>
            <input v-model="email" type="email" class="form-control" placeholder="example@email.com">
          </div>
          <div class="mb-4">
            <label class="form-label">비밀번호</label>
            <input v-model="password" type="password" class="form-control">
          </div>
          <button type="submit" class="btn btn-primary w-100">
            <i class="bi bi-box-arrow-in-right me-2"></i>로그인
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import router from '../../router';

const email = ref('');
const password = ref('');

const handleLogin = () => { 
  router.push('/products');
 };

</script>