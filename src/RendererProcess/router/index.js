import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Crawler from '../views/Crawler.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Crawler',
    name: 'Crawler',
    component: Crawler
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
