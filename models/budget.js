'use strict';

var mongoose, budgetSchema;

mongoose = require('mongoose');

budgetSchema = mongoose.Schema({
  title: String,
  department: String,
  dollarsThisYear: Number,
  dollarsLastYear: Number,
  budgetPercent: Number,
  benefits: [String],
  clickRate: Number,
  clicks: Number,
  impressions: Number
});

module.exports = budgetSchema;