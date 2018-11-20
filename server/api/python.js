const router = require('express').Router()
//const {PythonShell} = require('python-shell')
const fs = require('fs')

module.exports = router

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

let gifCount = 0

router.get('/creategifs', async (req, res) => {
  try {
    const {spawn} = require('child_process')
    const pyprog = spawn('python', [
      '../../python/creategifs.py',
      `../../tmp/temp.mov`,
      `../../tmp/temp.gif`,
      `../../stickers/comicframesh.png`,
      `../../stickers/bubble.png`
    ])
    pyprog.stdout.on('data', data => {
      fs.readFile('../../tmp/temp.gif', function(err, contents) {
        if (err) {
          console.log(err)
        }
        storageRef
          .child(`${gifCount}test.gif`)
          .put(contents, {contentType: 'image/gif'})
          .then(() => console.log('this worked! :*'))
          .catch(e => console.log('oh no!!! :(', e))
      })
      res.send('hello')
    })
  } catch (err) {
    console.log(err)
  }
})

// router.get('/creategifs', callCreateGifs)

// function callCreateGifs(req, res) {
//   const options = {
//     mode: 'text',
//     pythonPath: '/usr/local/bin/python',
//     pythonOptions: ['-u'],
//     scriptPath: '/Users/hystee/GH/funWithPy/',
//     args: [
//       `./${req.query.inputPath}`,
//       './gifs/test' + gifCount + '.gif',
//       `./${req.query.framesPath}`,
//       `./${req.query.stickerPath}`
//     ]
//   }
//   PythonShell.run('./creategifs.py', options, function(err, data) {
//     if (err) {
//       res.send(err)
//     } else {
//       gifCount++
//       console.log(data)
//       res.send(`${options.args[1].slice(2)}`)
//     }
//   })
// }

//http://localhost:3000/creategifs?inputPath=test.mov&outputPath=whateveryouwant.gif&framesPath=comicframesh.png&stickerPath=bubble.png
