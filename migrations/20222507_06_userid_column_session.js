const {DataTypes} = require('sequelize')

module.exports = {
  up: async ({context: queryInterface}) => {
    await queryInterface.addColumn('session_data', 'user_id', {
      type: DataTypes.INTEGER,
    })
  },
  down: async ({context: queryInterface}) => {
    await queryInterface.removeColumn('session_data', 'user_id')
  },
}
