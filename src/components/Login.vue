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
  // aa@aa.aa 123456789aA@
  methods: {
    async handleSubmit() {
      try {
        const res = await axios.post('users/login', this.form)
        this.$store.dispatch('setToken', res.data.token)
        this.$store.dispatch('setUserId', res.data.user.id)
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('userId', res.data.user.id)
        this.$router.push("/")
      } catch (err) {
        this.$store.dispatch('setSnack', { value: true, message: err.response.data.msg })
      }
    },
  }
}
</script>
<style>
.login-container {
  width: 60%;
  margin: 0 auto;
}
</style>