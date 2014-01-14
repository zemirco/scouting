
// add a new match
angular.module('app')
  .controller('NewMatchCtrl', ['$scope', '$timeout', function($scope, $timeout) {

    // set default date - needs to be in yyyy-mm-dd format
    $scope.setDefaultDate = function() {
      return ((new Date()).toISOString()).substr(0, 10);
    };

    $scope.date = $scope.setDefaultDate();

    // wait until animation is done before setting the direction again
    $timeout(function() {
      $scope.slide.direction = 'right';
    }, 350);

    // reset all input fields
    $scope.cancel = function() {
      console.log('resetting all fields');
      $scope.title = '';
      $scope.location = '';
      $scope.date = $scope.setDefaultDate();
    };

}]);