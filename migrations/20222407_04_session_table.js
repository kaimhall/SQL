const {DataTypes} = require('sequelize')

module.exports = {
  up: async ({context: queryInterface}) => {
    await queryInterface.createTable('session_data', {
      sid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      token: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    })
  },
  down: async ({context: queryInterface}) => {
    await queryInterface.dropTable('session_data')
  },
}
