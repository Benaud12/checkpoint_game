checkpointApp.controller('PlayersCtrl', function(DatabaseDataFactory, CurrentGameDataFactory, $scope, $state){

  var ref = DatabaseDataFactory;
  var authData = ref.getAuth();
  var userRef = ref.child('users');
  var currentGameName;

  if (authData) {

    CurrentGameDataFactory(authData.uid, function(returnVal) {
      if (returnVal) {
        currentGameName = returnVal.key();
        userRef.on('value', function(dataSnapshot){
          gameLink = 'games/' + currentGameName;
          $scope.allPlayers = {};
          dataSnapshot.forEach(function(user) {
            if (user.hasChild(gameLink)) {
              userId = user.key()
              $scope.allPlayers[userId] = {
                checkpoints: user.child(gameLink).val().checkpoints,
                name: user.child('name').val()
              }
            };
          });
        });
      };

    });

  };

})