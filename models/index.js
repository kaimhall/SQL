const Blog = require('./blogs')
const User = require('./user')

User.hasMany(Blog)
Blog.belongsTo(User)

module.exports = {
  Blog, User
}