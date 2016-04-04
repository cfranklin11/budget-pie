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
      var i;

      $('#collapseOne').collapse('hide');

      // bbApp.budgets.fetch({
      //   data: {data: inputs},
      //   method: 'POST',
      //   success: function(res, budgets) {
      //     console.log(budgets);
          var budgets = [
            {title: 'dummy program1',
            dollarsThisYear: 80,
            dollarsLastYear: 100,
            budgetPercent: 0.2,
            benefits: ['benefit1', 'benefit2', 'benefit3'],
            clickRate: 0.02,
            clicks: 2,
            impressions: 100},
            {title: 'dummy program2',
            dollarsThisYear: 80,
            dollarsLastYear: 100,
            budgetPercent: 0.2,
            benefits: ['benefit1', 'benefit2', 'benefit3'],
            clickRate: 0.02,
            clicks: 2,
            impressions: 100},
            {title: 'dummy program3',
            dollarsThisYear: 80,
            dollarsLastYear: 100,
            budgetPercent: 0.2,
            benefits: ['benefit1', 'benefit2', 'benefit3'],
            clickRate: 0.02,
            clicks: 2,
            impressions: 100},
            {title: 'dummy program4',
            dollarsThisYear: 80,
            dollarsLastYear: 100,
            budgetPercent: 0.2,
            benefits: ['benefit1', 'benefit2', 'benefit3'],
            clickRate: 0.02,
            clicks: 2,
            impressions: 100}
          ];


          bbApp.budgets.reset(budgets);
          self.budgetsView = new bbApp.BudgetsView({collection: bbApp.budgets});

          // for (i = 0; i < budgets.length; i++) {
          //   bbApp.D3Helper.createCircleChart(budgets[i]);
          // }
      //   },
      //   error: function(res) {
      //     console.log(res);
      //   }
      // });
    }
  });

  bbApp.AppRouter = new AppRouter();
})();
