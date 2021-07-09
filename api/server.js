const express = require('express')
var app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const busboy = require('connect-busboy')

var mongoDB = 'mongodb://mongo:27017/myspace'

const mongoConfig = {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}

mongoose.connect(mongoDB, mongoConfig)

app.use(cors())
app.use(express.json())
app.use(busboy())

// Regsiter the routes
app.use(require('./routes'))
app.use(require('./app/middleware/user'))
app.use('/app', require('./app/routes'))


// Not to confuse, but the app serves port 8080, and docker maps that to 3000
// This is located in the docker-compose.yml file
app.listen(8080, () => {
  console.log(`API RUNNING ON http://localhost:3000`)
})