'use strict';

var bbApp = bbApp || {};

(function () {
  var AppRouter = Backbone.Router.extend({
     routes: {
      '': '',
    },
    initialize: function() {
      $('form').submit(function(event) {
        this.getBudgets();
      });
    },
    start: function () {
      Backbone.history.start();
    }
  });

})();
