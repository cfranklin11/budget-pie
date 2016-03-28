'use strict'

var dataHelper;

dataHelper = require('../middleware/data-helper.js');

module.exports = function(app) {
  app.param('budget', function(req, res, next, budget) {
    req.budget = budget;
    next();
  });

  app.get('/', function(req, res, next) {
    res.render('index', {title: 'Welcome'});
  });
  app.get('/budgets', function(req, res, next) {
    res.render('budgets', {title: 'Budgets'});
  });
  app.get('/budgets/:budget', dataHelper.getData, function(req, res, next) {
    res.render('budget', {title: req.budget});
  });
};