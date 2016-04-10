'use strict';

var bbApp = bbApp || {};

(function () {
  var AppRouter = Backbone.Router.extend({
    initialize: function() {
      var self = this;

      // Form submit event
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

        if (values.length === 0) {
          alert("No demographic information entered. Please fill in at least one field.");

        } else {
          self.getBudgets(values);
        }
      });

      // Get more results event
      $('#more-results').click(function() {
        var budgetsView, newMin, newMax, collection, collectionLength, length,
          models, i;

        budgetsView = window.budgetsView;

        if (budgetsView) {
          newMin = budgetsView.min + 8;
          newMax = budgetsView.max + 8;
          collection = budgetsView.collection;
          collectionLength = collection.length;
          length = Math.min(newMax, collectionLength);
          models = collection.models;

          for (i = newMin; i < length; i++) {
            budgetsView.addOne(models[i], budgetsView);
          }

          if (newMax >= collectionLength) {
            $('#more-results').attr('disabled', true);
          }
        }
      });
    },
    start: function () {
      Backbone.history.start();
    },
    getBudgets: function(inputs) {
      var i;

      $('#collapseOne').collapse('hide');

      bbApp.budgets.fetch({
        data: {data: inputs},
        method: 'POST',
        success: function(res, budgets) {
          bbApp.budgets.reset(budgets);
          self.budgetsView = new bbApp.BudgetsView({
            collection: bbApp.budgets,
            min: 0,
            max: 8
          });

          for (i = 0; i < budgets.length; i++) {
            bbApp.D3Helper.createCircleChart(budgets[i]);
          }

          $('#more-results').parent('div').removeAttr('hidden');
        },
        error: function(res) {
          console.log(res);
        }
      });
    }
  });

  bbApp.AppRouter = new AppRouter();
})();
