const mongoose = require('mongoose'),
  Question = mongoose.model('Question')
  Answer = mongoose.model('Answer')
const path = require('path')

module.exports = {
    resolve: (req, res) => {
      if(req.session.logged){
        res.sendFile(path.resolve('./QandA/dist/index.html'))
      }else{
        res.redirect('/')
      }
    },

    check: (req, res) => {
      if(req.session.logged){
        res.json({'user' : req.session.logged});
      }else{
        req.session.logged = ''
        res.json({'user' : req.session.logged});
      }
      console.log(req.session.logged)
    },

    lognew: (req, res) => {
      req.session.logged = req.body.user
      res.end();
    },

    update: (req, res) => {
      Question.find({}, function(err, questions){
        res.json(questions)
      });
    },

    logout: (req, res) => {
      req.session.destroy(function(err){
        res.redirect('/');
      })
    },

    asknew: (req, res) => {
      Question.create(req.body.question)
        .then(question => res.redirect('/'))
        .catch(error => console.log(error));
    },

    answer: (req, res) => {
      var answer = new Answer(req.body.answer)
      Question.findOne({_id: req.body.question._id}, function(err, question){
        if(err){
          res.json(err)
        }else{
          var qtemp = question
          qtemp.answers.push(answer)
          qtemp.save(function(err){
            if(err){
              res.json(err)
            }else{
              res.redirect('/')
            }
          })
        };
      });
    },

    like: (req, res) => {
      var aidx = req.body.index
      Question.findOne({_id: req.body.question._id}, function(err, question){
        if(err){
          res.json(err)
        }else{
          var qtemp = question
          var atemp = question.answers[aidx]
          atemp.likes += 1
          atemp.save(function(err){
            if(err){
              res.json(err)
            }else{
              qtemp.answers.sort(function(a, b){
                if(a.likes < b.likes){return 1;}
                if(a.likes > b.likes){return -1;}
                return 0;
              })
              qtemp.save(function(err){
                if(err){
                  res.json(err)
                }else{
                  res.redirect('/')
                }
              })
            }
          })
        }
      })
    }

  }
