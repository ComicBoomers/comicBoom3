const express = require('express')
const router = express.Router()
const fs = require('fs')
const fsExtra = require('fs-extra')
const multer = require('multer')
const {User, Page} = require('../db/models')
const {spawn} = require('child_process')
module.exports = router

const {PythonShell} = require('python-shell')
const path = require('path')
const uuidv4 = require('uuid/v4')

const firebase = require('./firebase')
const storage = firebase.storage()
const storageRef = storage.ref()

/* multer captures the data sent by user through the form */

const upload = multer({
  storage: multer.diskStorage({
    /* the file attached to formData is saved on the server in tmp directory under a folder based on user's Id */
    destination: (req, file, callback) => {
      const userId = req.user.id
      const vidPath = `public/tmp/uploads/${userId}`
      /* fsExtra creates that directory if it does not already exist */
      fsExtra.mkdirsSync(vidPath)
      callback(null, vidPath)
    },
    filename: (req, file, callback) => {
      /**/
      callback(null, 'temp.mov')
    }
  })
}).single('video')

// create temp gif
router.post('/', upload, (req, res, next) => {
  try {
    const userId = req.user.id
    const gifPath = `public/tmp/gifs/${userId}`
    fsExtra.mkdirsSync(gifPath)
    const options = {
      /* comment out the code below before deployment */
      mode: 'text',
      pythonPath: '/usr/local/bin/python',
      pythonOptions: ['-u'],
      /* comment out the code above before deployment */
      scriptPath: path.join(__dirname, '/../../python'),
      args: [`./public/tmp/uploads/${userId}/temp.mov`, `./${gifPath}/temp.gif`]
    }
    PythonShell.run('creategifs.py', options, function(err, data) {
      if (err) {
        next(err)
      } else {
        res.status(200).send()
      }
    })
  } catch (err) {
    console.log('ERROR: ', err.message)
    next(err)
  }
})
// attach sticker to gif and post to database

// $ curl -X PUT -H "Content-Type: application/json" -d '{"stickerId":"0","stickerX":"60", "stickerY":"60"}' http://localhost:8080/api/upload
router.put('/', async (req, res, next) => {
  try {
    const userId = req.user.id
    const gifId = uuidv4()
    const vidPath = `public/tmp/uploads/${userId}`
    const gifPath = `public/tmp/gifs/${userId}`
    // fsExtra.mkdirsSync(gifPath)
    const options = {
      /* comment out the code below before deployment */
      mode: 'text',
      pythonPath: '/usr/local/bin/python',
      pythonOptions: ['-u'],
      /* comment out the code above before deployment */
      scriptPath: path.join(__dirname, '/../../python'),
      args: [
        `./${vidPath}/temp.mov`,
        `./${gifPath}/temp.gif`,
        `./public/${req.body.stickerId}.png`,
        +req.body.stickerX,
        +req.body.stickerY
      ]
    }
    PythonShell.run('stickergifs.py', options, function(err, data) {
      if (err) {
        next(err)
      } else {
        fs.readFile(`./public/tmp/gifs/${userId}/temp.gif`, function(
          er,
          contents
        ) {
          if (er) {
            next(er)
          }
          const uploadTask = storageRef
            .child(`gif/${userId}/${gifId}.gif`)
            .put(contents, {contentType: 'image/gif'})
          uploadTask.on(
            'state_changed',
            function(snapshot) {
              // Observe state change events such as progress, pause, and resume
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              let progress =
                snapshot.bytesTransferred / snapshot.totalBytes * 100
              console.log('Upload is ' + progress + '% done')
              switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                  console.log('Upload is paused')
                  break
                case firebase.storage.TaskState.RUNNING: // or 'running'
                  console.log('Upload is running')
                  break
              }
            },
            function(error) {
              next(error)
            },
            function() {
              // Handle successful uploads on complete
              // For instance, get the download URL
              uploadTask.snapshot.ref
                .getDownloadURL()
                .then(function(downloadURL) {
                  console.log('File available at', downloadURL)
                  // add URL to User Page model
                  const newPage = Page.create({
                    location: downloadURL,
                    userId
                  }).then(() => res.status(200).send())
                  const rmVid = spawn('rm', [
                    path.join(
                      __dirname,
                      `../../public/tmp/uploads/${userId}/temp.mov`
                    )
                  ])
                  rmVid.stdout.on('data', dta => {
                    console.log(`stdout: ${dta}`)
                  })
                  rmVid.stderr.on('data', dta => {
                    console.log(`stderr: ${dta}`)
                  })
                  rmVid.on('close', code => {
                    console.log(`child process exited with code ${code}`)
                  })
                  const rmGif = spawn('rm', [
                    path.join(
                      __dirname,
                      `../../public/tmp/gifs/${userId}/temp.gif`
                    )
                  ])
                  rmGif.stdout.on('data', dta => {
                    console.log(`stdout: ${dta}`)
                  })
                  rmGif.stderr.on('data', dta => {
                    console.log(`stderr: ${dta}`)
                  })
                  rmGif.on('close', code => {
                    console.log(`child process exited with code ${code}`)
                  })
                })
            }
          )
        })
      }
    })
  } catch (err) {
    next(err)
  }
})
