<template>
  <div class="container py-5">
    <div class="mb-4">
      <button @click="goBack" class="btn btn-outline-secondary">
        <i class="bi bi-arrow-left me-2"></i>목록으로 돌아가기
      </button>
    </div>

    <div class="row g-5">
      <div class="col-md-6">
        <div class="card border-0 shadow-sm">
          <img :src="product.detailImage" class="img-fluid rounded shadow" :alt="product.name">
        </div>
      </div>

      <div class="col-md-6">
        <div class="ps-md-4">
          <span class="badge bg-primary mb-2">{{ product.type }}</span>
          <h1 class="display-6 fw-bold mb-3">{{ product.name }}</h1>
          <p class="text-muted fs-5 mb-5" style="white-space: pre-wrap;">
            {{ product.description }}
          </p>

          <hr class="my-4">

          <div class="row align-items-center mb-4">
            <div class="col-auto">
              <label class="form-label fw-bold mb-0">구매 수량</label>
            </div>
            <div class="col-4">
              <div class="input-group">
                <button @click="quantity > 1 ? quantity-- : null" class="btn btn-outline-secondary" type="button">-</button>
                <input v-model.number="quantity" type="number" class="form-control text-center" min="1">
                <button @click="quantity++" class="btn btn-outline-secondary" type="button">+</button>
              </div>
            </div>
          </div>

          <div class="d-grid gap-2">
            <button @click="addToCart" class="btn btn-dark btn-lg">
              <i class="bi bi-cart-fill me-2"></i>카트에 담기
            </button>
            <button @click="buyNow" class="btn btn-primary btn-lg">
              <i class="bi bi-credit-card-2-front me-2"></i>바로 구매하기
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { productData } from '@/data/products';
import { globalState } from '@/store';

const route = useRoute();
const router = useRouter();

const quantity = ref(1);
const product = ref({});

onMounted(() => {
  const id = Number(route.params.id); // URL 파라미터는 문자열이므로 숫자로 변환
  const found = productData.find(item => item.id === id);
  
  if (found) {
    product.value = found;
  } else {
    // 상품이 없는 경우 처리
    alert('존재하지 않는 상품입니다.');
    router.push('/products');
  }
});

const addToCart = () => {
  const existing = globalState.cart.find(item => item.id === product.value.id);

  if(existing){
    existing.quantity += quantity.value;
  } else{
    globalState.cart.push({
      id: product.value.id,
      name: product.value.name,
      type: product.value.type,
      thumbnail: product.value.thumbnail,
      quantity: quantity.value
    });
  }
  alert(`${product.value.name} ${quantity.value}개가 카트에 담겼습니다!`);
  router.push('/cart');
};

const goBack = () => {
  router.push('/products');
};

const buyNow = () => {
  alert('구매가 완료되었습니다!');
  router.push('/products');
};
</script>