<template>
  <div class="comments-container">
    <Comment v-for="comment in comments" :key="comment.id" :data="comment" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Comment from './Comment.vue'
export default {
  components: {
    Comment
  },
  computed: {
    ...mapState({
      comments: state => state.comments
    })
  },
}
</script>

<style>
.comments-container {
  padding: 1rem 2rem;
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
}
</style>