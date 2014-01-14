
// add new opponent team
angular.module('app').controller('AddOpponentTeamCtrl',
  ['$scope', '$timeout', 'opponents', 'notification',
    function($scope, $timeout, opponents, notification) {

      // hide save success alert
      $scope.saveSuccessAlert = false;

      // wait until animation is done before setting the direction again
      $timeout(function() {
        $scope.slide.direction = 'right';
      }, 350);

      // init dummy vars
      $scope.opponents = [
        {firstname: '', lastname: ''},
        {firstname: '', lastname: ''}
      ];

      // save new team to db
      $scope.save = function() {

        // check for empty input fields
        if (!$scope.opponents[0].lastname || !$scope.opponents[1].lastname) {
          notification.alert(
            'Missing values',
            'Please enter last names for opponent players!',
            'OK',
            function() {}
          );
          return;
        }

        // save values to db
        opponents.save($scope.opponents).then(function(res) {
          // clear input fields
          $scope.clear();
          // show save success alert
          $scope.saveSuccessAlert = true;
          // hide success alert after some time
          $timeout(function() {
            $scope.saveSuccessAlert = false;
          }, 3000);
        }, function(err) {
          console.log(err);
        });
      };

      // clear all input fields
      $scope.clear = function() {

        $scope.opponents = [
          {firstname: '', lastname: ''},
          {firstname: '', lastname: ''}
        ];

      }

    }]);