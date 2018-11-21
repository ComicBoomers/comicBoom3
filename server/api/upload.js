const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');


global.XMLHttpRequest = require('xhr2');

const multStorage = multer.diskStorage({
  destination: 'tmp/',
  filename: function(req, file, cb) {
    cb(null, 'temp.mov')
  }
})

const upload = multer({storage: multStorage}).single('video')

const firebase = require('firebase');
require('firebase/storage');

const config = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: 'comic-server.firebaseapp.com',
  databaseURL: 'https://comic-server.firebaseio.com',
  storageBucket: 'comic-server.appspot.com',
};
firebase.initializeApp(config);
const storage = firebase.storage();
const storageRef = storage.ref();


router.post('/', upload, (req, res, next) => {
  try {
    fs.readFile(req.file.path, function(err, contents) {
      if (err) {
        console.log(err.message);
      }
      storageRef
        .child(req.file.originalname)
        .put(contents, { contentType: req.file.mimetype })
        .then(() => console.log('this worked! :*'))
        .catch(e => console.log('oh no!!! :(', e));
    });
    res.send('hello');
  } catch (err) {
    console.log('ERROR: ', err.message);
    next(err);
  }
});

module.exports = {router, firebase}
