const UserModel = require('../models/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret = 'MYSECRET'
const S3 = require('../utils/S3')
const FriendsModel = require('../models/FriendsModel')
const { ObjectId } = require('mongodb');
const { userTransformer } = require('../transformers')

module.exports = {
  async login(req, res) {
    try{
      // Find user by email
      const user = await UserModel.findOne({email: req.body.email.toLowerCase()})

      if(!user) {
        throw new Error('Invalid Login')
      }

      // Compare passwords
      const valid = await bcrypt.compareSync(req.body.password, user.password)

      if(!valid) {
        throw new Error('Invalid Login')
      }

      const token = jwt.sign({id: user._id}, secret)

      return res.status(200).json({user: userTransformer(user), token})

    } catch(err) {

      return res.status(404).json({message: 'Invalid Login'})

    }
  },
  async create(req, res) {
    const saltRounds = 10

    const hash = await bcrypt.hashSync(req.body.user.password, saltRounds)

    const user = await UserModel.create({
      email: req.body.user.email,
      firstname: req.body.user.firstname,
      lastname: req.body.user.lastname,
      password: hash
    })

    const token = jwt.sign({id: user._id}, secret)

    return res.status(200).json({success: true, user, token})
  },
  async show(req, res) {
    return res.status(200).json({user: req.user})
  },
  async showBySlug(req, res) {

    const rx = new RegExp(`${req.params.slug}@`)
    // Find User By Slug
    const user = await UserModel.findOne({ email: {$regex: rx} })
    

    const transformedUser = userTransformer(user)

    // Check if friend
    const friend = await FriendsModel.findOne({user1: {$in: [req.user._id, user._id]}, user2: {$in: [req.user._id, user._id]}})

    transformedUser.friend = !!friend

    return res.status(200).json({
      user: transformedUser
    })
    // Return user
  },
  async search(req, res) {
    const search = new RegExp(req.body.search, 'i')

    const users = await UserModel.find({firstname: search}, {firstname: 1, lastname: 1, email: 1})

    const transformedUsers = userTransformer(users)

    return res.status(200).json({
      users: transformedUsers
    })
  },
  async uploadPhoto(req, res) {
    const chunks = []
    let key = ''

    req.busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      key = req.user._id + '/' + filename;
      console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);

      file.on('data', function(data) {
        // you will get chunks here will pull all chunk to an array and later concat it.
        console.log (chunks.length);
        chunks.push(data)
      });

      file.on('end', function() {
        // you will get chunks here will pull all chunk to an array and later concat it.
        console.log('File [' + filename + '] Finished');
      });
    })

    req.busboy.on('finish', async () => {
      const result = await S3.upload(key, Buffer.concat(chunks))
      
      await UserModel.updateOne({_id: req.user._id}, { $push: { photos: {
        src: result.Location,
        profilePic: false
      } }})

      return res.status(200).json({})
    })
    
    req.pipe(req.busboy)
    // S3.upload('firstPhone.jpg', res.body.file)

  },
  async addFriend(req, res) {
    await FriendsModel.create({
      user1: req.user._id,
      user2: ObjectId(req.body.userId)
    })

    return res.status(200).json({success: true})
  },
  async removeFriend(req,res){
    const lookup = [req.user._id, req.body.userId]
    console.log('lookup', lookup)
    const result = await FriendsModel.deleteOne({ user1: {$in: lookup}, user2: {$in: lookup} })
    console.log(result)

    return res.status(200).json({success: true})
  },
  async getFriends(req, res){

    const rx = new RegExp(`${req.params.slug}@`)
    // Find User By Slug
    const user = await UserModel.findOne({ email: {$regex: rx} })

    const friends = await FriendsModel.find({ $or: [{user1: user._id}, {user2: user._id}]})
    const userIds = friends.map(v => {
      if(v.user1.toString() === user._id.toString()){
        return v.user2
      }

      return v.user1
    })

    const users = await UserModel.find({_id: {$in: userIds}})

    return res.status(200).json({
      friends: userTransformer(users),
      user: userTransformer(user),
    })
  },
  async myFriends(req, res){
    const friends = await FriendsModel.find({ $or: [{user1: req.user._id}, {user2: req.user._id}]})

    const userIds = friends.map(v => {
      if(v.user1 === req.user._id){
        return v.user2
      }else{
        return v.user1
      }
    })

    const users = await UserModel.find({_id: {$in: userIds}})

    return res.status(200).json({
      users: users
    })
  },
  async getMessages(req, res) {
    const friend = await UserModel.findOne({_id: ObjectId(req.body.userId)})
    const userArray = [req.user._id, friend._id]
    const friendship = await FriendsModel.findOne({ user1: { $in: userArray }, user2: {$in: userArray} })

    const messages = friendship.messages.map(v => {
      let name = ''
      if(v.userId == req.user._id){
        // User is the author
        name = req.user.firstname
      }else{
        // Friend is the author
        name = friend.firstname
      }

      return {
        userId: v.userId,
        name: name,
        message: v.message
      }
    })

    return res.status(200).json({
      messages: messages
    })
  },
  async storeMessage(req, res) {
    const friend = await UserModel.findOne({_id: ObjectId(req.body.userId)})
    const userArray = [req.user._id, friend._id]

    const newMessage = {
      userId: req.user._id,
      message: req.body.message
    }

    await FriendsModel.updateOne({ user1: { $in: userArray }, user2: {$in: userArray} }, { messages: {$push: newMessage}})

    return res.status(200).json({success: true})
  }
}