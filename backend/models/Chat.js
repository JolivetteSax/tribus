const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = Schema({
  project: {type: Schema.Types.ObjectId, ref: "Project"},
  tribus:  {type: Schema.Types.ObjectId, ref: 'Tribus' },
  messages: [{
    message: {
      user: {type: Schema.Types.ObjectId, ref: "User"},
      comment: String,
      timestamp: Schema.Types.Date,
    }
  }]  
}, {
  timestamps: true
});

model = mongoose.model("Alternative", schema);

model.createIndexes();

module.exports = model;
