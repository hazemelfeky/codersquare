<template>
  <div class="posts-list">
    <Post v-for="post in posts" :key="post.id" :post="post"/>
    <CreatePost :type="{ name: 'post', endpoint: 'posts', dispatch:'getPosts'}" v-if="token" />
  </div>
</template>

<script>
// import axios from 'axios';
import Post from './Post.vue'
import CreatePost from './CreatePost.vue'
import { mapState } from 'vuex'

export default {
  name: "posts-list",
  components: {
    Post,
    CreatePost
  },

  computed: {
    ...mapState({
      posts: state => state.posts,
      token: state => state.token,
    })
  },

  created() {
    this.$store.dispatch('getPosts', this.token)
  }
}
</script>

<style>
.posts-list {
  background-color: rgb(246, 246, 239);
  padding: 0.5rem 0;
  color: #828282;
}
</style>