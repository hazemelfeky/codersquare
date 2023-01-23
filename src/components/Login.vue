<template lang="">
  <div class="login-container">
    <v-form v-if="!user?.username" v-model="valid" @submit.prevent="handleSubmit">
      <v-container>
        <v-row>
          <v-text-field
            v-model="form.emailOrUsername"
            :rules="passwordRules"
            label="User name"
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
  </div>
</template>
<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
  name: "Log-In",
  data() {
    return {
      form: {
        emailOrUsername: "",
        password: "",
      },
      valid: false,
      passwordRules: [
        v => !!v || 'This field is required',
      ],
    }
  },
  computed: {
    ...mapState({
      user: state => state.user,
    })
  },
  methods: {
    async handleSubmit() {
      axios.post('users/login', this.form)
        .then( res => {
          console.log(res);
          localStorage.setItem('token', res.data.token)
          this.$store.dispatch('setToken', res.data.token)
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