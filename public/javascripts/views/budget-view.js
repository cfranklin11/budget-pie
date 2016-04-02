'use strict';

var bbApp = bbApp || {};

(function($) {
  bbApp.BudgetView = Backbone.View.extend({
    className: 'budget-card',
    template: _.template(
      '<h3><%= title %></h3>' +
      '<div class="chart" id="<%= title %>"></div>' +
      '<h3>Investment = <%= dollarsThisYear %></h3>' +
      '<h4>BENEFIT</h4>'
    ),
    initialize: function () {
    },
    render: function () {
      var attributes;

      attributes = this.model.toJSON();
      this.$el.html(this.template(attributes));

      return this;
    }
  });
})(jQuery);
