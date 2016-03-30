'use strict';

var bbApp = bbApp || {};

(function () {
  var Budgets = Backbone.Collection.extend({
    model: bbApp.Budget
  });

  bbApp.budgets = new Budgets();
})();