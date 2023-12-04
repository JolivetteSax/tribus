const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = Schema({
  name: String,
  description: String,
  accepted: Boolean,
  completed: Boolean,
  confirmers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  project: {type: Schema.Types.ObjectId, ref: "Project"},

  // Attribution is a composit of the set, without specific attribution to a political individual
  tribus:  {type: Schema.Types.ObjectId, ref: 'Tribus' },
  
  preferences: [{type: Schema.Types.ObjectId, ref: 'Preference' }],
}, {
  timestamps: true
});

model = mongoose.model("Alternative", schema);

model.createIndexes();

module.exports = model;
