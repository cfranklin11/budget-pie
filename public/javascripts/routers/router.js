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
          models, i, personas;

        budgetsView = window.budgetsView;

        if (budgetsView) {
          newMin = budgetsView.min + 4;
          newMax = budgetsView.max + 4;
          collection = budgetsView.collection;
          collectionLength = collection.length;
          length = Math.min(newMax, collectionLength);
          models = collection.models;

          for (i = newMin; i < length; i++) {
            budgetsView.addOne(models[i], budgetsView);

            // Update model impressions
            personas = window.localStorage.getItem('personas');

            bbApp.budgets.models[i].save({
              data: {
                personas: personas,
                metric: 'impressions'
              },
              method: 'POST',
              success: function(res) {
                console.log(res);
              },
              error: function(res) {
                console.log(res);
              }
            });
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
      var i, scrollTarget, personas;

      window.localStorage.setItem('personas', inputs);

      $('#collapseOne').collapse('hide');

      bbApp.budgets.fetch({
        data: {data: inputs},
        method: 'POST',
        success: function(res, budgets) {
          bbApp.budgets.reset(budgets);
          self.budgetsView = new bbApp.BudgetsView({
            collection: bbApp.budgets,
            min: 0,
            max: 4
          });

          for (i = 0; i < 4; i++) {
            bbApp.D3Helper.createCircleChart(budgets[i]);
          }

          scrollTarget = $('button[type=submit]').parent('div').offset();
          $( 'body' ).animate({scrollTop: scrollTarget.top}, 'slow');
          $('#more-results').parent('div').removeAttr('hidden');

          // Update model impressions
          personas = window.localStorage.getItem('personas');

          for (i = 0; i < 4; i++) {

            bbApp.budgets.models[i].save({
              data: {
                personas: personas,
                metric: 'impressions'
              },
              method: 'POST',
              success: function(res) {
                console.log(res);
              },
              error: function(res) {
                console.log(res);
              }
            });
          }
        },
        error: function(res) {
          console.log(res);
        }
      });
    }
  });

  bbApp.AppRouter = new AppRouter();
})();
