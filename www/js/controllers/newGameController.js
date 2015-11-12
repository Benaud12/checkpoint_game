checkpointApp.controller('NewGameCtrl', function(DatabaseDataFactory, CurrentGameDataFactory, $scope, $state, $firebaseObject, $ionicPopup){

  var ref = DatabaseDataFactory;
  var syncObject = $firebaseObject(ref);
  syncObject.$bindTo($scope, 'data')
  var authData = ref.getAuth();
  var startPopUp;

  // syncObject.$bindTo($scope, 'data');

  if (authData) {

    $scope.startGame = function(gameName) {
      var userLink = 'users/' + authData.uid
      var gameLink = 'games/' + gameName;
      var startTime = new Date();

      CurrentGameDataFactory(authData.uid, function(returnVal) {
        if (returnVal) {
          var gameRef = returnVal.ref();
          gameRef.update({
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
        startPopUp.close();
        document.location.reload();
      });

    };

    $scope.selectGame = function() {
      startPopUp = $ionicPopup.show({
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
