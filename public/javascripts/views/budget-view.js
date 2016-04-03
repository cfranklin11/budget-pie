'use strict';

var bbApp = bbApp || {};

(function($) {
  bbApp.BudgetView = Backbone.View.extend({

    className: 'col-xs-12 col-sm-6 col-md-4 col-lg-3 flip',
    events: {
      'click .flipControl': 'flip'
    },
    initialize: function () {
    },
    flip: function (e) {
      e.preventDefault();

      $(e.currentTarget).closest('.card').toggleClass('flipped');
    },

    render: function () {
      var attributes, self;
      self = this;
      attributes = this.model.toJSON();

       $.get('templates/card-flip.html', function (data) {
            var template = _.template(data);

            self.$el.html(template(attributes));
        }, 'html')
        .complete(function() {
          bbApp.D3Helper.createCircleChart(attributes);
        });

      return this;

    }

  });
})(jQuery);
