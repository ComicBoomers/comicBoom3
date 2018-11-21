const express = require('express')
const router = express.Router()
const html = require('html-template-tag')
const fs = require('fs')
const multer = require('multer')

const multStorage = multer.diskStorage({
  destination: 'tmp/',
  filename: function(req, file, cb) {
    cb(null, 'temp.mov')
  }
})
const upload = multer({storage: multStorage}).single('file')

global.XMLHttpRequest = require('xhr2')

const firebase = require('firebase')
require('firebase/storage')
const config = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: 'comic-server.firebaseapp.com',
  databaseURL: 'https://comic-server.firebaseio.com',
  storageBucket: 'comic-server.appspot.com'
}
firebase.initializeApp(config)
const storage = firebase.storage()
const storageRef = storage.ref()

router.get('/', function(req, res, next) {
  res.send(html`
    <h1>Hello!</h1>
    <form action="/api/upload" method="post" enctype="multipart/form-data">
      <input type="file" id="file" name="file" />
      <input type="submit" value="Upload" />
    </form>
  `)
})

router.post('/', upload, (req, res, next) => {
  try {
    fs.readFile(req.file.path, function(err, contents) {
      if (err) {
        console.log(err)
      }
      storageRef
        .child(req.file.originalname)
        .put(contents, {contentType: req.file.mimetype})
        .then(() => console.log('this worked! :*'))
        .catch(e => console.log('oh no!!! :(', e))
    })
    res.send('hello')
  } catch (err) {
    console.log('ERROR: ', err)
    next(err)
  }
})

module.exports = {router, firebase}
