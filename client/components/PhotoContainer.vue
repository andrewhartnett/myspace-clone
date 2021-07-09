<template>
  <div>
    <div
      v-show="!user.photos.length"
      class="border border-black block flex justify-center items-center"
      style="width: 200px; height: 200px"
    >
      <nuxt-link
        v-if="editable"
        to="photos"
        href="#"
        class="text-blue-800 hover:underline"
      >
        + Manage Photos</nuxt-link
      >
    </div>
    <div
      v-show="user.photos.length"
      class="border border-black block"
      style="width: 200px"
    >
      <div class="w-full">
        <img :src="user.photos[0].src" />
      </div>
      <div class="pl-2">
        View My:
        <nuxt-link to="photos" href="#" class="text-blue-800 hover:underline"
          >Pics</nuxt-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    editable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters('user', ['user']),
  },
}
</script>
