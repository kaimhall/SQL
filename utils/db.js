const Sequelize = require('sequelize')
const { DATABASE_URL } = require('./config')
const log = require('./logger')

const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
})

const DBConnect = async () => {
  try {
    await sequelize.authenticate()
    log.info('connected to the database')
  } catch (err) {
    log.error('failed to connect to the database: ', err)
    return process.exit(1)
  }
  return null
}
module.exports = { DBConnect, sequelize }
