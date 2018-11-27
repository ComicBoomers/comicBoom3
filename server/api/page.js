const router = require('express').Router()
const {User, Page} = require('../db/models')
module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    if (req.user) {
      const page = await Page.findById(req.params.id)
      res.json(page)
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    console.log(req.params.id)
    if (req.user.id) {
      const userId = req.user.id
      const pageToDelete = await Page.destroy({
        where: {id: req.params.id, userId}
      })
      if (pageToDelete > 0) {
        res.status(204).send()
      }
    }
    res.status(404).send()
  } catch (err) {
    next(err)
  }
})
