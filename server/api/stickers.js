const router = require('express').Router()
const {User, Page, Sticker} = require('../db/models')
module.exports = router

// GET /stickers
router.get('/', async (req, res, next) => {
  try {
    const stickers = await Sticker.findAll()
    console.log(stickers)
    res.json(stickers)
  } catch (err) {
    next(err)
  }
})

// GET /stickers/:stickerId
router.get('/:stickerId', async (req, res, next) => {
  try {
    const sticker = await Sticker.findById(+req.params.stickerId)
    console.log("sticker:", sticker)
    res.json(sticker)
  } catch (err) {
    next(err)
  }
})
