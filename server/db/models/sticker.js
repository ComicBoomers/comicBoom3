const Sequelize = require('sequelize')
const db = require('../db')

const Sticker = db.define('sticker', {
  location: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  }

})

module.exports = Sticker
