import Vue from 'vue'

const emptyUser = {
    email: "",
    firstName: "",
    lastName: "",
    admin:false
}

export default {
    SET_USER: (state, data) => {
        if (data) {
            Vue.set(state, "user", data)
        }
        else {
            Vue.set(state, "user", emptyUser)
        }
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_POSTS: (state, posts) => {
        posts.forEach(postToPush => {
            let postAlreadyInStore = state.posts.find(post => post.id === postToPush.id)
            if (!postAlreadyInStore)
                state.posts.push(postToPush)
            else {
                Vue.set(state.posts, state.posts.indexOf(postAlreadyInStore), postToPush)
            }
        });
    },
    SET_POSTS_COUNT: (state, count) => {
        state.postsCount = count
    },
    PUSH_POST: (state, postToPush) => {
        let postAlreadyInStore = state.posts.find(post => post.id === postToPush.id)
        if (!postAlreadyInStore)
            state.posts.push(postToPush)
        else {
            Vue.set(state.posts, state.posts.indexOf(postAlreadyInStore), postToPush)
        }
    },
    DELETE_POST: (state, postToDelete) => {
        Vue.delete(state.posts, state.posts.indexOf(postToDelete))
    },
    DELETE_COMMENT: (_, { commentId, post }) => {
        let comToDelete = post.Coms.find(com => (commentId == com.id))
        if (comToDelete) {
            Vue.delete(post.Coms, post.Coms.indexOf(comToDelete))
        }
    },
    RESET_STORE: (state) => {
        state.postsCount = 0
        state.posts = []
        state.token = null
        state.user = null 
    }
}