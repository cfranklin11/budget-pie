'use strict'

var dataHelper;

dataHelper = require('../middleware/data-helper.js');

module.exports = function(app) {
  app.param('budget', function(req, res, next, budget) {
    req.budget = budget;
    next();
  });

  app.get('/', function(req, res, next) {
    res.render('index', {title: 'Budget Pie'});
  });
  app.get('/budgets', function(req, res, next) {
    res.render('budgets', {title: 'Budgets'});
  });
};