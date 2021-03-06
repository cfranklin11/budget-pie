'use strict';

var bbApp = bbApp || {};

(function() {
  bbApp.Budget = Backbone.Model.extend({
    url: '/update',
    defaults: {
      title: 'dummy program',
      department: 'dummy department',
      dollarsThisYear: 100,
      dollarsLastYear: 100,
      budgetPercent: 0.2,
      benefits: ['benefit1', 'benefit2', 'benefit3'],
      clickRate: 0.02,
      clicks: 2,
      impressions: 100
    }
  });
})();
