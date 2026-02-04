// src/store.js (간단한 공통 저장소 역할)
import { reactive } from 'vue';

export const globalState = reactive({
  user: {
    name: "홍길동",
    isLoggedIn: true
  },
  cart: []
});