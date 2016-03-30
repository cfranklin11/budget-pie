'use strict';

var bbApp = bbApp || {};

(function($) {
  bbApp.BudgetsView = Backbone.View.extend({
    el: $('#results'),
    template: _.template(
      '<div id="data">' +
      '</div>'
    ),
    initialize: function() {
      this.collection.on('add', this.addOne, this);
      this.collection.on('reset', this.render, this);
      this.render();
    },
    render: function() {
      this.$el.html(this.template());
      this.collection.each(this.addOne, this);
    },
    addOne: function(account) {
      var budgetView = new bbApp.BudgetView({model: budget});
      $(this.el).append(budgetView.render().el);
    }
  });
})(jQuery);