<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
    <div class="container">
      <router-link class="navbar-brand" to="/products">
        <i class="bi bi-shop me-2"></i>Mini Mall
      </router-link>
      
      <div class="d-flex align-items-center">
        <span v-if="globalState.user.isLoggedIn" class="navbar-text me-3 text-white">
          <i class="bi bi-person-circle me-1"></i>
          <strong>{{ globalState.user.name }}</strong>님 환영합니다
        </span>
        <router-link to="/cart" class="btn btn-outline-light btn-sm position-relative">
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