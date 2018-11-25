// const router = require('express').Router()
// const {PythonShell} = require('python-shell')
// const path = require('path')
// const fs = require('fs')
// const fsExtra = require('fs-extra')
// const uuidv4 = require('uuid/v4')
// module.exports = router

// const firebase = require('./firebase')
// const storage = firebase.storage()
// const storageRef = storage.ref()

// router.get('/creategifs', async (req, res, next) => {
//   try {
//     const userId = req.user.id
//     const gifId = uuidv4()
//     let gifPath = `tmp/gifs//${userId}`
//     fsExtra.mkdirsSync(gifPath)
//     const options = {
//       /* comment out the code below before deployment */
//       mode: 'text',
//       pythonPath: '/usr/local/bin/python',
//       pythonOptions: ['-u'],
//       /* comment out the code above before deployment */
//       scriptPath: path.join(__dirname, '/../../python'),
//       args: [
//         `./tmp/uploads/${userId}/temp.mov`,
//         `./${gifPath}/temp.gif`,
//         './stickers/comicframesh.png',
//         './stickers/bubble.png'
//       ]
//     }
//     PythonShell.run('creategifs.py', options, function(err, data) {
//       if (err) {
//         next(err)
//       } else {
//         fs.readFile(`./tmp/gifs/${userId}/temp.gif`, function(err, contents) {
//           if (err) {
//             next(err)
//           }
//           storageRef
//             .child(`gif/${req.user.id}/${gifId}.gif`)
//             .put(contents, {contentType: 'image/gif'})
//             .then(() => console.log('this worked! :*'))
//             .catch(e => console.log('oh no!!! :(', e))
//         })
//       }
//     })
//     res.status(200).send()
//   } catch (err) {
//     console.log(err)
//   }
// })
