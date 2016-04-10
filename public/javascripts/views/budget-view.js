'use strict';

var bbApp = bbApp || {};

(function($) {
  bbApp.BudgetView = Backbone.View.extend({

    className: 'col-xs-12 col-sm-6 col-md-3 col-lg-3 flip',
    events: {
      'click .flipControl': 'flip'
    },
    initialize: function () {
    },
    flip: function (e) {
      var personas, thisCard;

      e.preventDefault();
      thisCard = $(e.currentTarget).closest('.card');

      if (!thisCard.hasClass('flipped')) {
        personas = window.localStorage.getItem('personas');

        this.model.save({
          data: {
            personas: personas,
            metric: 'clicks'
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

      thisCard.toggleClass('flipped');
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
          bbApp.D3Helper.createBarChart(attributes);
        });

      return this;
    }

  });
})(jQuery);
