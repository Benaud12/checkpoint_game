checkpointApp.controller('GameCtrl', function(DatabaseDataFactory, CurrentLocationFactory, $scope, $state, $firebaseObject, $ionicPopup){

  var ref = DatabaseDataFactory;
  var syncObject = $firebaseObject(ref);
  $scope.authData = ref.getAuth();

  syncObject.$bindTo($scope, 'data');

});
