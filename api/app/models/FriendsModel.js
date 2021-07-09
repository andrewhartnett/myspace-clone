const mongoose = require('mongoose')
const {Schema} = require('mongoose');

const schema = {
  user1: {
    type: Schema.Types.ObjectId,
    required: true
  },
  user2: {
    type: Schema.Types.ObjectId,
    required: true
  },
  messages: {
    type: Array,
    required: false,
    default: []
  }
}

const FriendSchema = new mongoose.Schema(schema, {timestamps: true})

FriendSchema.pre('save', async function (next) {

  const userArray = [this.user1, this.user2]

  const duplicate = await mongoose.model('Friends', FriendSchema).findOne({ user1: { $in: userArray }, user2: {$in: userArray} })

  if(duplicate) return next(new Error('Duplicate Friendship'))

  return next()
})

module.exports = mongoose.model('Friends', FriendSchema)

