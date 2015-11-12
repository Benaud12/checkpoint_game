checkpointApp.controller('CheckpointsCtrl', function(DatabaseDataFactory, CurrentGameDataFactory, $scope, $state, $firebaseObject, $ionicPopup){

  var ref = DatabaseDataFactory;
  var authData = ref.getAuth();

  if (authData) {

    CurrentGameDataFactory(authData.uid, function(returnVal) {
      if (returnVal) {
        console.log('return', returnVal.val());

        currentGameRef = returnVal.ref();
        // currentGameName = returnVal.key();
        // $scope.data.nextCheckpoint = findNext(returnVal.val().checkpoints)
        // gameComplete = isAllLocated(returnVal.val().checkpoints)
        // $scope.data.currentGame = returnVal.val();
        // $scope.data.currentGameName = currentGameName
        // var checkpoints = returnVal.val().checkpoints
        var checkpointsRef = currentGameRef.child('checkpoints')

        var syncCheckpointsObject = $firebaseObject(checkpointsRef)
        syncCheckpointsObject.$bindTo($scope, 'checkpoints');
        // var gameSyncObject = $firebaseObject(currentGameRef);
        // gameSyncObject.$bindTo($scope, 'currentGame');
        // if (!$scope.data.gameComplete) {
        //   CurrentLocationFactory(function(returnVal) {
        //     var currentLocation = returnVal;
        //     // $scope.$apply(function(){
        //       $scope.distanceUpdate(currentLocation)
        //     // });
        //   });
        // }
      }

    });


    // $scope.distanceUpdate = function(userLocation) {
    //   var checkpointId = $scope.data.nextCheckpoint.id;
    //   var link = 'users/' + authData.uid + '/games/' + currentGameName;
    //   var checkpointData = ref.child(link).child('checkpoints').child(checkpointId);
    //   var userData = ref.child('users').child(authData.uid);
    //   var targetLocation = [$scope.data.nextCheckpoint.position.latitude, $scope.data.nextCheckpoint.position.longitude];
    //   var distanceToTarget = GeoFire.distance(userLocation, targetLocation);
    //   // $scope.humanDistanceToTarget =  ($scope.distanceToTarget * 1000).toFixed(0);
    //   checkpointData.update( dataChanges(distanceToTarget) );
    //   console.log('location', userLocation)

    //   ref.child(link).once('value', function(snapshot) {
    //     var checkpoints = snapshot.val().checkpoints;
    //     if (isAllLocated(checkpoints)) {
    //       finishTime = new Date();
    //       ref.child(link).update({finished: finishTime});
    //       $scope.data.gameComplete = true;
    //     } else {
    //       userData.once('value', function(snapshot) {
    //         if ( snapshot.val().distance < distanceToTarget ) {
    //           $scope.data.hysteresis = { hotOrCold: 'Getting colder...' };
    //         } else {
    //           $scope.data.hysteresis = { hotOrCold: 'Getting warmer...' };
    //         };
    //         // var humanDistanceToTarget = (distanceToTarget * 1000).toFixed();


    //         userData.update( {distance: distanceToTarget} );
    //         console.log('distnce', distanceToTarget)
    //         console.log('finished')
    //       });

    //     };

    //   });

    // };

    // $scope.quitGame = function() {
    //   if (currentGameRef) {
    //     currentGameRef.update({
    //       currentGame: false
    //     });
    //     document.location.reload();
    //   };
    // };

    // var dataChanges = function(distanceToTarget) {
    //   if (distanceToTarget > 3) {
    //     return ({color: '#447BF2'})
    //   }
    //   else if ( distanceToTarget > 1.5 ) {
    //     return ({color: '#8FB091'})
    //   }
    //   else if ( distanceToTarget > 0.5 ) {
    //     return ({color: '#ECF218'})
    //   }
    //   else if ( distanceToTarget > 0.2 ) {
    //     return ({color: '#FCB50F'})
    //   }
    //   else if ( distanceToTarget > 0.1 ) {
    //     return ({color: '#FA8F17'})
    //   }
    //   else if ( distanceToTarget > 0.05 ) {
    //     return ({color: '#F50733'})
    //   }
    //   else if ( distanceToTarget <= 0.05) {
    //     locatedPopup();
    //     return ({color: '#26ED33', located: true})
    //   }
    // };

    // var locatedPopup = function() {
    //   $ionicPopup.show({
    //     template: $scope.data.nextCheckpoint.realName,
    //     title: 'Congratulations!',
    //     subTitle: 'You have successfully located...',
    //     buttons: [{ text: 'Close' }]
    //   });
    // };

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
