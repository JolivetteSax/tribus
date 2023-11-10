const express = require('express');
const router = express.Router();

const md5 = require('md5');
const moment = require('moment');

const User = require('../models/Users.js');

router.post('/login', (req, res) => {
  if(! (req.body.email && req.body.hash && req.body.timestamp)){
    return res.status(401).send({error: 'missing credentials', authorized: false});
  }
  let email = req.body.email;
  User.findOne({
    email,
  })
  .then((user) => {
    if(!user){
      console.log(email + ' Not found');
      return false;
    }
    let hash = md5(req.body.timestamp + user.passhash);
    if(hash === req.body.hash){
      const token = md5(moment().utc().format() + hash);
      user.token = token;
      return user;
    }
    else{
      return false;
    }
  })
  .then((user) => {
    if(user){
      user.save()
      .then(() => {
        res.set('X-Arcis-Username', user.email);
        return res.status(200).send({authorized: true, token: user.token});
      });
    }
    else{
      setTimeout(() => {
        res.status(401).send({authorized: false});
      }, 3000);
    }
  });

});

module.exports = router;
