const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/upload', require('./upload'))
router.use('/stickers', require('./stickers'))
router.use('/page', require('./page'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
