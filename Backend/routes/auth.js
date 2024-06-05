const express = require('express');
const router= express.Router();
const User = require('../models/User')

//Create a User using : Post "/api/auth" doesnt requre auth
router.get('/',(req,res)=>{
   const user = User(req.body)
   user.save();
   res.send(req.body)
});

module.exports = router