<template lang="">
  <div class="post">
    <v-form v-model="valid" @submit.prevent="handleSubmit">
      <v-container>
        <v-row>
          <v-text-field
            v-model="title"
            :rules="requiredRules"
            label="Title"
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
  data() {
    return {
      valid: false,
      title: "",
      requiredRules: [
        v => !!v || 'This field is required',
      ],
    }
  },
  computed: {
    ...mapState({
      token: state => state.token,
    })
  },
  methods: {
    async handleSubmit() {
      axios.post('posts', { userId: this.userId, title: this.title })
        .then( res => {
          console.log(res);
          console.log('created successfully');
          this.$store.dispatch('getPosts')
          this.title = ''
        })
        .catch( err => {
          console.log(err);
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