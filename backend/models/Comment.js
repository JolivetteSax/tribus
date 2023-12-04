const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = Schema({
  fk: Schema.Types.ObjectId,
  refers: {
    alternative: Boolean,
    preference: Boolean,
    comment: Boolean,
    risk: Boolean,
  },
  comment: String,
  user: {type: Schema.Types.ObjectId, ref: "User"},
  vote: {
    up: Boolean,
    down: Boolean,
  }
}, {
  timestamps: true
});

model = mongoose.model("Alternative", schema);

model.createIndexes();

module.exports = model;
