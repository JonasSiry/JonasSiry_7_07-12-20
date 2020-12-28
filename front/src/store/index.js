// Ici on exporte tout notre store pour le rendre disponible dans notre application
// Le persistedState permet d'avoir les infos token, user, et posts qui persistent dans vuex après un reload de page

import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate"
import actions from './actions'
import mutations from './mutations'
import getters from "./getters"

Vue.use(Vuex);

export default new Vuex.Store({
    state: { postsCount: 0, posts: [], token: null, user: null },
    actions,
    mutations,
    getters,
    plugins: [
        createPersistedState({
            paths: ['token', 'user', 'posts']
        })
    ]
})