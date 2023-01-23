<template lang="">
  <div class="login-container">
    <v-form v-if="!user?.username" v-model="valid" @submit.prevent="handleSubmit">
      <v-container>
        <v-row>
          <v-text-field
            v-model="form.name"
            :rules="passwordRules"
            label="Name"
            required
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            v-model="form.username"
            :rules="passwordRules"
            label="User name"
            required
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            v-model="form.email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            v-model="form.password"
            :rules="passwordRules"
            type="password"
            label="Password"
            required
          ></v-text-field>
        </v-row>
        <v-row justify="center">
          <v-btn
            class="mr-4"
            type="submit"
            :disabled="!valid"
          >
            submit
          </v-btn>
        </v-row>
      </v-container>
    </v-form>
    <v-btn
      class="mr-4"
      type="submit"
      v-else
      @click="handleLogout"
    >
      logout
    </v-btn>
  </div>
</template>
<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
  name: "Sign-Up",
  data() {
    return {
      form: {
        email: "",
        password: "",
        name: "",
        username: "",
      },
      valid: false,
      passwordRules: [
        v => !!v || 'This field is required',
      ],
      emailRules: [
        v => !!v || 'This field is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      // user: null
    }
  },
  computed: {
    ...mapState({
      user: state => state.user,
      // username: localStorage.getItem('username')
    })
  },
  methods: {
    async handleSubmit() {
      axios.post('users/signup', this.form)
        .then( res => {
          console.log(res);
          localStorage.setItem('token', res.data.token)
          // localStorage.setItem('username', res.data.createdUser.username)
          // this.$store.dispatch('setUser', res.data.createdUser)
          this.$router.push('/')
        })
        .catch( err => {
          console.dir(err);
        })
    },
    handleLogout() {
      localStorage.clear()
      this.$store.dispatch('setUser', {})
    }
  }
}
</script>
<style>
.login-container {
  width: 60%;
  margin: 0 auto;
}
</style>