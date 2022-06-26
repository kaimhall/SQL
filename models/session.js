const {Model, DataTypes} = require('sequelize')

const {sequelize} = require('../utils/db')

class SessionData extends Model {}

SessionData.init(
  {
    sid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'SessionData',
  }
)
module.exports = SessionData
