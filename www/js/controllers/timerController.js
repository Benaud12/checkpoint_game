checkpointApp.controller('TimerCtrl', function(DatabaseDataFactory, CurrentGameDataFactory, $scope, $state){

  var ref = DatabaseDataFactory;
  var authData = ref.getAuth();
  var currentGameRef;

  if (authData) {

    CurrentGameDataFactory(authData.uid, function(returnVal) {
      if (returnVal) {
        currentGameRef = returnVal.ref();

        function startTime() {
          currentGameRef.once('value', function(snapshot) {
            var game = snapshot.val();
            var startTime = Date.parse(game.started);
            var timeNow = new Date().getTime();
            var timeElapsedMilli = timeNow - startTime;
            var timeElapsed = new Date(timeElapsedMilli);
            var h = timeElapsed.getHours();
            var m = timeElapsed.getMinutes();
            var s = timeElapsed.getSeconds();
            h = checkTime(h);
            m = checkTime(m);
            s = checkTime(s);
            $('#timer').text(h + ":" + m + ":" + s);

            function checkTime(i) {
              if (i < 10) {i = "0" + i};
              return i;
            };

          });
        };

        function newTimer() {
          setInterval(startTime, 500);
        };

        newTimer();

      };

    });

  };

});





