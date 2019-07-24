const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('./../../config.json');
const jwt = require('jsonwebtoken');


// Test model
const Test = require('../../models/Test');

// User model
const User = require('../../models/User');

// Test Validation
const validateTestInput = require('../../validation/test')

// @route Get api/posts/test
// @desc Tests posts route
// @access Public
router.get('/test', (req, res) => res.json({msg:"Tests Works"}));

// @route Get api/tests
// @desc Get tests
// @access Public
router.get('/', (req, res) => {
  Test.find()
    .sort({date: -1})
    .then(tests => res.json(tests))
    .catch(err => res.status(404).json({notestsfound: 'No tests found'}) // not works
  );
});

// @route Get api/tests/:id
// @desc Get tests
// @access Public
router.get('/:id', (req, res) => {
  Test.findById(req.params.id)
    .then(test => res.json(test))
    .catch(err => res.status(404).json({notestsfound: 'No tests found with this ID'}));
});

// @route Post api/jobs
// @desc Creat jobs
// @access Private
router.post('/', passport.authenticate('jwt', {session: false}),(req, res) => {
 const {errors, isValid} = validateTestInput(req.body);

 //Check Validation
 if(!isValid) {
   return res.status(400).json(errors);
 }

  const newTest = new Test({
    title: req.body.title,
    answers: req.body.answers,
    correct_answer: req.body.correct_answer,
    score: req.body.score,
    timer: req.body.timer,
    totleScore: req.body.totleScore,
    passScore: req.body.passScore,
     user: req.user.id,


  });
  const currentUser = req.user;
  console.log(currentUser);
  if (currentUser.role != "admin") {
          return res.status(401).json({ message: 'You have no access' });
      }

  newTest.save().then(test => res.json(test));

});

// @route Delete api/jobs/:id
// @desc delete job
// @access Private
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  User.findOne({user: req.user.id})
    .then(profile => {
      Test.findById(req.params.id)
        .then(test => {
          if(test.user.toString() !== req.user.id){
            return res.status(401).json({notauthorized: 'User not authorized'});
          }
          const currentUser = req.user;
          console.log(currentUser);
          if (currentUser.role != "admin") {
                  return res.status(401).json({ message: 'You have no access' });
              }
          // Delete test
          test.remove().then(() => res.json({success: true}));
        })
        .catch(err => res.status(404).json({testnotfound: 'Test not found'}));
    });

});


module.exports = router;
