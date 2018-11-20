const Sequelize = require('sequelize')
const db = require('../db')

const Page = db.define('page', {
  location: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  }

})

module.exports = Page
