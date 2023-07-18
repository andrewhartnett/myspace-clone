const ACCESS_KEY = process.env.ACCESS_KEY
const SECRET = process.env.AWS_ACCESS_SECRET
const AWS = require('aws-sdk');

module.exports = {

  getClient() {
    return new AWS.S3({
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET,
    })
  },
  async upload(filename, file) {
    const params = {
      Bucket: 'ahartnett-myspace',
      Key: filename,
      Body: file,
      ACL: 'public-read',
    }

    const S3 = this.getClient()

    return await S3.upload(params).promise()
  }

}
