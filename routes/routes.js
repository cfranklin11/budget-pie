'use strict'

var dataHelper;

dataHelper = require('../middleware/data-helper.js');

module.exports = function(app) {
  app.get('/', function(req, res, next) {
    res.render('index', {title: 'Budget Pie'});
  });
  app.post('/', function(req, res, next) {
    var form;

    form = req.body;

    console.log(form);
    res.redirect('/budgets');
  });
  app.get('/budgets', function(req, res, next) {
    res.render('budgets', {title: 'Budgets'});
  });
};