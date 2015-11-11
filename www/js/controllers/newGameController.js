checkpointApp.controller('NewGameCtrl', function(DatabaseDataFactory, CurrentGameDataFactory, $scope, $state, $firebaseObject, $ionicPopup){

  var ref = DatabaseDataFactory;
  var syncObject = $firebaseObject(ref);
  var authData = ref.getAuth();

  syncObject.$bindTo($scope, 'data');

  if (authData) {

    $scope.startGame = function(gameName) {
      console.log("In new game ctrl")
      var userLink = 'users/' + authData.uid
      var gameLink = 'games/' + gameName;
      var startTime = new Date();

      CurrentGameDataFactory(authData.uid, function(returnVal) {
        console.log("called back?")
        if (returnVal) {
          returnVal.update({
            currentGame: false
          });
        };
      });

      ref.child(gameLink).once('value', function(snapshot) {
        var game = snapshot.val();
        var newGameRef = ref.child(userLink).child(gameLink)
        newGameRef.update(game);
        newGameRef.update({
          started: startTime,
          finished: null,
          currentGame: true
        });
        var gameSyncObject = $firebaseObject(newGameRef);
        document.location.reload();
      })

    };

    $scope.selectGame = function() {
      $ionicPopup.show({
        templateUrl: 'views/tab-game-select.html',
        title: 'Please select a game',
        scope: $scope,
        buttons: [
          { text: 'Cancel' }
        ]
      });
    }

  }

});
