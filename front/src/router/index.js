import Vue from 'vue'
import VueRouter from 'vue-router'
import Signup from '../views/Signup.vue'

Vue.use(VueRouter)

const routes = [
  {
    meta: { requiresAuth: false },
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    meta: { requiresAuth: true },
    path: '/Home',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    meta: { requiresAuth: true },
    path: '/post',
    name: 'Post',
    component: () => import('../views/Post.vue')
  },
  {
    meta: { requiresAuth: true },
    path: '/post',
    name: 'Postid',
    component: () => import('../views/Postid.vue')
  },
  {
    meta: { requiresAuth: true },
    path: '/profil',
    name: 'Profil',
    component: () => import('../views/Profil.vue')
  },
  {
    meta: { requiresAuth: false },
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '*',
    redirect: { name: 'Signup' }
  }
]

const router = new VueRouter({
  routes
})

export default router