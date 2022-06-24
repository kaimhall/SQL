const {Model, DataTypes} = require('sequelize')

const {sequelize} = require('../utils/db')

class UserReading extends Model {}

UserReading.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {model: 'users', key: 'id'},
    },
    blog_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {model: 'blogs', key: 'id'},
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'user_reading',
  }
)
module.exports = UserReading
