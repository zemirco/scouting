
// index controller for starting page
angular.module('app').controller('StartCtrl',
  ['$scope', '$timeout',
    function($scope, $timeout) {

      // wait until animation is done before setting the direction again
      $timeout(function() {
        $scope.slide.direction = 'left';
      }, 350);

    }]);