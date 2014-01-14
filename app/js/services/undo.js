
// temporary storage for one object to allow "undo" action
angular.module('app').factory('undo', [function() {

  var deadObject = null;

  return {

    // get the previously removed object
    get: function() {
      return deadObject;
    },

    // save an object to undo tmp storage
    save: function(myObject) {
      // create a copy of the object so we can change it in controller $scope
      objectCopy = angular.copy(myObject);

      // save to tmp var
      deadObject = objectCopy;
    },

    // empty temporary undo storage
    clear: function() {
      deadObject = null;
    }

  }

}]);