import { HTTP } from '@/httpconstant'
import router from '@/router/index'

export default {
    signup(_, form) {
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
    editUser(_, { form, id, edit }) {
        return HTTP[edit]('api/auth/' + id, form)
    },
    createPost(_, form) {
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
                commit("PUSH_POST", response.data.post)
            })
            .catch(e => e)
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
    createComment(_, comment) {
        return HTTP.post("/api/com/", comment)
    },
    updateComment(_, comment) {
        return HTTP.put("/api/com/" + comment.id, comment)
    },
    deleteComment({ commit }, { comment, post }) {
        return HTTP.delete("/api/com/" + comment.id)
            .then(() => commit("DELETE_COMMENT", { commentId: comment.id, post }))
    }
}