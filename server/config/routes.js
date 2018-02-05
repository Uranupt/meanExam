var question = require('../controllers/questions.js')

module.exports = function(app){
  app
  .get('/logout', question.logout)
  .get('/check', question.check)
  .get('/questions', question.update)
  .post('/like', question.like)
  .post('/answernew', question.answer)
  .post('/lognew', question.lognew)
  .post('/asknew', question.asknew)
  .all('**', question.resolve)
}
