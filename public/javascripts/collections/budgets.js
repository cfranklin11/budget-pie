'use strict';

var bbApp = bbApp || {};

(function () {
  var Budgets = Backbone.Collection.extend({
    model: bbApp.Budget,
    url: '/'
  });

  bbApp.budgets = new Budgets();
})();