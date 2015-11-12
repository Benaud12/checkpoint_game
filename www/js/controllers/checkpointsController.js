checkpointApp.controller('CheckpointsCtrl', function(DatabaseDataFactory, CurrentGameDataFactory, $scope, $state, $firebaseObject, $ionicPopup){

  var ref = DatabaseDataFactory;
  var authData = ref.getAuth();

  if (authData) {

    CurrentGameDataFactory(authData.uid, function(returnVal) {
      if (returnVal) {
        currentGameRef = returnVal.ref();
        var checkpointsRef = currentGameRef.child('checkpoints')
        var syncCheckpointsObject = $firebaseObject(checkpointsRef)
        syncCheckpointsObject.$bindTo($scope, 'checkpoints');
      }

    });

    $scope.checkpointPopup = function(checkpoint) {
      var checkpointRealName;
      var checkpointName = checkpoint.name;
      if (checkpoint.located) {
        checkpointRealName = checkpoint.realName;
      } else {
        checkpointRealName = "You haven't found me yet!"
      }
      $ionicPopup.show({
        title: checkpointName,
        subTitle: checkpointRealName,
        buttons: [{ text: 'Close' }]
      });
    }

  }

});
