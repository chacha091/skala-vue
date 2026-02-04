<template>
  <section class="product-page">
    <div class="container py-5">
      <div class="page-hero mb-4">
        <div>
          <p class="eyebrow">Skala Market</p>
          <h2 class="mb-2">상품 목록</h2>
          <p class="hero-sub">감각적인 선택을 돕는 큐레이션 컬렉션</p>
        </div>
        <div class="hero-badge">
          <i class="bi bi-stars me-2"></i>오늘의 추천
        </div>
      </div>

      <div class="row row-cols-1 row-cols-md-3 g-4">
        <div v-for="product in products" :key="product.id" class="col">
          <div class="card product-card h-100" @click="goToDetail(product.id)">
            <div class="img-wrap">
              <img :src="product.thumbnail" class="card-img-top" :alt="product.name">
            </div>
            <div class="card-body">
              <span class="badge type-pill mb-2">{{ product.type }}</span>
              <h5 class="card-title text-truncate">{{ product.name }}</h5>
              <p class="card-text text-muted small">{{ product.description }}</p>
            </div>
            <div class="card-footer bg-transparent border-top-0 text-end">
              <button class="btn btn-ghost btn-sm mb-2" @click.stop="goToDetail(product.id)">
                <i class="bi bi-search me-1"></i>상세보기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { productData } from '@/data/products';
import { useRouter } from 'vue-router';

const products = ref(productData);

const router = useRouter();

const goToDetail = (productId) => { 
  router.push({ name: 'ProductDetailView', params: { id: productId } });
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@500;700&family=Manrope:wght@400;600;700&display=swap');

.product-page {
  background: radial-gradient(1200px 600px at 10% -10%, #f7efe6 0%, transparent 60%),
    radial-gradient(800px 500px at 90% 0%, #e8f3f1 0%, transparent 55%),
    #f9fafb;
  min-height: 100%;
}

.page-hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 24px 28px;
  border-radius: 16px;
  background: linear-gradient(135deg, #ffffff, #f5f3ff);
  border: 1px solid rgba(15, 23, 42, 0.06);
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
}

.page-hero h2 {
  font-family: "Fraunces", serif;
  letter-spacing: -0.5px;
}

.eyebrow {
  text-transform: uppercase;
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  color: #6b7280;
  margin-bottom: 8px;
  font-family: "Manrope", sans-serif;
}

.hero-sub {
  color: #64748b;
  margin: 0;
  font-family: "Manrope", sans-serif;
}

.hero-badge {
  font-family: "Manrope", sans-serif;
  font-weight: 700;
  background: #111827;
  color: #fff;
  padding: 10px 14px;
  border-radius: 999px;
  font-size: 0.85rem;
}

.product-card {
  cursor: pointer;
  border: 0;
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.12);
}

.img-wrap {
  padding: 14px;
}

.img-wrap img {
  border-radius: 14px;
  object-fit: cover;
  height: 220px;
  width: 100%;
}

.type-pill {
  background: #f1f5f9;
  color: #111827;
  font-weight: 600;
  border-radius: 999px;
  padding: 6px 12px;
  font-family: "Manrope", sans-serif;
}

.card-title {
  font-family: "Fraunces", serif;
  font-size: 1.1rem;
}

.btn-ghost {
  border: 1px solid #e2e8f0;
  color: #0f172a;
  background: #ffffff;
  border-radius: 999px;
  padding: 6px 12px;
  font-family: "Manrope", sans-serif;
  transition: all 0.2s ease;
}

.btn-ghost:hover {
  background: #0f172a;
  color: #fff;
}

@media (max-width: 768px) {
  .page-hero {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
