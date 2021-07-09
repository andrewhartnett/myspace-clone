<template>
  <div>
    <div class="flex mb-6">
      <h1 class="mr-4">{{ slugUser.firstname }} {{ slugUser.lastname }}</h1>
      <button
        v-if="!canEdit"
        v-show="!slugUser.friend"
        @click.prevent="addFriend"
      >
        Add Friend
      </button>
      <button
        v-if="!canEdit"
        v-show="slugUser.friend"
        @click.prevent="removeFriend"
      >
        Remove Friend
      </button>
    </div>
    <div class="flex">
      <div class="border border-black block" style="width: 200px">
        <div v-if="slugUser.photos.length" class="w-full">
          <img :src="slugUser.photos[0].src" />
        </div>
        <div v-else>No Photos</div>
        <div class="pl-2">
          View My:
          <nuxt-link
            :to="`/photos/${slugUser.slug}`"
            class="text-blue-800 hover:underline"
            >Pics
          </nuxt-link>
        </div>
      </div>
      <div class="mx-8" style="width: 360px">
        Top 8
        <nuxt-link :to="`/friends/${slugUser.slug}`">View Friends</nuxt-link>
        <FriendSearch v-if="canEdit" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'app',
  async asyncData({ params, redirect, $axios }) {
    const result = await $axios.get(`/app/user/${params.slug}`)
    return {
      slugUser: { ...result.data.user },
    }
  },
  computed: {
    ...mapGetters('user', ['user']),
    canEdit() {
      return this.slugUser._id === this.user._id
    },
  },
  methods: {
    addFriend() {
      this.$axios.post('/app/friend', { userId: this.slugUser._id })
      this.user.friend = true
    },
    removeFriend() {
      this.$axios.delete('/app/friend', {
        params: { userId: this.slugUser._id },
      })
      this.user.friend = false
    },
  },
}
</script>
