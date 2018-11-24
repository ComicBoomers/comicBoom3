const router = require('express').Router()
const {User, Page} = require('../db/models')
module.exports = router

// GET /user
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email'],
      // include: {all: true}
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// GET /user/:userId (includes associated Page locations)
router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.userId
      }, include: [{model: Page}],
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})

//theoretically allows an admin to destroy a user allong with associated pages
//check that ', include: [{model: Page}]' works the way expected
//currently no admin...no userType
router.delete('/', async (req, res, next) => {
  if(!req.user || req.user.UserType !== 'admin') {
    const error = new Error("Action not permitted");
    console.error(error)
    res.status(403).send("Action forbidden")
  } else if (req.user.UserType === 'admin') {
    try {
      await User.destroy({
        where: {
          id: req.body.id
        }, include: [{model: Page}]
      });
      res.json({ deletedUser: req.body.id})
    } catch (err) {
      next(err)
    }
  }
})

//currently is designed to change user status to admin but can be repurposed as needed
//currently no admin...no userType
router.put('/', async (req, res, next) => {
  if(!req.user || req.user.UserType !== 'admin') {
    const error = new Error("Action not permitted");
    console.error(error)
    res.status(403).send("Action forbidden")
  } else if (req.user.UserType === 'admin') {
    try {
      let user = await User.findById(req.body.id)
      await user.update({
        UserType: 'admin'
      })
      res.json({ updatedUser: req.body.id})
    } catch (err) {
      next(err)
    }
  }
})
