checkpointApp.factory('UserDataFactory', function(DatabaseDataFactory, $firebaseObject) {

  var ref = DatabaseDataFactory;
  var authData = ref.getAuth();

  return function(userId, callback) {
    var callbackFunction = callback
    var userLink = 'users/' + userId;
    ref.child(userLink).once('value', function(snapshot){
      return callbackFunction(snapshot);
    });
  };

});