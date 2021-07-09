<template>
  <div class="container">
    <div>
      <h1>MySpace Clone Login</h1>

      <form class="w-50">
        <div class="my-2">
          <label for="email">Email</label>
          <input v-model="email" type="text" name="email" class="w-full" />
        </div>
        <div class="my-2">
          <label for="email">Password</label>
          <input
            v-model="password"
            type="password"
            name="password"
            class="w-full"
          />
        </div>
        <div class="flex justify-between m-4">
          <button class="primary" @click.prevent="login">Login</button>
          <nuxt-link
            to="create-account"
            class="block bg-gray-300 p-2 hover:bg-gray-500"
            >Create Account</nuxt-link
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    login() {
      this.$axios
        .post('/login', { email: this.email, password: this.password })
        .then((response) => {
          this.$store.commit('user/setUser', response.data.user)
          this.$store.commit('user/setToken', response.data.token)
          this.$toast.success('Login Successful')
          console.log(response.data.user.slug)
          this.$router.push(`people/${response.data.user.slug}`)
        })
        .catch((err) => {
          this.$toast.show({
            type: 'danger',
            title: 'Error',
            message: err.message,
          })
        })
    },
  },
}
</script>
