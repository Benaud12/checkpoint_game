checkpointApp.controller('NextCheckpointCtrl', function(DatabaseDataFactory, UserDataFactory, CurrentLocationFactory, CurrentGameDataFactory, $rootScope, $scope, $state, $firebaseObject, $ionicPopup){

  var ref = DatabaseDataFactory;
  var currentGameRef, currentGameName;
  var authData = ref.getAuth();
  var gameComplete;
  var syncNextCheckpointObject;

  if (authData) {

    CurrentGameDataFactory(authData.uid, function(returnVal) {
      if (returnVal) {

        currentGameRef = returnVal.ref();
        currentGameName = returnVal.key();
        gameComplete = isAllLocated(returnVal.val().checkpoints)

        nextCheckpoint = findNext(returnVal.val().checkpoints)
        checkpointId = nextCheckpoint.id
        console.log('keysy', nextCheckpoint)
        nextCheckpointRef = currentGameRef.child('checkpoints').child(checkpointId);
        // $scope.data.currentGame = returnVal.val();
        // $scope.data.currentGameName = currentGameName

        syncNextCheckpointObject = $firebaseObject(nextCheckpointRef);
        syncNextCheckpointObject.$bindTo($scope, 'nextCheckpoint');
        // var gameSyncObject = $firebaseObject(currentGameRef);
        // gameSyncObject.$bindTo($scope, 'currentGame');
        if (!gameComplete) {
          CurrentLocationFactory(function(returnVal) {
            var currentLocation = returnVal;
            // $scope.$apply(function(){
              distanceUpdate(currentLocation)
            // });
          });
        }
      }

    });


    var distanceUpdate = function(userLocation) {
      var checkpointId = syncNextCheckpointObject.id;
      var link = 'users/' + authData.uid + '/games/' + currentGameName;
      var checkpointData = ref.child(link).child('checkpoints').child(checkpointId);
      var userData = ref.child('users').child(authData.uid);
      var targetLocation = [syncNextCheckpointObject.position.latitude, syncNextCheckpointObject.position.longitude];
      var distanceToTarget = GeoFire.distance(userLocation, targetLocation);
      // $scope.humanDistanceToTarget =  ($scope.distanceToTarget * 1000).toFixed(0);
      checkpointData.update( dataChanges(distanceToTarget) );

      ref.child(link).once('value', function(snapshot) {
        var checkpoints = snapshot.val().checkpoints;
        if (isAllLocated(checkpoints)) {
          finishTime = new Date();
          ref.child(link).update({finished: finishTime});
          gameComplete = true;
        } else {
          userData.once('value', function(snapshot) {
            if ( snapshot.val().distance < distanceToTarget ) {
              $('#hysteresis').text('Getting colder...');
              // $scope.data.hysteresis = { hotOrCold: 'Getting colder...' };
            } else {
              $('#hysteresis').text('Getting warmer...');
              // $scope.data.hysteresis = { hotOrCold: 'Getting warmer...' };
            };
            // var humanDistanceToTarget = (distanceToTarget * 1000).toFixed();


            userData.update( {distance: distanceToTarget} );
          });

        };

      });

    };

    // $scope.quitGame = function() {
    //   if (currentGameRef) {
    //     currentGameRef.update({
    //       currentGame: false
    //     });
    //     document.location.reload();
    //   };
    // };

    var dataChanges = function(distanceToTarget) {
      if (distanceToTarget > 3) {
        return ({color: '#447BF2'})
      }
      else if ( distanceToTarget > 1.5 ) {
        return ({color: '#8FB091'})
      }
      else if ( distanceToTarget > 0.5 ) {
        return ({color: '#ECF218'})
      }
      else if ( distanceToTarget > 0.2 ) {
        return ({color: '#FCB50F'})
      }
      else if ( distanceToTarget > 0.1 ) {
        return ({color: '#FA8F17'})
      }
      else if ( distanceToTarget > 0.05 ) {
        return ({color: '#F50733'})
      }
      else if ( distanceToTarget <= 0.05) {
        locatedPopup();
        return ({color: '#26ED33', located: true})
      }
    };

    var locatedPopup = function() {
      $ionicPopup.show({
        template: syncNextCheckpointObject.realName,
        title: 'Congratulations!',
        subTitle: 'You have successfully located...',
        buttons: [{ text: 'Close' }]
      });
    };

    $scope.bee = function(){
      return "BEEEE"
    }

    // $scope.checkpointPopup = function(checkpoint) {
    //   var checkpointRealName;
    //   var checkpointName = checkpoint.name;
    //   if (checkpoint.located) {
    //     checkpointRealName = checkpoint.realName;
    //   } else {
    //     checkpointRealName = "You haven't found me yet!"
    //   }
    //   $ionicPopup.show({
    //     title: checkpointName,
    //     subTitle: checkpointRealName,
    //     buttons: [{ text: 'Close' }]
    //   });
    // }

  }

});
