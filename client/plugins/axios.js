export default function ({ $axios, store }) {
  $axios.onRequest((config) => {
    const token = window.localStorage.getItem('token')
    config.headers.common['access-token'] = token
  })
}
