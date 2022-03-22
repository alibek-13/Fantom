import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Blog from '../views/Blog.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {}
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue'),
    meta: {}
  },
  {
    path: '/portfolio',
    name: 'Portfolio',
    component: ()=> import("@/views/Portfolio.vue"),
    meta: {}
  },
  {
    path: '/Blog',
    name: 'Blog',
    component: Blog

  },
  {
    path: '/Registratsion',
    name: 'Registratsion',
    component: () => import('@/views/Registratsion.vue'),
    meta: {}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
