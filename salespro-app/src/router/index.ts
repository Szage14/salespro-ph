import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SalesView from '../views/SalesView.vue'
import CalculatorView from '../views/CalculatorView.vue'
import NotesView from '../views/NotesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/sales',
      name: 'sales',
      component: SalesView,
    },
    {
      path: '/calculator',
      name: 'calculator',
      component: CalculatorView,
    },
    {
      path: '/notes',
      name: 'notes',
      component: NotesView,
    },
  ],
})

export default router