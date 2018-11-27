const firebase = require('firebase')
require('firebase/storage')
module.exports = firebase

global.XMLHttpRequest = require('xhr2')

const config = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.FIREBASE_DATABASEURL,
  storageBucket: process.env.STORAGE_BUCKET
}
firebase.initializeApp(config)
