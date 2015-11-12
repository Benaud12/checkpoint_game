checkpointApp.controller('NextCheckpointCtrl', function(DatabaseDataFactory, CurrentLocationFactory, CurrentGameDataFactory, $scope, $state, $firebaseObject, $ionicPopup){

  var ref = DatabaseDataFactory;
  var authData = ref.getAuth();
  var nextCheckpointRef, currentGameName;

  if (authData) {

    CurrentGameDataFactory(authData.uid, function(returnVal) {
      if (returnVal) {
        var currentGameRef = returnVal.ref();
        currentGameName = returnVal.key();
        var gameComplete = isAllLocated(returnVal.val().checkpoints)

        if (!gameComplete) {
          var nextCheckpoint = findNext(returnVal.val().checkpoints)
          var checkpointId = nextCheckpoint.id
          nextCheckpointRef = currentGameRef.child('checkpoints').child(checkpointId);
          syncNextCheckpointObject = $firebaseObject(nextCheckpointRef);
          syncNextCheckpointObject.$bindTo($scope, 'nextCheckpoint');
          CurrentLocationFactory(function(returnVal) {
            var currentLocation = returnVal;
            distanceUpdate(currentLocation)
          });
        }
      }

    });

    var distanceUpdate = function(userLocation) {
      var link = 'users/' + authData.uid + '/games/' + currentGameName;
      var userData = ref.child('users').child(authData.uid);
      var targetLocation = [syncNextCheckpointObject.position.latitude, syncNextCheckpointObject.position.longitude];
      var distanceToTarget = GeoFire.distance(userLocation, targetLocation);
      nextCheckpointRef.update( dataChanges(distanceToTarget) );
      ref.child(link).once('value', function(snapshot) {
        var checkpoints = snapshot.val().checkpoints;
        if (isAllLocated(checkpoints)) {
          finishTime = new Date();
          ref.child(link).update({finished: finishTime});
        } else {
          userData.once('value', function(snapshot) {
            if ( snapshot.val().distance < distanceToTarget ) {
              $('#hysteresis').text('Getting colder...');
            } else {
              $('#hysteresis').text('Getting warmer...');
            };
            userData.update( {distance: distanceToTarget} );
          });

        };

      });

    };

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

  };

});
