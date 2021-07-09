const factory = require('factory-girl').factory
const faker = require('faker')
const UserModel = require('../models/UserModel')

factory.define('user', UserModel, () => {
  return {
    email: faker.internet.email(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    password: faker.internet.password(),
    photos: [],
    top8: []
  }
})

module.exports = factory