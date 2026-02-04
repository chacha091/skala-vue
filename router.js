import { createRouter, createWebHistory } from 'vue-router'

// import DisguiseMain from '@/pages/DisguiseMain.vue'
// import DisguiseResult from '@/pages/DisguiseResult.vue'

import AppLectures from './src/AppLectures.vue';

import LoginView from './src/pages/LoginView.vue';
import ProductListView from './src/pages/ProductListView.vue';
import ProductDetailView from './src/pages/ProductDetailView.vue';
import CartView from './src/pages/CartView.vue';

const routes = [
  // { path: "/", component: DisguiseMain },
  // { path: "/result", component: DisguiseResult },

  { path: "/login", component: LoginView },
  { path: "/products", component: ProductListView },
  { path: "/products/:id",name: 'ProductDetailView', component: ProductDetailView },
  { path: "/cart", component: CartView },
  { path: "/", component: LoginView },
  { path: "/applectures", component: AppLectures },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;