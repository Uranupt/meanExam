var mongoose = require('mongoose')
var Schema = mongoose.Schema
var AnswerSchema = require('./answer.js')

var QuestionSchema = Schema({
  title : {type: String, required: true},
  description : {type: String},
  answers : [AnswerSchema]
});

mongoose.model('Question', QuestionSchema);

module.exports = QuestionSchema
