export const state = () => ({
  user: {
    _id: '',
    slug: '',
    firstname: '',
    lastname: '',
    email: '',
    photos: [],
  },
  token: '',
})

export const getters = {
  user(state) {
    return state.user
  },
  getToken(state) {
    return state.token
  },
}

export const mutations = {
  resetFromStorage(state) {
    const storage = window.localStorage.getItem('user')

    const user = JSON.parse(storage)

    state.user = {
      _id: user._id,
      slug: user.slug,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      photos: user.photos,
    }

    const token = window.localStorage.getItem('token')

    state.token = token
  },
  setUser(state, payload) {
    window.localStorage.setItem('user', JSON.stringify(payload))
    state.user = { ...payload }
  },
  setToken(state, token) {
    console.log('Setting Token')
    window.localStorage.setItem('token', token)
    state.token = token
  },
  logout() {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('user')
  },
}
