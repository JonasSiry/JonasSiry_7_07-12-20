// Ici on importe toutes les fonctions globales dont on va se servir dans l'application,
// on crée une nouvelle instance Vue, et on utilise la fonction d'authentification qui gère les redirections en fonction du statut logged/not

import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
import router from '@/router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTimesCircle, faTrash, faEdit, faSave, faPlusCircle } from '@fortawesome/free-solid-svg-icons'

library.add(faTimesCircle, faTrash, faEdit, faSave, faPlusCircle)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
  beforeCreate() {
    this.$store.dispatch('setHeader')
    this.$store.dispatch('checkIfStillLoggedIn')
    router.beforeEach((to, from, next) => {
      if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!this.$store.getters.loggedIn) {
          next({ path: '/login' })
        } else {
          this.$store.dispatch('checkIfStillLoggedIn')
          next()
        }
      } else {
        if (this.$store.getters.loggedIn) {
          next({ path: '/home' })
        } else {
          next()
        }
      }
    })
  },
}).$mount('#app')