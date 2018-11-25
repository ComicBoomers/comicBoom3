const express = require('express')
const router = express.Router()
const fs = require('fs')
const fsExtra = require('fs-extra')
const multer = require('multer')
module.exports = router

const firebase = require('./firebase')
const storage = firebase.storage()
const storageRef = storage.ref()

let upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      let userId = req.user.id
      let path = `tmp/uploads//${userId}`
      fsExtra.mkdirsSync(path)
      callback(null, path)
    },
    filename: (req, file, callback) => {
      callback(null, 'temp.mov')
    }
  })
}).single('video')

router.post('/', upload, (req, res, next) => {
  try {
    fs.readFile(req.file.path, function(err, contents) {
      if (err) {
        next(err)
      }
      storageRef
        .child(`video/${req.user.id}/${req.file.originalname}`)
        .put(contents, {contentType: req.file.mimetype})
        .then(() => console.log('this worked! :*'))
        .catch(e => console.log('oh no!!! :(', e))
    })
    res.status(200).send()
  } catch (err) {
    next(err)
  }
})
