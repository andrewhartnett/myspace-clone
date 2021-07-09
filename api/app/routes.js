const route = require('express').Router()
const UserController = require('./controllers/UserController')

route.post('/user/photo', UserController.uploadPhoto)
route.get('/user', UserController.show)
route.get('/user/search', UserController.search)
route.get('/user/:slug', UserController.showBySlug)

route.post('/friend', UserController.addFriend)
route.delete('/friend', UserController.removeFriend)
route.get('/friends/:slug', UserController.getFriends)

module.exports = route