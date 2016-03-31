'use strict';

var mongoose, mapSchema, locationSchema;

mongoose = require('mongoose');
budgetSchema = require('./budget.js');

personaSchema = mongoose.Schema({
  name: String,
  budgets: [budgetSchema]
});

module.exports = mongoose.model('Persona', personaSchema);