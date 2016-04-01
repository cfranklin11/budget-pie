'use strict';

var mongoose, budgetSchema, personaSchema;

mongoose = require('mongoose');
budgetSchema = require('./budget.js');

personaSchema = mongoose.Schema({
  name: String,
  budgets: [budgetSchema]
});

module.exports = mongoose.model('Persona', personaSchema);