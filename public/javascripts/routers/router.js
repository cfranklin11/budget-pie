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
        values = {};
        inputs.each(function() {
          if(this.checked) {
            if (!values[this.name]) {
              if(this.type === 'radio') {
                values[this.name] = $(this).val();
              } else {
                values[this.name] = [$(this).val()];
              }
            } else {
              values[this.name].push($(this).val());
            }
          }
        });

        self.getBudgets(values);
      });
    },
    start: function () {
      Backbone.history.start();
    },
    getBudgets: function(inputs) {

      console.log(inputs);
      $('#collapseOne').collapse('hide');
    }
  });

  bbApp.AppRouter = new AppRouter();
})();
