<template>
  <nav class="flex w-full justify-between bg-blue-400 mb-4">
    <nuxt-link class="p-4 text-white hover:bg-blue-600 text-xl" to="/home"
      >MySpace Clone</nuxt-link
    >
    <div class="flex">
      <nuxt-link
        class="px-4 pt-6 pb-4 text-white hover:bg-blue-600"
        :to="`/people/${user.slug}`"
        >Profile</nuxt-link
      >

      <nuxt-link
        class="px-4 pt-6 pb-4 text-white hover:bg-blue-600"
        to="/logout"
        >Logout</nuxt-link
      >
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('user', ['user']),
  },
}
</script>
