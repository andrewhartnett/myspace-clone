<script>
export default {
  created() {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    this.$router.push('login')
  },
}
</script>
