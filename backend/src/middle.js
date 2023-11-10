const moment = require('moment');
const hostname = require('os').hostname();
const mongoose = require('mongoose');
const User = require('../models/Users.js');

const auth = (req, res, next) => {
  let token = req.get('X-Tribus-Token');
  if(!token){
    token = req.query.token.toString();
  }
  if(!token){
    return res.status(403).send();
  }
  User.findOne({ token })
  .then((login) => {
    if(login){
      console.log("User authorized for API access");
      // Setting this for downstream use prevents spoofing
      res.set('X-Tribus-Username', login.email);
      next();
    }
    else{
      res.status(401).send();
    }
  });
};

const log = (req, res, next) => {
 let method = req.method.toUpperCase();
 let path = req.path;

 if(method === 'GET' && path.indexOf('image') === 1){
   // no need to log these
   return next();
 }
 const start = Date.now();
 res.on('finish', function(){
  let code = res.statusCode;
  const timing = Date.now() - start;
  let username = res.get('X-Tribus-Username');
  if(!username){
    username = "UNK";
  }
  const date = moment().toISOString();
  console.log(`${date} ${hostname} "${username}" ${method} ${path} ${code} - ${timing}ms`);
 });
 next();
};


module.exports = {
  log,
  auth,
};

