const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = Schema({
  email: { type: String, required: true, index: true, unique: true },
  name: String,
  passhash: String,
  token: String,
  roles: {
    expert: Boolean,
    engineer: Boolean,
    builder: Boolean,
    user: Boolean,
    responsible: Boolean, // instead of manager
  },
}, {
  timestamps: true
});

model = mongoose.model("User", schema);

model.createIndexes();

module.exports = model;
