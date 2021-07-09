<template>
  <div class="container">
    <div>
      <h1 class="mb-4">Create an Account</h1>

      <form class="w-50">
        <div class="my-2">
          <label for="email">Email</label>
          <input v-model="user.email" type="text" class="w-full" />
        </div>
        <div class="my-2">
          <label for="email">First Name</label>
          <input v-model="user.firstname" type="text" class="w-full" />
        </div>
        <div class="my-2">
          <label for="email">Last Name</label>
          <input v-model="user.lastname" type="text" class="w-full" />
        </div>
        <div class="my-2">
          <label for="email">Password</label>
          <input v-model="user.password" type="password" class="w-full" />
        </div>
        <div class="my-2">
          <label for="email">Repeat Password</label>
          <input v-model="user.password2" type="password" class="w-full" />
        </div>
        <div class="flex justify-between m-4">
          <button class="primary" @click.prevent="create">Create</button>
          <nuxt-link to="login" class="block bg-gray-300 p-2 hover:bg-gray-500"
            >Back to Login</nuxt-link
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
      user: {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        password2: '',
      },
    }
  },
  methods: {
    create() {
      // Quick and dirty reduce method which returns true if all fields are filled out, false if not
      const hasRequiredFields = Object.keys(this.user).reduce((c, v) => {
        if (c === false) {
          return false
        }
        return !!this.user[v].length
      }, null)

      if (!hasRequiredFields) {
        this.$toast.error('Required fields missing')
        return
      }

      if (this.user.password !== this.user.password2) {
        this.$toast.error('Passwords must match')
        return
      }

      this.$axios
        .post('/user', { user: this.user })
        .then((response) => {
          this.$store.commit('user/setUser', response.data.user)
          this.$store.commit('user/setToken', response.data.token)
          this.$toast.success('User Created Successfully')
          return this.$router.push('profile')
        })
        .catch((err) => {
          this.$toast.error('Something went wrong')
          console.log(err)
        })
    },
  },
}
</script>
