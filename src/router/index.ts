import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/mindmania/'),
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
