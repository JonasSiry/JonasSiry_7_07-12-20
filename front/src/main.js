import Vue from 'vue'
import App from './Base.vue'
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