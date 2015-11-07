var checkpointApp = angular.module("CheckpointApp", ["firebase"]);

var ref = new Firebase("https://checkpoint-game.firebaseio.com/games/game1/checkpoints");
ref.set({
  a: {
      id: 'a',
      name: "Checkpoint One",
      realName: "Makers Academy One",
      position: { latitude: 51.517399, longitude: -0.07346970000000001 },
      located: false,
      color: '#FFFFFF',
      mapPositionTop: 21,
      mapPositionLeft: 17,
      clue: "The same number of days Christmas weeks' coding."
      },
  b: {
      id: 'b',
      name: "Checkpoint Two",
      realName: "Aldgate East Tube Station",
      position: { latitude: 51.5152, longitude: -0.0722 },
      located: false,
      color: '#FFFFFF',
      mapPositionTop: 70,
      mapPositionLeft: 33,
      clue: "A local transport hub which opened on 6 October 1884."
      },
   c: {
      id: 'c',
      name: "Checkpoint Three",
      realName: "The Culpepepeper",
      position: { latitude: 51.516908, longitude: -0.073123 },
      located: false,
      color: '#FFFFFF',
      mapPositionTop: 50,
      mapPositionLeft: 45,
      clue: "Not far to this watering hole which was once called the Princess Alice."

      },
    d: {
      id: 'd',
      name: "Checkpoint Four",
      realName: "The Pride of Spitalfields",
      position: { latitude: 51.518854, longitude: -0.071221 },
      located: false,
      color: '#FFFFFF',
      mapPositionTop: 12,
      mapPositionLeft: 65,
      clue: "The only real East End boozer for miles around. And it has a cat!"
      },
    e: {
      id: 'e',
      name: "Checkpoint Five",
      realName: "The Ten Bells",
      position: { latitude: 51.519323, longitude: -0.074320 },
      located: false,
      color: '#FFFFFF',
      mapPositionTop: 85,
      mapPositionLeft: 80,
      clue: "Annie Chapman was drinking here before Jack the Ripper struck..."
      }
  });
