
// dealing with opponent teams
angular.module('app').factory('opponents', ['$rootScope', '$q', 'pouchdb', function($rootScope, $q, pouchdb) {

  return {
    
    /**
     * save a new opponent team to db
     */
    save: function(team) {

      // init $q
      var deferred = $q.defer();

      // create new document
      var doc = {
        uuid: uuid.v4(),
        type: 'opponent',
        owner: 'john',
        players: team
      };

      // save to pouchdb
      pouchdb.post(doc, function(err, res) {
        $rootScope.$apply(function() {
          if (err) {
            deferred.reject(err)
          } else {
            deferred.resolve(res)
          }
        });
      });

      // return a promise
      return deferred.promise;

    },
    
    /**
     * get all opponent teams from db
     */
    getAllByOwner: function(owner) {

      // init $q
      var deferred = $q.defer();

      // create the mapping function
      var map = function(doc) {
        if (doc.type === 'opponent') {
          emit(doc.owner, doc)
        }
      };

      // query pouchdb
      pouchdb.query({map: map}, {key: owner}, function(err, res) {
        $rootScope.$apply(function() {
          if (err) {
            deferred.reject(err);
          } else {
            if (!res.rows.length) {
              deferred.resolve(0);
            } else {
              deferred.resolve(res.rows);
            }
          }
        });
      });

      // return a promise
      return deferred.promise;

    },
    
    /**
     * update an existing opponent team
     */
    update: function(uuid, doc) {

      var deferred = $q.defer();

      // find the document with provided uuid
      var map = function(doc) {
        if (doc.type === 'opponent') {
          emit(doc.uuid, doc)
        }
      };

      // query pouchdb
      pouchdb.query({map: map}, {key: uuid}, function(err, res) {
        if (err) {
          deferred.reject(err);
        } else {
          // extend old document with new values
          angular.extend(res.rows[0].value, doc);
          // update the document
          pouchdb.put(res.rows[0].value, function(err, res) {
            if (err) {
              deferred.reject(err);
            } else {
              deferred.resolve(res);
            }
          });
        }
      });

      return deferred.promise;

    },

    /**
     * delete an opponent team from db
     */
    remove: function(uuid) {

      var deferred = $q.defer();

      // find the document with provided uuid
      var map = function(doc) {
        if (doc.type === 'opponent') {
          emit(doc.uuid, doc)
        }
      };

      // query pouchdb
      pouchdb.query({map: map}, {key: uuid}, function(err, doc) {
        if (err) {
          deferred.reject(err);
        } else {
          // remove document from db
          pouchdb.remove(doc.rows[0].value, function(err, res) {
            if (err) {
              deferred.reject(err);
            } else {
              deferred.resolve(res);
            }
          });

        }
      });

      return deferred.promise;

    },

    /**
     * get a single opponent team from db
     */
    get: function(uuid) {

      var deferred = $q.defer();

      // find the document with provided uuid
      var map = function(doc) {
        if (doc.type === 'opponent') {
          emit(doc.uuid, doc)
        }
      };

      // query pouchdb
      pouchdb.query({map: map}, {key: uuid}, function(err, doc) {
        // remove document from db
        if (err) {
          deferred.reject(err);
        } else {
          deferred.resolve(doc.rows[0].value);
        }
      });

      return deferred.promise;

    },

    /**
     * take a former pouchdb object and save it back to pouchdb
     */
    revive: function(opponent) {

      var deferred = $q.defer();

      // delete CouchDB internal keys but keep other keys (like uuid, players, etc.)
      // -> revived object will get a new id and revision to fix conflicts
      delete opponent._id;
      delete opponent._rev;

      // save to pouchdb
      pouchdb.post(opponent, function(err, res) {
        if (err) {
          deferred.reject(err)
        } else {
          deferred.resolve(res)
        }
      });

      return deferred.promise;

    }
  }

}]);