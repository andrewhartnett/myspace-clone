<template>
  <div>
    <div class="flex">
      <img
        v-for="(photo, k) in slugUser.photos"
        :key="k"
        style="width: 200px"
        class="m-4"
        :src="photo.src"
      />
    </div>
    <div v-if="canEdit">
      <form enctype="multipart/form-data">
        <input
          ref="fileInput"
          class="hidden"
          type="file"
          accept="image/*"
          @change="uploadPhoto"
        />
        <button @click.prevent="$refs.fileInput.click()">
          Upload New Photo
        </button>
        <nuxt-link :to="`/people/${slugUser.slug}`">Back</nuxt-link>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'app',
  async asyncData({ params, $axios }) {
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
    uploadPhoto(e) {
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append('file', file)
      const vm = this

      this.$axios
        .post('/app/user/photo', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(function (response) {
          vm.$toast.success('Photo Uploaded')

          vm.$axios.get('/app/user').then((response) => {
            vm.$store.commit('user/setUser', response.data.user)
          })
        })
        .catch(function (err) {
          console.log(err)
        })
    },
  },
}
</script>
