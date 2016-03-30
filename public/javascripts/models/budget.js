'use strict';

var bbApp = bbApp || {};

(function() {
  bbApp.Budget = Backbone.Model.extend({
    defaults: {
      title: 'dummy program',
      dollarsThisYear: 100,
      dollarsLastYear: 100,
      percent: 0.2,
      benefits: ['benefit1', 'benefit2', 'benefit3']
    }
  });
})();