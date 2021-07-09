<template>
  <div class="container">
    <div>
      <h1 class="text-lg">Myspace</h1>
      <div>
        {{ responseFromApi }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      responseFromApi: '',
    }
  },
  created() {
    this.$axios.get('/').then((response) => {
      this.responseFromApi = response.data
    })
  },
}
</script>
