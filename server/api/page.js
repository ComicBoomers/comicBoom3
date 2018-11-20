const router = require('express').Router()
const {User, Page} = require('../db/models')
module.exports = router

router.get('/:id', async(req, res, next)=>{
  try{
    const page = await Page.findById(req.params.id)
    res.json(page)
  }catch(err){
    next(err)
  }
})
