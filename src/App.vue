<template>
  <div id="app">
    <Nav />
    <div>
      <router-view />
    </div>
    <v-snackbar
      :value="snack.value"
      :timeout="2000"
    >
      {{snack.message}}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="$store.dispatch('setSnack', { value: true })"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import Nav from './components/Nav.vue';
import { mapState } from 'vuex';

export default {
  name: 'App',
  components: {
    Nav,
  },
  computed: {
    ...mapState({
      snack: state => state.snack
    })
  },

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
