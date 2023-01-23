<template>
  <div id="app">
    <Nav />
    <div>
      <router-view />
    </div>
  </div>
</template>

<script>
import Nav from './components/Nav.vue';
// import { mapState } from 'vuex';

export default {
  name: 'App',
  components: {
    Nav,
  },
  // computed: {
  //   ...mapState({
  //     user: state => state.user
  //   })
  // },
  // created() {
  //   if( localStorage.getItem('username') ) {
  //     this.$store.dispatch('setUser', { username: localStorage.getItem('username') })
  //   }
  // }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Sofia+Sans:wght@300;400;700&display=swap');

#app {
  width: 85%;
  margin: 0 auto;
  font-family: 'Sofia Sans', sans-serif;
}
</style>
