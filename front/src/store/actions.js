// Ici on a toutes les actions, qui sont là pour mettre à jour notre state
// et/ou commit des mutations qui vont le faire.
// Elles s'occupent de gérer users, posts et coms.
// Parfois on se sert d'un getter pour chercher une information spécifique

import { HTTP } from '@/httpconstant'
import router from '@/router/index'

export default {
    signup(_context, form) {
        return HTTP.post('/api/auth/signup', form)
    },
    checkIfStillLoggedIn({ commit }) {
        HTTP.get('/api/auth/')
            .catch(() => {
                commit('SET_USER', null);
                commit('SET_TOKEN', null);
                router.push({ path: '/login', query: { timeOut: true } })
            })
    },
    loginUser({ commit, dispatch }, form) {
        return HTTP.post('/api/auth/login', form)
            .then((response) => {
                if (response.data.status === "fail") {
                    return false
                }
                commit('SET_USER', response.data.user);
                commit('SET_TOKEN', response.data.token)
                return dispatch('setHeader')
                    .then(() => setTimeout(() => router.push('home'), 2000))
            })
            .catch((error) => {
                console.log(error)
                return false
            })
    },
    logoutUser({ commit }) {
        commit('RESET_STORE')
        delete HTTP.defaults.headers.common['Authorization']
        router.push('/login')
    },
    setHeader({ state, getters }) {
        if (getters.loggedIn) {
            HTTP.defaults.headers.common['Authorization'] = `Bearer ${state.token}`
        }
    },
    editUser(_context, { form, id, edit }) {
        return HTTP[edit]('api/auth/' + id, form)
    },
    createPost(_context, form) {
        return HTTP.post("/api/post", form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    fetchPosts({ commit }, offset = 0) {
        HTTP.get("/api/post", { params: { limit: 5, offset } })
            .then((response) => {
                commit("SET_POSTS", response.data.posts)
                commit("SET_POSTS_COUNT", response.data.count)
            })
            .catch(e => e)
    },
    fetchPost({ commit }, id) {
        HTTP.get("/api/post/" + id)
            .then((response) => {
                if (response.data.post) {
                    commit("PUSH_POST", response.data.post)
                }
            })
    },
    deletePost({ commit }, post) {
        HTTP.delete("/api/post/" + post.id)
            .then(() => {
                commit("DELETE_POST", post)
                router.push('/home')
            })
            .catch(e => {
                console.log(e)
                return e
            })
    },
    editPost({ dispatch }, { id, form }) {
        return HTTP.put("/api/post/" + id, form).then(() => dispatch('fetchPost', this.id))
    },
    createComment(_context, comment) {
        return HTTP.post("/api/com/", comment)
    },
    updateComment(_context, comment) {
        return HTTP.put("/api/com/" + comment.id, comment)
    },
    deleteComment({ commit }, { comment, post }) {
        return HTTP.delete("/api/com/" + comment.id)
            .then(() => commit("DELETE_COMMENT", { commentId: comment.id, post }))
    }
}