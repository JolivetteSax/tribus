const User = require('../models/Users.js');
const md5 = require('md5');

const createUser = (email, password) =>  {
  if(!email || !password){
    throw "Email or password not specified";
  }
  const passhash = md5('TRIBUS' + email + password);
  console.log("Creating user %s with password %s -hash: %s", email, password, passhash); 
  let user = new User({
    email, passhash
  });
  return user.save();
};

const getUser = (email) =>  {
  if(!email){
    throw "Email not specified";
  }
  return User.find({email});
};


module.exports = {
  createUser,
  getUser,
};

