'use strict';

var mongoose, budgetSchema;

mongoose = require('mongoose');

budgetSchema = mongoose.Schema({
  title: String,
  source: String,
  dollarsThisYear: Number,
  dollarsLastYear: Number,
  percent: Number,
  relevance: Number,
  timesCalled: Number,
  benefits: [String]
});

module.exports = budgetSchema;