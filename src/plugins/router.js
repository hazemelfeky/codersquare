import Vue from 'vue'
import Router from 'vue-router'

import PostsList from '@/components/PostsList.vue'
import SignUp from '@/components/SignUp.vue'
import Login from '@/components/Login.vue'

Vue.use(Router)

function guardMyroute(to, from, next) {
  var isAuthenticated= false;
  if(localStorage.getItem('token')) isAuthenticated = true;
  console.log('guardMyroute');
  if(!isAuthenticated) {
    next(); // allow to enter route
  } else {
    next('/'); // go to '/login';
  }
}

const opts = {
  mode: 'history',
  routes: [
    { path: '/', component: PostsList },
    { path: '/signup', component: SignUp, beforeEnter: guardMyroute},
    { path: '/login', component: Login, beforeEnter: guardMyroute},
  ]
}

export default new Router(opts)