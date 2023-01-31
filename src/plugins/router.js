import Vue from 'vue'
import Router from 'vue-router'

import PostsList from '@/components/PostsList.vue'
import PostPage from '@/components/PostPage.vue'
import SignUp from '@/components/SignUp.vue'
import Login from '@/components/Login.vue'

Vue.use(Router)

function guardMyroute(to, from, next) {
  var isAuthenticated= false;
  if(localStorage.getItem('token')) isAuthenticated = true;
  if(!isAuthenticated) {
    next(); // allow to enter route
  } else {
    next('/'); // go to '/login';
  }
}

function guardMyHome(to, from, next) {
  var isAuthenticated= false;
  if(localStorage.getItem('token')) isAuthenticated = true;
  if(isAuthenticated) {
    next(); // allow to enter route
  } else {
    next('/login'); // go to '/login';
  }
}

const opts = {
  mode: 'history',
  routes: [
    { path: '/', component: PostsList, beforeEnter: guardMyHome },
    { path: '/signup', component: SignUp, beforeEnter: guardMyroute},
    { path: '/login', component: Login, beforeEnter: guardMyroute},
    { path: '/post/:id', component: PostPage, beforeEnter: guardMyHome},
  ]
}

export default new Router(opts)