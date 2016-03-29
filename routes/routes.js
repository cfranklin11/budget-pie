'use strict';

var dataHelper;

dataHelper = require('../middleware/data-helper.js');

module.exports = function(app) {
  app.get('/', function(req, res, next) {
    res.render('index', {title: 'Budget Pie'});
  });
  app.post('/', function(req, res, next) {
    var form, work, income, live, student, relationship, immigration,
      indigenous, children, ages, services, agesLength, childrenLength,
      servicesLength, query;

    form = req.body;
    work = form.work ? 'work=' + form.work + '&' : '';
    income = form.income ? 'income=' + form.income + '&' : '';
    live = form.live ? 'live=' + form.live + '&' : '';
    student = form.student ? 'student=' + form.student + '&' : '';
    relationship = form.relationship ? 'relationship=' + form.relationship + '&' : '';
    immigration = form.immigration ? 'immigration=' + form.immigration + '&' : '';
    indigenous = form.indigenous ? 'indigenous=' + form.indigenous + '&' : '';
    ages = form.ages || '';
    children = form.children || '';
    services = form.services || '';

    agesLength = ages.length;
    childrenLength = children.length;
    servicesLength = services.length;

    if (agesLength > 0) {
      if (Array.isArray(ages)) {
        ages = 'ages=' + ages.join('+') + '&';
      } else {
        ages = 'ages=' + ages + '&';
      }
    }

    if (childrenLength > 0) {
      if (Array.isArray(children)) {
        children = 'children=' + children.join('+') + '&';
      } else {
        children = 'children=' + children + '&';
      }
    }

    if (servicesLength > 0) {
      if (Array.isArray(services)) {
        services = 'services=' + services.join('+') + '&';
      } else {
        services = 'services=' + services + '&';
      }
    }

    query = '?' + ages + work + income + live + student + relationship +
      children + immigration + indigenous + services;

    res.redirect('/budgets' + query);
  });
  app.get('/budgets', function(req, res, next) {
    res.render('budgets', {title: 'Budgets'});
  });
};