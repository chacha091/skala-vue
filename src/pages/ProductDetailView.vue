<template>
  <section class="detail-page">
    <div class="container py-5">
      <div class="mb-4">
        <button @click="goBack" class="btn btn-back">
          <i class="bi bi-arrow-left me-2"></i>목록으로 돌아가기
        </button>
      </div>

      <div class="row g-5 align-items-start">
        <div class="col-md-6">
          <div class="media-card">
            <img :src="product.detailImage" class="img-fluid" :alt="product.name">
          </div>
        </div>

        <div class="col-md-6">
          <div class="detail-panel">
            <span class="badge type-pill mb-2">{{ product.type }}</span>
            <h1 class="display-6 fw-bold mb-3">{{ product.name }}</h1>
            <p class="description text-muted fs-5 mb-4">
              {{ product.description }}
            </p>

            <div class="meta-row">
              <div class="meta-chip">
                <i class="bi bi-shield-check me-2"></i>7일 무료 반품
              </div>
              <div class="meta-chip">
                <i class="bi bi-truck me-2"></i>무료 배송
              </div>
            </div>

            <hr class="my-4">

            <div class="row align-items-center mb-4">
              <div class="col-auto">
                <label class="form-label fw-bold mb-0">구매 수량</label>
              </div>
              <div class="col-5 col-md-4">
                <div class="input-group qty-group">
                  <button @click="quantity > 1 ? quantity-- : null" class="btn btn-qty" type="button">-</button>
                  <input v-model.number="quantity" type="number" class="form-control text-center" min="1">
                  <button @click="quantity++" class="btn btn-qty" type="button">+</button>
                </div>
              </div>
            </div>

            <div class="d-grid gap-2">
              <button @click="addToCart" class="btn btn-dark btn-lg btn-solid">
                <i class="bi bi-cart-fill me-2"></i>카트에 담기
              </button>
              <button @click="buyNow" class="btn btn-primary btn-lg btn-gradient">
                <i class="bi bi-credit-card-2-front me-2"></i>바로 구매하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
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

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@500;700&family=Manrope:wght@400;600;700&display=swap');

.detail-page {
  background: radial-gradient(1100px 600px at 0% 0%, #f4f1ff 0%, transparent 55%),
    radial-gradient(900px 500px at 95% 10%, #e6f4f1 0%, transparent 60%),
    #f8fafc;
}

.btn-back {
  border: 1px solid #e2e8f0;
  background: #fff;
  color: #0f172a;
  border-radius: 999px;
  padding: 8px 16px;
  font-family: "Manrope", sans-serif;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);
}

.media-card {
  border-radius: 22px;
  padding: 18px;
  background: #ffffff;
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.12);
}

.media-card img {
  border-radius: 18px;
  width: 100%;
  object-fit: cover;
}

.detail-panel {
  background: #ffffff;
  border-radius: 22px;
  padding: 28px;
  box-shadow: 0 16px 36px rgba(15, 23, 42, 0.1);
  font-family: "Manrope", sans-serif;
}

.detail-panel h1 {
  font-family: "Fraunces", serif;
}

.type-pill {
  background: #0f172a;
  color: #fff;
  padding: 6px 12px;
  border-radius: 999px;
  font-weight: 600;
}

.description {
  white-space: pre-wrap;
}

.meta-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.meta-chip {
  background: #f1f5f9;
  color: #0f172a;
  border-radius: 999px;
  padding: 8px 12px;
  font-size: 0.85rem;
  font-weight: 600;
}

.qty-group .form-control {
  border-color: #e2e8f0;
}

.btn-qty {
  border: 1px solid #e2e8f0;
  background: #fff;
  color: #0f172a;
}

.btn-solid {
  border-radius: 12px;
  background: #0f172a;
  border: none;
}

.btn-gradient {
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, #5b21b6, #2563eb);
}
</style>
