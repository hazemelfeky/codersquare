<template lang="">
  <div class="post">
    <v-form v-model="valid" @submit.prevent="handleSubmit">
      <v-container>
        <h2>Create comment:</h2>
        <v-row>
          <v-text-field
            v-model="comment"
            :rules="requiredRules"
            label="Comment"
            required
          ></v-text-field>
        </v-row>
        <v-row justify="center">
          <v-btn
            class="mr-4"
            type="submit"
            :disabled="!valid"
          >
            Submit
          </v-btn>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>
<script>
import axios from 'axios';
import { mapState } from 'vuex';
export default {
  name: "create-post",
  props: ['postId'],
  data() {
    return {
      valid: false,
      comment: "",
      requiredRules: [
        v => !!v || 'This field is required',
      ],
    }
  },
  computed: {
    ...mapState({
      token: state => state.token,
      userId: state => state.userId,
    })
  },
  methods: {
    async handleSubmit() {
      axios.post('comments', { postId: this.postId, comment: this.comment })
        .then( res => {
          console.log(res);
          console.log('created successfully');
          this.$store.dispatch('getComments', this.postId)
          this.comment = ''
        })
        .catch( err => {
          this.$store.dispatch('setSnack', { value: true, message: err.response.data })
        })
    }
  }
}
</script>
<style>
.post {
  padding: 0.3rem 0.5rem;
}
.post--up .title {
  font-size: 1.2em;
  color: black;
}
.post--down {
  font-size: 0.8em;
}
.post--down .user::after {
  content: ' ';
}
</style>