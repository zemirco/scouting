
// show a list of all opponent teams and "Add opponent team" button
angular.module('app').controller('OpponentsCtrl',
  ['$scope', '$timeout', '$window', '$routeParams', '$location', 'opponents', 'undo',
    function($scope, $timeout, $window, $routeParams, $location, opponents, undo) {

      // wait until animation is done before setting the direction again
      $timeout(function() {
        $scope.slide.direction = 'right';
      }, 350);

      // click on add button
      $scope.addOpponentTeam = function() {
        // change current slide direction
        $scope.slide.direction = 'left';
        // need to call next function async to make sure the slide direction was set
        $timeout(function(){
          $window.location.href = '#/add-opponent-team';
        });
      };

      // click on an opponent team from list
      $scope.goToOpponentTeam = function(id) {
        // change current slide direction
        $scope.slide.direction = 'left';
        // need to call next function async to make sure the slide direction was set
        $timeout(function(){
          $window.location.href = '#/opponents/' + id;
        });
      };

      // load all opponent teams from db
      opponents.getAllByOwner('john').then(function(res) {
        // check if we are coming from edit opponent team view
        if ($routeParams.removed) {
          // show remove alert
          $scope.removedAlert = true;
          // start timeout to hide the alert
          $timeout(function() {
            // hide alert
            $scope.removedAlert = false;
          }, 5000)
        }
        // display opponent teams to user
        $scope.rows = res;
      });

      // undo remove opponent team -> get team from "undo" service and save to db
      $scope.undo = function() {
        // get object from undo store
        var revivedTeam = undo.get();
        // check if we really got an object - might not be the case after page refresh with ?removed=true
        if (revivedTeam) {
          // save team to db
          opponents.revive(revivedTeam)
            .then(function() {
              return opponents.getAllByOwner('john')
            })
            .then(function(res) {
              // hide remove alert
              $scope.removedAlert = false;
              // show all teams in list
              $scope.rows = res;
            }, function(err) {
              console.log(err);
            });
        }
      }

    }]);