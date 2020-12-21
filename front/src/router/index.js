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
    path: '/post/create',
    name: 'PostCreate',
    component: () => import('../views/PostCreate.vue')
  },
  {
    meta: { requiresAuth: true },
    props: (route) => {
      const id = Number.parseInt(route.params.id, 10)
      if (Number.isNaN(id)) {
        return 0
      }
      return { id }
    },
    path: '/post/:id', component: () => import('../views/Post.vue'),
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
  }
]

const router = new VueRouter({
  routes
})

export default router