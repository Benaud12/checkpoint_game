checkpointApp.controller('GameListCtrl', function(DatabaseDataFactory, $scope, $state, $firebaseObject){
  var ref = DatabaseDataFactory;
  var syncObject = $firebaseObject(ref);
  syncObject.$bindTo($scope, 'data');
});
