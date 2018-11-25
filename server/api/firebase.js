const firebase = require('firebase')
require('firebase/storage')
module.exports = firebase

global.XMLHttpRequest = require('xhr2')

const config = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: 'comic-server.firebaseapp.com',
  databaseURL: 'https://comic-server.firebaseio.com',
  storageBucket: 'comic-server.appspot.com'
}
firebase.initializeApp(config)


