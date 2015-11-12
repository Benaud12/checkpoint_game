checkpointApp.controller('GameCtrl', function(DatabaseDataFactory, CurrentGameDataFactory, $scope, $state, $firebaseObject){

  var ref = DatabaseDataFactory;
  var syncObject = $firebaseObject(ref);
  var authData = ref.getAuth();
  var currentGameRef;

  if (authData) {

    CurrentGameDataFactory(authData.uid, function(returnVal) {
      if (returnVal) {
        currentGameRef = returnVal.ref();
        var gameSyncObject = $firebaseObject(currentGameRef);
        gameSyncObject.$bindTo($scope, 'currentGame');
      };
    });

    $scope.quitGame = function() {
      if (currentGameRef) {
        currentGameRef.update({
          currentGame: false
        });
        document.location.reload();
      };
    };

  };

});
