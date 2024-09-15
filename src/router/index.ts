import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/quiz/:id',
      name: 'quiz',
      component: () => import('@/views/QuizView.vue')
    }
  ]
})

export default router
