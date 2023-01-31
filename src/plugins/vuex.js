import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

const state = {
  userId: localStorage.getItem('userId') || '',
  token: localStorage.getItem('token') || '',
  posts: [],
  snack: {value: false, message: ""},
  singlePost: {},
  comments: [],
  likes: [],
}

const store = new Vuex.Store({
  state,
  getters: {
    userId: state => state.userId
  },
  mutations: {
    userId(state, payload) {
      state.userId = payload
    },
    token(state, payload) {
      state.token = payload
    },
    posts(state, payload) {
      state.posts = payload
    },
    snack(state, payload) {
      state.snack = payload
    },
    singlePost(state, payload) {
      state.singlePost = payload
    },
    comments(state, payload) {
      state.comments = payload
    },
    likes(state, payload) {
      state.likes = payload
    },
  },
  actions: {
    setUserId({ commit }, payload) {
      commit('userId', payload)
    },
    setToken({commit }, payload) {
      axios.defaults.headers.common['Authorization'] = "Bearer " + payload;
      commit('token', payload)
    },
    async getPosts({commit}) {
      const res = await axios.get(
        'posts'
      )
      commit('posts', res.data)
    },
    async getSinglePost({commit}, id) {
      const res = await axios.get('posts/' + id)
      commit('singlePost', res.data)
    },
    async getLikes({commit}, id) {
      const res = await axios.get('likes/' + id)
      commit('likes', res.data)
    },
    async getComments({commit}, id) {
      const res = await axios.get('comments/' + id)
      commit('comments', res.data)
    },
    setSnack({commit }, payload) {
      commit('snack', payload)
      setTimeout( () => {
        commit('snack', {value: 2000})
      }, 2000)
    },
  },
})

export default store