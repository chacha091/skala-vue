<template>
  <section class="login-page">
    <div class="container d-flex justify-content-center align-items-center min-vh-100">
      <div class="login-shell">
        <div class="login-header">
          <p class="eyebrow">Skala</p>
          <h3>로그인</h3>
          <p class="sub">다시 만나 반가워요. 새 컬렉션이 기다립니다.</p>
        </div>
        <form @submit.prevent="handleLogin" class="login-form">
          <div class="mb-3">
            <label class="form-label">이메일 주소</label>
            <input v-model="email" type="email" class="form-control form-control-lg" placeholder="example@email.com">
          </div>
          <div class="mb-4">
            <label class="form-label">비밀번호</label>
            <input v-model="password" type="password" class="form-control form-control-lg" placeholder="••••••••">
          </div>
          <button type="submit" class="btn btn-primary w-100 btn-login">
            <i class="bi bi-box-arrow-in-right me-2"></i>로그인
          </button>
        </form>
        <div class="login-footer">
          <span>계정이 없나요?</span>
          <button type="button" class="btn btn-link p-0">회원가입</button>
        </div>
      </div>
    </div>
  </section>
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

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@500;700&family=Manrope:wght@400;600;700&display=swap');

.login-page {
  background: radial-gradient(900px 500px at 10% 0%, #ffe8d6 0%, transparent 60%),
    radial-gradient(700px 500px at 90% 10%, #dbeafe 0%, transparent 55%),
    #f8fafc;
}

.login-shell {
  width: min(420px, 92vw);
  background: #ffffff;
  border-radius: 22px;
  padding: 32px;
  box-shadow: 0 24px 50px rgba(15, 23, 42, 0.12);
  border: 1px solid rgba(15, 23, 42, 0.06);
  font-family: "Manrope", sans-serif;
}

.login-header h3 {
  font-family: "Fraunces", serif;
  margin-bottom: 6px;
}

.eyebrow {
  text-transform: uppercase;
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  color: #64748b;
  margin-bottom: 8px;
}

.sub {
  color: #64748b;
  margin-bottom: 20px;
}

.login-form .form-control {
  border-radius: 12px;
  border-color: #e2e8f0;
  padding: 14px 16px;
}

.login-form .form-control:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
}

.btn-login {
  border-radius: 12px;
  padding: 12px 16px;
  background: linear-gradient(135deg, #0f172a, #1d4ed8);
  border: none;
}

.login-footer {
  margin-top: 20px;
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  color: #64748b;
}

.login-footer .btn-link {
  color: #1d4ed8;
  font-weight: 600;
  text-decoration: none;
}
</style>
