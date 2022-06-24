const {Model, DataTypes} = require('sequelize')
const {sequelize} = require('../utils/db.js')

class Blog extends Model {}
Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    year: {
      type: DataTypes.INTEGER,
      validate: {
        isBetween(val) {
          if (parseInt(val) < 1991 || parseInt(val) > 2022) {
            throw new Error('year out of range.')
          }
        },
      },
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelname: 'blog',
  }
)
module.exports = Blog
