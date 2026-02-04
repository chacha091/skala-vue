<template>
  <div class="container py-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h3 class="mb-0"><i class="bi bi-cart-check me-2"></i>내 장바구니</h3>
      <button @click="goBack" class="btn btn-outline-secondary">
        <i class="bi bi-arrow-left me-2"></i>목록으로 돌아가기
      </button>
    </div>

    <div v-if="globalState.cart.length === 0" class="alert alert-light border text-center py-5">
      장바구니가 비어 있습니다.
    </div>

    <div v-else class="list-group shadow-sm">
      <div v-for="(item, index) in globalState.cart" :key="item.id" 
        class="list-group-item d-flex justify-content-between align-items-center p-3">
      
        <div class="d-flex align-items-center" @click="goToDetail(item.id)">
          <img :src="item.thumbnail" 
              alt="상품 이미지" 
              class="rounded border me-3" 
              style="width: 60px; height: 60px; object-fit: cover;">
          <div>
            <h6 class="mb-0">{{ item.name }}</h6>
            <small class="text-muted">{{ item.type }}</small>
          </div>
        </div>

        <div class="d-flex align-items-center">
          <div class="input-group input-group-sm me-3" style="width: 120px;">
            <button @click="updateQty(index, -1)" class="btn btn-outline-secondary" type="button">-</button>
            <input type="text" class="form-control text-center" :value="item.quantity" readonly>
            <button @click="updateQty(index, 1)" class="btn btn-outline-secondary" type="button">+</button>
          </div>
          
          <button @click="removeItem(index)" class="btn btn-outline-danger btn-sm">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>
      
      <div class="p-4 text-end bg-light border-top">
        <h5 class="mb-3">총 상품 개수: {{ totalQuantity }}개</h5>
        <button @click="purchase" class="btn btn-primary btn-lg px-5">
          <i class="bi bi-credit-card me-2"></i>결제하기
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { globalState } from '@/store';
import { useRouter } from 'vue-router';

const router = useRouter();

const updateQty = (index, payload) => {
  const item = globalState.cart[index];
  const newQty = item.quantity + payload;
  if (newQty > 0) {
    item.quantity = newQty;
  }
};

const totalQuantity = computed(() => {
  return globalState.cart.reduce((sum, item) => sum + item.quantity, 0);
});

const goBack = () => {
  router.push('/products');
};

const goToDetail = (itemId) => { 
  router.push({ name: 'ProductDetailView', params: { id: itemId } });
};

// 장바구니 삭제 함수
const removeItem = (index) => {
  globalState.cart.splice(index, 1);
};

const purchase = () => {
  alert('`${globalState.user.name}님, 구매가 완료되었습니다!');
  globalState.cart = []; // 카트 비우기
};
</script>