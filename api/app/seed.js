const { seed } = require('faker')
const userFactory = require('./factories/userFactory')

module.exports = {
  async seed() {
    for (let i = 0; i < 3; i++) {
  
      const user = await userFactory.create('user')
      console.log(user.firstname, user.lastname)
    
    }
  }
}
