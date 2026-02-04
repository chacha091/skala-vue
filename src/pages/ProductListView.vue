<template>
  <div class="container py-5">
    <h2 class="mb-4">상품 목록</h2>
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div v-for="product in products" :key="product.id" class="col">
        <div class="card h-100 shadow-sm" @click="goToDetail(product.id)" style="cursor: pointer;">
          <img :src="product.thumbnail" class="card-img-top" :alt="product.name">
          <div class="card-body">
            <span class="badge bg-secondary mb-2">{{ product.type }}</span>
            <h5 class="card-title text-truncate">{{ product.name }}</h5>
            <p class="card-text text-muted small">{{ product.description }}</p>
          </div>
          <div class="card-footer bg-transparent border-top-0 text-end">
            <button class="btn btn-outline-primary btn-sm mb-2" @click.stop="goToDetail(product.id)">
              <i class="bi bi-search me-1"></i>상세보기
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
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
