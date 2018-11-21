const router = require('express').Router()
const {User, Page, Sticker} = require('../db/models')
module.exports = router

// GET /pages
router.get('/stickers', async (req, res, next) => {
  try {
    const stickers = await Sticker.findAll()
    console.log(stickers)
    res.json(stickers)
  } catch (err) {
    next(err)
  }
})
