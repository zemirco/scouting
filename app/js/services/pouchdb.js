
// pouchdb wrapper
angular.module('app').factory('pouchdb', function() {
  PouchDB.enableAllDbs = true;
  return new PouchDB('myPouch');
});