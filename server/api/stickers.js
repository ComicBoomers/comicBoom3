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
