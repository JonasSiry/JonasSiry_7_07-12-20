import Vue from 'vue'

const emptyUser = {
    email: "",
    firstName: "",
    lastName: ""
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
        if (posts)
            Vue.set(state, "posts", posts)
    },
    PUSH_POST: (state, postToPush) => {
        if (!state.posts.find(post => post.id === postToPush.id))
            state.posts.push(postToPush)
    },
}