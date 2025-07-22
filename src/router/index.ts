import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
      props: { mode: 'login' },
    },
    {
      path: '/register',
      name: 'Register',
      component: LoginView,
      props: { mode: 'register' },
    },
    {
      path: '/',
      redirect: '/login',
    },
  ],
})

export default router
