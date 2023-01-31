<template>
  <div class="posts-list single-post">
    <div class="post-header">
      <div>
        <h3>{{ singlePost.title }}</h3>
        <p>created at: {{ new Date(singlePost.createdAt).toLocaleDateString() }} </p>
      </div>
      <button class="delete-btn" @click="deletePost">Delete post 🧺</button>
    </div>
    <div class="likess">
      <div>Likes: {{ likes }}</div>
      <button class="like-btn" @click="handleLike">
        <span v-if="isLiked">❤ liked</span>
        <span v-else>like</span>
      </button>
    </div>
    <CommentsList />
    <CreateComment :postId="this.$route.params.id" />
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import CreateComment from './CreateComment.vue'
import CommentsList from './CommentsList.vue'
export default {
  components: {
    CreateComment,
    CommentsList
  },
  async created() {
    await this.$store.dispatch('getSinglePost', this.postId)
    await this.$store.dispatch('getLikes', this.postId)
    await this.$store.dispatch('getComments', this.postId)
  },
  computed: {
    ...mapState({
      singlePost: state => state.singlePost,
      likesList: state => state.likes,
      userId: state => state.userId,
    }),
    postId() {
      return this.$route.params.id
    },
    isLiked() {
      return this.likesList.find( ele => ele.userId == this.userId )
    },
    likes() {
      return this.likesList.length
    }
  },
  methods: {
    async deletePost() {
      await axios.delete( 'posts/' + this.postId )
        .then( () => {
          this.$router.push('/')
        })
        .catch( err => {
          this.$store.dispatch('setSnack', { value: true, message: err.response.data.msg })
        })
    },
    async handleLike() {
      if (this.isLiked) {
        await axios.delete('likes/'+this.postId)
          .then( res => {
            console.log(res);
  
            this.$store.dispatch('getLikes', this.postId)
          })
          .catch( err => {
            this.$store.dispatch('setSnack', { value: true, message: err.response.data.msg })
          })
      } else {
        await axios.post('likes', { postId: this.postId })
          .then( res => {
            console.log(res);
  
            this.$store.dispatch('getLikes', this.postId)
          })
          .catch( err => {
            this.$store.dispatch('setSnack', { value: true, message: err.response.data })
          })
      }
    }
  }
  
}
</script>

<style>
.single-post {
  padding: 0.5rem
}
.post-header {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
}
.delete-btn {
  padding: 0.2rem 0.4rem;
  background-color: #af0f0f;
  color: white;
}
.likes {
  display: flex;
  flex-direction: column;
}
.like-btn {
  padding: 0.2rem 0.4rem;
  color: #000;
  background-color: rgb(255, 102, 0);
}
</style>