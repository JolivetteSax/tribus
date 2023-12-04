const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = Schema({
  name: String,
  description: String,
  project: {type: Schema.Types.ObjectId, ref: "Project"},

  // Attribution is a composit of the set, without specific attribution to a political individual
  tribus:  {type: Schema.Types.ObjectId, ref: 'Tribus' },

  likelihood: { // vote count
    frequent: Number,
    rare: Number,
    unlikely: Number,
    theoretical: Number,
    impossible: Number,
  },
  type: {
    existential: Boolean,
    cost: Boolean,
  },
  mitigators: [{
    alternative:  {type: Schema.Types.ObjectId, ref: 'Alternative' },
  }],
  aggrevators: [{
    alternative:  {type: Schema.Types.ObjectId, ref: 'Alternative' },
  }],

}, {
  timestamps: true
});

model = mongoose.model("Risk", schema);

model.createIndexes();

module.exports = model;
