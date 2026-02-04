<template>
  <nav class="navbar navbar-expand-lg app-navbar mb-4">
    <div class="container">
      <router-link class="navbar-brand brand" to="/products">
        <span class="brand-mark"><i class="bi bi-shop"></i></span>
        <span class="brand-text">Mini Mall</span>
      </router-link>
      
      <div class="d-flex align-items-center gap-3">
        <span v-if="globalState.user.isLoggedIn" class="navbar-text welcome">
          <i class="bi bi-person-circle me-1"></i>
          <strong>{{ globalState.user.name }}</strong>님 환영합니다
        </span>
        <router-link to="/cart" class="btn btn-cart position-relative">
          <i class="bi bi-cart3"></i>
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {{ globalState.cart.length }}
          </span>
        </router-link>
      </div>
    </div>
  </nav>
  
  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router';
import { globalState } from '@/store';
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@500;700&family=Manrope:wght@400;600;700&display=swap');

.app-navbar {
  background: linear-gradient(120deg, #0f172a, #1f2937);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 16px 30px rgba(15, 23, 42, 0.3);
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #ffffff;
  text-decoration: none;
  font-family: "Fraunces", serif;
  letter-spacing: -0.4px;
}

.brand-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
}

.brand-text {
  font-size: 1.1rem;
}

.welcome {
  color: #e2e8f0;
  font-family: "Manrope", sans-serif;
}

.btn-cart {
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #ffffff;
  background: rgba(255, 255, 255, 0.08);
  padding: 6px 12px;
  transition: all 0.2s ease;
}

.btn-cart:hover {
  background: #ffffff;
  color: #0f172a;
}
</style>
