module.exports = {
  userTransformer(users) {

    if(Array.isArray(users)){
      return users.map(v => {

        const slug = v.email.split('@')[0]
  
        return {_id: v._id, firstname: v.firstname, lastname: v.lastname, email: v.email, slug: slug, photos: v.photos}
      })
    }else{
      const slug = users.email.split('@')[0]
      return {_id: users._id, firstname: users.firstname, lastname: users.lastname, email: users.email, slug: slug, photos: users.photos}
    }

  }
}