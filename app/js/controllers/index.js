
// main controller for page navigation - parent controller for all following controllers
angular.module('app').controller('IndexCtrl', ['$scope', '$location', function($scope, $location) {
    
  // set an object to child controllers have access AND are able to change it
  // default direction is ''
  $scope.slide = {
    direction: ''
  };

  // back button in header - window history back didn't work
  $scope.toIndex = function() {
    $location.path('/');
  };

}]);