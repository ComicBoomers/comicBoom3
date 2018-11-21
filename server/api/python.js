const router = require('express').Router()
const {PythonShell} = require('python-shell')
const path = require('path')
const fs = require('fs')

module.exports = router

global.XMLHttpRequest = require('xhr2')

// const firebase = require('firebase')
// require('firebase/storage')
// const config = {
//   apiKey: process.env.FIREBASE_APIKEY,
//   authDomain: 'comic-server.firebaseapp.com',
//   databaseURL: 'https://comic-server.firebaseio.com',
//   storageBucket: 'comic-server.appspot.com'
// }
// firebase.initializeApp(config)
const {firebase} = require('./upload')
const storage = firebase.storage()
const storageRef = storage.ref()

router.get('/creategifs', async (req, res) => {
  try {
    console.log('hit the creategifs')
    const options = {
      mode: 'text',
      pythonPath: '/usr/local/bin/python',
      pythonOptions: ['-u'],
      scriptPath: path.join(__dirname, '/../../python'),
      args: [
        './tmp/temp.mov',
        './tmp/temp.gif',
        './stickers/comicframesh.png',
        './stickers/bubble.png'
      ]
    }
    PythonShell.run('creategifs.py', options, function(err, data) {
      if (err) {
        console.log(err)
      } else {
        console.log('inside pythonshell', data)
        fs.readFile('./tmp/temp.gif', function(err, contents) {
          if (err) {
            console.log(err)
          }
          storageRef
            .child(`strawberrytest.gif`)
            .put(contents, {contentType: 'image/gif'})
            .then(() => console.log('this worked! :*'))
            .catch(e => console.log('oh no!!! :(', e))
        })
      }
    })
    console.log('outside pythonshell hello')
    res.send('hello')
  } catch (err) {
    console.log(err)
  }
})
