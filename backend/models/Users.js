const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = Schema({
  email: { type: String, required: true, index: true, unique: true },
  name: String,
  passhash: String,
  token: String
}, {
  timestamps: true
});

model = mongoose.model("User", schema);

model.createIndexes();

module.exports = model;
