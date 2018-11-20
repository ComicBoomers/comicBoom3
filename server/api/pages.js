const router = require('express').Router()
const {User, Page, Sticker} = require('../db/models')
module.exports = router

// GET /pages/stickers
router.get('/stickers', async (req, res, next) => {
  try {
    const stickers = await Sticker.findAll()
    res.json(stickers)
  } catch (err) {
    next(err)
  }
})
