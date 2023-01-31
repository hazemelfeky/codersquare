<template>
  <nav>
    <router-link class="logo" to="/">
      <div class="pic">🍕</div>
      <div class="name">CoderSquare</div>
    </router-link>
    <!-- <div class="links">
      <a v-for="link in links" :key="link.name" class="link">{{ link.name }}</a>
    </div> -->
    <div class="buttons">
      <div v-if="!token">
        <router-link to="/signup">Sign-Up</router-link>
        <router-link to="/login">Log-In</router-link>
      </div>
      <div class="fake-button" v-else @click="handleLogout">
        log-Out
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Nav-bar',
  data() {
    return {
      links: [
        { name: "posts" },
        { name: "likes" },
        { name: "comments" },
      ]
    }
  },
  computed: {
    ...mapState({
      token: state => state.token,
    })
  },
  methods: {
    handleLogout() {
      console.log('logout');
      localStorage.clear()
      this.$store.dispatch('setToken', '')
      this.$router.push('/login')
    }
  }
}
</script>

<style>
nav {
  background-color: rgb(255, 102, 0);
  padding: 2px 4px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.logo {
  font-weight: bold;
  display: flex;
  text-decoration: none;
  color: black;
  align-items: center;
}
.logo .pic {
  font-size: 1.2em;
}
.logo .name, .user--name {
  width: max-content;
}
.links {
  width: -webkit-fill-available;
}
.link:not(:last-child)::after {
  content: ' | '
}
.buttons {
  margin-left: auto;
}
.buttons div {
  display: flex;
  gap: 1rem;
}
.buttons a{
  text-decoration: none;
  color: black;
}
.fake-button {
  cursor: pointer;
}
</style>