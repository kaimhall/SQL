const {DataTypes} = require('sequelize')

module.exports = {
  up: async ({context: queryInterface}) => {
    await queryInterface.addColumn('blogs', 'read', {
      type: DataTypes.BOOLEAN,
      default: false,
    })
  },
  down: async ({context: queryInterface}) => {
    await queryInterface.removeColumn('blogs', 'read')
  },
}
