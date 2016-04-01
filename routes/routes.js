'use strict';

var dataHelper;

dataHelper = require('../middleware/data-helper.js');

module.exports = function(app) {
  app.get('/', function(req, res, next) {
    res.render('index', {title: 'Budget Pie'});
  });
  app.post('/', function(req, res, next) {
    dataHelper.sendJson(req, res, next);
  });

  app.get('/upload', function(req, res, next) {
    dataHelper.uploadData(req, res, next);
  });
};