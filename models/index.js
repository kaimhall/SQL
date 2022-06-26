const Blog = require('./blogs')
const User = require('./user')
const UserReading = require('./user_reading')
const SessionData = require('./session')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, {through: UserReading, as: 'readings'})
Blog.belongsToMany(User, {through: UserReading, as: 'saved'})

module.exports = {
  Blog,
  User,
  UserReading,
  SessionData,
}
