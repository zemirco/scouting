
// edit an existing opponent team
angular.module('app').controller('OpponentsEditCtrl',
  ['$scope', '$timeout', '$routeParams', '$window', 'opponents', 'undo',
    function($scope, $timeout, $routeParams, $window, opponents, undo) {

      // wait until animation is done before setting the direction again
      $timeout(function() {
        $scope.slide.direction = 'right';
      }, 350);

      // get team from db
      opponents.get($routeParams.id).then(function(res) {
        $scope.opponent = res;
      }, function(err) {
        console.log(err);
      });

      // remove opponent team from db
      $scope.remove = function() {
        // save removed team to undo store
        undo.save($scope.opponent);
        // remove team from db
        opponents.remove($scope.opponent.uuid).then(function(res) {
          // go to opponents list view
          $window.location.href = '#/opponents?removed=true';
        }, function(err) {
          console.log(err);
        });

      };

      // update existing opponent team
      $scope.update = function() {
        // $scope.opponent contains the whole PouchDB object
        opponents.update($routeParams.id, $scope.opponent).then(function(err) {
          // show update success alert
          $scope.updateSuccessAlert = true;
          // hide success alert after some time
          $timeout(function() {
            $scope.updateSuccessAlert = false;
          }, 3000);
        }, function(err) {
          console.log(err);
        })

      };

    }]);