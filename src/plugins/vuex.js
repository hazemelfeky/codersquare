import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

const state = {
  user: null,
  token: localStorage.getItem('token') || '',
  posts: []
}

const store = new Vuex.Store({
  state,
  getters: {
    user: state => state.user
  },
  mutations: {
    user(state, payload) {
      if( Object.entries(payload).length > 0 ) {
        console.log(payload);
        state.user = { ...payload, ...state.user }
        console.log(state.user);
      } else {
        state.user = {}
      }
    },
    token(state, payload) {
      state.token = payload
    },
    posts(state, payload) {
      state.posts = payload
    }
  },
  actions: {
    setUser({ commit }, payload) {
      commit('user', payload)
    },
    setToken({commit }, payload) {
      commit('token', payload)
    },
    async getPosts({commit}) {
      const res = await axios.get('posts')
      commit('posts', res.data)
    }
  },
})

export default store