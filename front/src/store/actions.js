import { HTTP } from '@/httpconstant'
import router from '@/router/index'

export default {
    signup(_, form) {
        return HTTP.post('/api/auth/signup', form)
    },
    loginUser({ commit, dispatch }, form) {
        return HTTP.post('/api/auth/login', form)
            .then((response) => {
                if (response.data.status === "fail") {
                    return false
                }
                commit('SET_USER', response.data);
                return dispatch('setHeader')
                    .then(() => setTimeout(() => router.push('home'), 2000))
            })
            .catch((error) => {
                console.log(error)
                return false
            })
    },
    logoutUser({ commit }) {
        commit('SET_USER', null)
        router.push('login')
    },
    setHeader({ state, getters }) {
        if (getters.loggedIn) {
            HTTP.defaults.headers.common['Authorization'] = `Bearer ${state.token}`
        }
    },
    editUser(_, { form, id, edit }) {
        return HTTP[edit]('api/auth/' + id, form)
    },
    createPost(_, form) {
        return HTTP.post("/api/post", form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}