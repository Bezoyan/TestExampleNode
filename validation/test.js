const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateTestInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.answers = !isEmpty(data.answers) ? data.answers : '';
  data.correct_answer = !isEmpty(data.correct_answer) ? data.correct_answer : '';
  data.score = !isEmpty(data.score) ? data.score : '';
  data.timer = !isEmpty(data.timer) ? data.timer : '';
  data.totleScore = !isEmpty(data.totleScore) ? data.totleScore : '';
  data.passScore = !isEmpty(data.passScore) ? data.passScore : '';

  if(!Validator.isLength(data.title, {min: 3, max: 100})) {
    errors.title = 'Title must be between 3 and 100 characters';
  }

  if(Validator.isEmpty(data.title)) {
    errors.title = 'Title field is required';
  }

  if(Validator.isEmpty(data.answers)) {
    errors.answers = 'answers is required';
  }

  if(Validator.isEmpty(data.correct_answer)) {
    errors.correct_answer = 'correct_answer is required';
  }

  if(Validator.isEmpty(data.score)) {
    errors.score = 'score is required';
  }
  if(Validator.isEmpty(data.timer)) {
    errors.timer = 'timer is required';
  }
  if(Validator.isEmpty(data.totleScore)) {
    errors.totleScore = 'totleScore is required';
  }
  if(Validator.isEmpty(data.passScore)) {
    errors.passScore = 'passScore is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
