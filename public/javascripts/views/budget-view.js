'use strict';

var bbApp = bbApp || {};

(function($) {
  bbApp.BudgetView = Backbone.View.extend({
    className: 'budget-card',
    id: this.model.title,
    template: _.template(
      '<h3><%= title %></h3>' +
      '<div><h4>DATA</h4></div>' +
      '<h3>Investment = <%= dollarsThisYear %></h3>' +
      '<h4>BENEFIT</h4>'
    ),
    initialize: function () {
      this.model.on('change', this.render, this)
      this.render();
    },
    render: function () {
      var attributes;

      attributes = this.model.toJSON();
      this.$el.html(this.template(attributes));
      return this;
    }
  });
})(jQuery);
