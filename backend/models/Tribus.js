const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Nominally a "set of 3"

const schema = Schema({
  name: String,
  description: String,
  active: Boolean,
  project: {type: Schema.Types.ObjectId, ref: "Project"},
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, {
  timestamps: true
});

model = mongoose.model("Tribus", schema);

model.createIndexes();

module.exports = model;
