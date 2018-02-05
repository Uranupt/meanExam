var mongoose = require('mongoose')
var Schema = mongoose.Schema
var AnswerSchema = Schema({
  name : {type: String, required: true},
  content : {type: String, required: true},
  details : {type: String},
  likes : {type: Number, default: 0}
});

mongoose.model('Answer', AnswerSchema);

module.exports = AnswerSchema
