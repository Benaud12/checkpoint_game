checkpointApp.factory('DatabaseDataFactory', function() {
  var dbData = new Firebase("https://checkpoint-game.firebaseio.com/");
  return dbData;
});