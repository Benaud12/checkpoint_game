checkpointApp.factory('CurrentGameDataFactory', function(DatabaseDataFactory, $firebaseObject) {

  var ref = DatabaseDataFactory;
  var authData = ref.getAuth();

  return function(userId, callback) {
    var callbackFunction = callback
    var userGamesLink = 'users/' + userId + '/games';
    ref.child(userGamesLink).once('value', function(snapshot) {
      snapshot.forEach(function(game) {
        var currentGame = game.val().currentGame
        if (currentGame) {
          return callbackFunction(game.ref());
        };
      });
    });

  };

});