<template>
  <div>
    <input
      v-model="text"
      type="text"
      placeholder="Search For Friends"
      @keydown.enter="search"
    />
    <div v-for="user in users" :key="user._id">
      <nuxt-link :to="`/people/${user.slug}`"
        >{{ user.firstname }} {{ user.lastname }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      text: '',
    }
  },
  methods: {
    search() {
      this.$axios
        .get('app/user/search', { params: { search: this.text } })
        .then((response) => {
          this.users = response.data.users
        })
    },
  },
}
</script>
