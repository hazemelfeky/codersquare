<template>
  <div class="comment">
    <div class="post--up">
      <span class="title">{{ data.comment }}</span>
    </div>
    <div class="post--down">
      <span class="user">by {{ data.userId }}</span>
      <span class="date">{{ new Date(data.createdAt).toLocaleDateString() }}</span>
    </div>
    <button class="delete-btn" @click="deleteComment">Delete comment 🧺</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name:'single-comment',
  props:['data'],
  methods: {
    async deleteComment() {
      await axios.delete( 'comments/' + this.data.id )
        .then( () => {
          this.$store.dispatch('getComments', this.$route.params.id)
        })
        .catch( err => {
          this.$store.dispatch('setSnack', { value: true, message: err.response.data })
        })
      }
  }
}
</script>

<style>
.comment {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>