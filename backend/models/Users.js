const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = Schema({
  email: String,
  name: String,
  passhash: String,
  token: String
});

module.exports = mongoose.model("User", schema);
