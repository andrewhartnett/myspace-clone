const mongoose = require('mongoose')

const schema = {
  email: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  photos: {
    type: Array,
    required: false,
    default: []
  },
  top8: {
    type: Array,
    required: false,
    default: []
  }
}

const UserSchema = new mongoose.Schema(schema, {timestamps: true})

UserSchema.pre('save', async function (next) {
  const duplicate = await mongoose.model('User', UserSchema).findOne({email: this.email.toLowerCase()})

  if(duplicate) return next(new Error('Email already exists'))

  return next()
})

module.exports = mongoose.model('User', UserSchema)

