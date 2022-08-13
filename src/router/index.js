import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ProductView from '../views/ProductView.vue'
import CartView from '../views/CartView.vue'
import OrderView from '../views/OrderView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/products',
    name: 'products',
    component: ProductView
  },
  {
    path: '/cart',
    name: 'cartview',
    component: CartView
  },
  {
    path: '/order',
    name: 'orderview',
    component: OrderView
  },
  {
    path: '/login',
    name: 'loginview',
    component: LoginView
  },
  {
    path: '/register',
    name: 'registerview',
    component: RegisterView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
