
// alert service that works in browser and phonegap
angular.module('app.services.notification', []).factory('notification', function($window) {

  return {

    alert: function(title, message, buttonName, done) {

      if (navigator.notification && navigator.notification.alert) {

        navigator.notification.alert(message, done, title, buttonName)

      } else {

        // simply use JS alert
        $window.alert(message);
        done();

      }

    }

  }

});