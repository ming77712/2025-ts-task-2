import Dashboard from '@/components/Dashboard.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/front/FrontLayout.vue'),
      children: [
        {
          path: '',
          component: () => import('../views/front/HomeView.vue'),
        },
        {
          path: '/products',
          name: 'products',
          component: () => import('../views/front/ProductsView.vue'),
        },
        {
          path: '/products/:id',
          name: 'product-detail',
          component: () => import('../views/front/ProductDetailView.vue'),
        },
        {
          path: '/cart',
          name: 'cart',
          component: () => import('../views/front/CartView.vue'),
        },
        {
          path: '/checkout',
          name: 'checkout',
          component: () => import('../views/front/CheckoutView.vue'),
        },
        {
          path: '/checkout-success',
          name: 'checkout-success',
          component: () => import('../views/front/CheckoutSuccessView.vue'),
        },
      ],
    },
    {
      path: '/admin',
      name: 'dashboard',
      component: Dashboard,
      children: [
        {
          path: '/product-management',
          name: 'product-management',
          component: () => import('@/views/ProductManagement.vue'),
        },
        {
          path: '/order-management',
          name: 'order-management',
          component: () => import('@/views/OrderManagement.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
    },
  ],

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    return {
      top: 0,
      left: 0,
      behavior: 'smooth',
    }
  },
})

export default router
