'use strict';

var bbApp = bbApp || {};

(function () {
  var AppRouter = Backbone.Router.extend({
    initialize: function() {
      var self = this;
      $('form').submit(function(event) {
        var inputs, values;

        event.preventDefault();

        inputs = $('form :input');
        values = [];
        inputs.each(function() {
          if(this.checked) {
            values.push($(this).val());
          }
        });

        self.getBudgets(values);
      });
    },
    start: function () {
      Backbone.history.start();
    },
    getBudgets: function(inputs) {

      $('#collapseOne').collapse('hide');

      bbApp.budgets.fetch({
        data: {data: inputs},
        method: 'POST',
        success: function(res, budgets) {
          console.log(budgets);

          bbApp.budgets.reset(budgets);
          self.budgetsView = new bbApp.BudgetsView({collection: bbApp.budgets});
        },
        error: function(res) {
          console.log(res);
        }
      });
    }
  });

  bbApp.AppRouter = new AppRouter();
})();
