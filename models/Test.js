const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TestSchema = new Schema({
  user: {
     type: Schema.Types.ObjectId,
     ref: 'users'
   },
      title: {
        type: String,
        required: true
    },
     answers: {
       type: [String],
       required: true
     },
     correct_answer: {
       type: String,
       required: true
     },
     score: {
       type: Number,
       required: true
     },
     timer: {
       type: Date,
       required: true
     },

 totleScore: {
   type: Number,
   required: true
 },
 passScore: {
   type: Number,
   required: true
 },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Test = mongoose.model('tests', TestSchema);
