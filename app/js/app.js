
var app = angular.module('app', [
  'ngRoute',
  'ngAnimate',
  'ngTouch',
  'app.services.notification'
]);

app.config(['$routeProvider', function($routeProvider) {

  $routeProvider.when('/', {
    templateUrl: 'views/prod/start.html',
    controller: 'StartCtrl'
  });

  $routeProvider.when('/new-match', {
    templateUrl: 'views/prod/new-match.html',
    controller: 'NewMatchCtrl'
  });

  $routeProvider.when('/opponents', {
    templateUrl: 'views/prod/opponents.html',
    controller: 'OpponentsCtrl'
  });

  $routeProvider.when('/opponents/:id', {
    templateUrl: 'views/prod/opponents-edit.html',
    controller: 'OpponentsEditCtrl'
  });

  $routeProvider.when('/add-opponent-team', {
    templateUrl: 'views/prod/opponents-add.html',
    controller: 'AddOpponentTeamCtrl'
  });

  $routeProvider.otherwise({redirectTo: '/'});

}]);



//document.addEventListener('deviceready', function() {
//
//  angular.element(document).ready(function() {
//    angular.bootstrap(document, ['app']);
//  });
//
//}, false);