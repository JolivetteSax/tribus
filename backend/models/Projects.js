const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = Schema({
  name: String,
  description: String,
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: true
});

model = mongoose.model("Project", schema);

model.createIndexes();

module.exports = model;
