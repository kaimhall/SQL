const Blog = require('./blogs')
const User = require('./user')
const UserReading = require('./user_reading')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, {through: UserReading, as: 'unread_blogs'})
Blog.belongsToMany(User, {through: UserReading, as: 'user_added'})

module.exports = {
  Blog,
  User,
  UserReading,
}
