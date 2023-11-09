const cmd = require('./src/cmd');
const mongoose = require("mongoose");

let command;

if(process.argv.length > 2){
  command = process.argv[2];
}

mongoose.connect("mongodb://127.0.0.1:27017/tribus")
.then(() => {
  let email, password;
  switch(command){
  case 'createUser':
    email = process.argv[3];
    password = process.argv[4];
    return cmd.createUser(email, password)
    .then(console.log);
    break;
  case 'showUser':
    email = process.argv[3];
    return cmd.getUser(email)
    .then(console.log);
    break;
  default: 
    console.log('No option selected');
    break;
  };
})
.then(() => {
  process.exit(0);
})
.catch(error => {
  console.log(error);
  process.exit(1);
});

