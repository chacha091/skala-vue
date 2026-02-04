<template>
  <section class="cart-page">
    <div class="container py-5">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <p class="eyebrow">My Cart</p>
          <h3 class="mb-0"><i class="bi bi-cart-check me-2"></i>내 장바구니</h3>
        </div>
        <button @click="goBack" class="btn btn-back">
          <i class="bi bi-arrow-left me-2"></i>목록으로 돌아가기
        </button>
      </div>

      <div v-if="globalState.cart.length === 0" class="empty-state">
        <i class="bi bi-emoji-smile"></i>
        <p class="mt-3 mb-0">장바구니가 비어 있습니다.</p>
      </div>

      <div v-else class="cart-shell">
        <div class="list-group cart-list">
          <div v-for="(item, index) in globalState.cart" :key="item.id" 
            class="list-group-item d-flex justify-content-between align-items-center p-3 cart-item">
          
            <div class="d-flex align-items-center item-info" @click="goToDetail(item.id)">
              <img :src="item.thumbnail" 
                  alt="상품 이미지" 
                  class="item-thumb me-3">
              <div>
                <h6 class="mb-0">{{ item.name }}</h6>
                <small class="text-muted">{{ item.type }}</small>
              </div>
            </div>

            <div class="d-flex align-items-center">
              <div class="input-group input-group-sm me-3 qty-group" style="width: 120px;">
                <button @click="updateQty(index, -1)" class="btn btn-qty" type="button">-</button>
                <input type="text" class="form-control text-center" :value="item.quantity" readonly>
                <button @click="updateQty(index, 1)" class="btn btn-qty" type="button">+</button>
              </div>
              
              <button @click="removeItem(index)" class="btn btn-remove btn-sm">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>
        
        <div class="summary">
          <div>
            <p class="summary-label">총 상품 개수</p>
            <h5 class="mb-0">{{ totalQuantity }}개</h5>
          </div>
          <button @click="purchase" class="btn btn-primary btn-lg btn-pay">
            <i class="bi bi-credit-card me-2"></i>결제하기
          </button>
        </div>
      </div>
    </div>
  </section>
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
  alert(`${globalState.user.name}님, 구매가 완료되었습니다!`);
  globalState.cart = []; // 카트 비우기
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@500;700&family=Manrope:wght@400;600;700&display=swap');

.cart-page {
  background: radial-gradient(900px 500px at 10% 0%, #e2f4ff 0%, transparent 60%),
    radial-gradient(700px 500px at 90% 10%, #fde7d9 0%, transparent 55%),
    #f8fafc;
  min-height: 100%;
  font-family: "Manrope", sans-serif;
}

.eyebrow {
  text-transform: uppercase;
  font-size: 0.72rem;
  letter-spacing: 0.25em;
  color: #64748b;
  margin-bottom: 6px;
}

.btn-back {
  border: 1px solid #e2e8f0;
  background: #fff;
  color: #0f172a;
  border-radius: 999px;
  padding: 8px 16px;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);
}

.empty-state {
  border-radius: 18px;
  padding: 48px;
  background: #ffffff;
  text-align: center;
  box-shadow: 0 18px 36px rgba(15, 23, 42, 0.1);
  color: #64748b;
}

.empty-state i {
  font-size: 2rem;
}

.cart-shell {
  border-radius: 22px;
  background: #fff;
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.1);
  overflow: hidden;
}

.cart-list {
  border: 0;
}

.cart-item {
  border: 0;
  border-bottom: 1px solid #eef2f7;
}

.item-info {
  cursor: pointer;
}

.item-thumb {
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 14px;
  border: 1px solid #e2e8f0;
}

.qty-group .form-control {
  border-color: #e2e8f0;
}

.btn-qty {
  border: 1px solid #e2e8f0;
  background: #fff;
  color: #0f172a;
}

.btn-remove {
  border-radius: 10px;
  border: 1px solid #fecaca;
  color: #b91c1c;
  background: #fff5f5;
}

.summary {
  padding: 20px 24px;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.summary-label {
  margin-bottom: 4px;
  color: #64748b;
  font-size: 0.85rem;
}

.btn-pay {
  border-radius: 12px;
  padding: 12px 20px;
  background: linear-gradient(135deg, #0f172a, #1d4ed8);
  border: none;
}
</style>
