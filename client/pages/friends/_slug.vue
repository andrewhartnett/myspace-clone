<template>
  <div>
    <h1 class="mb-8">
      Friends of {{ slugUser.firstname }} {{ slugUser.lastname }}
    </h1>
    <nuxt-link
      v-for="friend in friends"
      :key="friend._id"
      :to="`/people/${friend.slug}`"
      class="flex border border-l-0 border-r-0 border-gray-300"
    >
      <img
        v-if="friend.photos.length"
        :src="friend.photos[0].src"
        style="height: 100px; width: 100px"
      />
      <div
        v-else
        style="height: 100px; width: 100px"
        class="border border-black"
      >
        No Photos
      </div>
      <div class="block py-8 px-4">
        {{ friend.firstname }} {{ friend.lastname }}
      </div>
      <div v-if="canMessage" class="block py-8 px-4">Message</div>
    </nuxt-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'app',
  async asyncData({ params, redirect, $axios }) {
    const result = await $axios.get(`/app/friends/${params.slug}`)
    return {
      friends: { ...result.data.friends },
      slugUser: { ...result.data.user },
    }
  },
  computed: {
    ...mapGetters('user', ['user']),
    canMessage() {
      return this.slugUser._id === this.user._id
    },
  },
}
</script>
