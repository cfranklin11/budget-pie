'use strict';

var bbApp = bbApp || {};

(function($) {
  bbApp.BudgetsView = Backbone.View.extend({
    el: $('#results'),
    template: _.template(
      '<div id="data" class="container"></div>'),
    initialize: function(options) {
      this.collection.on('add', this.addOne, this);
      this.collection.on('reset', this.render, this);
      this.render(options);
    },
    render: function(options) {
      var self, length, i;

      console.log(this);

      self = this;
      this.min = options.min;
      this.max = options.max;
      length = this.collection.length;
      this.$el.html(this.template());

      for (i = this.min; i < Math.min(this.max, length); i++) {
       this.addOne(this.collection.models[i], self);
      }
    },
    addOne: function(budget, self) {
      var budgetView;

      console.log(budget);

      budgetView = new bbApp.BudgetView({model: budget});
      self.$el.children('#data').append(budgetView.render().el);
    }
  });
})(jQuery);
