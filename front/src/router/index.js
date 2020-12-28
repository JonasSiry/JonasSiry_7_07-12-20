// Ici on a les routes pour toutes nos views avec le requiresAuth sur chacune,
// on a une route all tout en bas si l'utilisateur tape n'importe quoi,
// qui redirige automatiquement vers Signup. Enfin on a la route des posts qui va parser l'id de ceux-ci,
// et retourner le post correspondant.

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
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    meta: { requiresAuth: true },
    path: '/post/create',
    name: 'PostCreate',
    component: () => import('../views/PostCreate.vue')
  },
  {
    meta: { requiresAuth: true },
    props: (route) => {
      const id = Number.parseInt(route.params.id, 10)
      return { id }
    },
    path: '/post/:id(\\d+)', component: () => import('../views/Post.vue'),
    children: [
      {
        path: 'edit',
        component: () => import('../components/EditPost.vue'),
      },
      {
        path: '',
        component: () => import('../components/ViewPost.vue'),
      }
    ]
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
    meta: { requiresAuth: false },
    path: '*',
    redirect: { name: 'Signup' }
  },
]

const router = new VueRouter({
  routes
})

export default router