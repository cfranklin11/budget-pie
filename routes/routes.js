'use strict';

var dataHelper;

dataHelper = require('../middleware/data-helper.js');

module.exports = function(app) {
  app.get('/', function(req, res, next) {
    res.render('index', {title: 'Budget Pie!'});
  });
  app.post('/', dataHelper.sendJson, function(req, res) {
    res.json(req.budgetArray);
  });
  app.post('/update', dataHelper.updateModel, function(req, res) {
    res.json('updated');
  })

  // // **** Enable to reset DB data based on data csv ****
  // app.get('/upload', function(req, res, next) {
  //   dataHelper.uploadData(req, res, next);
  // });
};
