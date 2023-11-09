const express = require('express');
const router = express.Router();

const md5 = require('md5');
const moment = require('moment');

const User = require('../models/Users.js');

router.post('/login', (req, res) => {
  console.log(req.headers);
  console.log('Body');
  console.log(req.body);
  if(! (req.body.email && req.body.hash && req.body.timestamp)){
    return res.status(401).send({error: 'missing credentials', authorized: false});
  }
  let email = req.body.email;
  let hash;
  User.findOne({
    email,
  })
  .then((user) => {
    if(!user){
      console.log(email + ' Not found');
      return false;
    }
    hash = md5(req.body.timestamp + user.passhash);
    console.log(hash);
    return user;
    //if(hash === req.body.hash){
    //  email = user.email;
    //  return true;
    //}
    //return false;
  })
  .then((user) => {
    if(user){
      const token = md5(moment().utc().format() + hash);
      user.token = token;
      user.save()
      .then(() => {
        res.set('X-Arcis-Username', user.email);
        return res.status(200).send({authorized: true, token});
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
