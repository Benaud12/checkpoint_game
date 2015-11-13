checkpointApp.controller('GameCtrl', function(DatabaseDataFactory, CurrentGameDataFactory, CurrentLocationFactory, $scope, $state, $firebaseObject, $ionicPopup){

  var ref = DatabaseDataFactory;
  var syncObject = $firebaseObject(ref);
  var authData = ref.getAuth();
  var currentGameRef, nextCheckpointRef, nextCheckpoint, gameSyncObject;

  if (authData) {

    CurrentGameDataFactory(authData.uid, function(returnVal) {
      if (returnVal) {
        currentGameRef = returnVal.ref();
        gameSyncObject = $firebaseObject(currentGameRef);
        gameSyncObject.$bindTo($scope, 'currentGame');
        currentGameName = returnVal.key();

        var gameComplete = isAllLocated(returnVal.val().checkpoints)
        console.log('game complete', gameComplete)
        if (!gameComplete) {
          nextCheckpoint = findNext(returnVal.val().checkpoints)
          nextCheckpointRef = currentGameRef.child('checkpoints').child(nextCheckpoint.id);
          CurrentLocationFactory(function(returnVal) {
            console.log('location', returnVal)
            var currentLocation = returnVal;
            distanceUpdate(currentLocation)
          });
        }

      };
    });

    var distanceUpdate = function(userLocation) {
      var link = 'users/' + authData.uid + '/games/' + gameSyncObject.$id;
      var userData = ref.child('users').child(authData.uid);
      var targetLocation = [nextCheckpoint.position.latitude, nextCheckpoint.position.longitude];
      var distanceToTarget = GeoFire.distance(userLocation, targetLocation);
      var changes = dataChanges(distanceToTarget)
      console.log('changes', changes)
      if (changes.located) {
        locatedPopup();
      };
      nextCheckpointRef.update( dataChanges(distanceToTarget) );
      ref.child(link).once('value', function(snapshot) {
        var checkpoints = snapshot.val().checkpoints;
        console.log('new cps', checkpoints);
        var nexty = findNext(gameSyncObject.checkpoints)
        nexty.located = true;
        console.log('sync cps', gameSyncObject.checkpoints)
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
        return ({color: '#26ED33', located: true})
      }
    };

    var locatedPopup = function() {
      console.log("how many of me?")
      // $ionicPopup.show({
      //   template: nextCheckpoint.realName,
      //   title: 'Congratulations!',
      //   subTitle: 'You have successfully located...',
      //   buttons: [{ text: 'Close' }]
      // });
    };

    $scope.quitGame = function() {
      if (currentGameRef) {
        currentGameRef.update({
          currentGame: false
        });
        document.location.reload();
      };
    };

    $scope.nextCheckpoint = function(checkpoints) {
      return findNext(checkpoints);
    };

    $scope.startGame = function(gameName) {
      var userLink = 'users/' + authData.uid
      var gameLink = 'games/' + gameName;
      var startTime = new Date();

      if (currentGameRef) {
        currentGameRef.update({
          currentGame: false
        });
      };

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

  };

});
