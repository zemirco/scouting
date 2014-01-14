
// pouchdb wrapper
angular.module('app').factory('pouchdb', function() {
  Pouch.enableAllDbs = true;
  return new Pouch('myPouch');
});