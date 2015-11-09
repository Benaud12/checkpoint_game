//app.spec.js
describe('CheckpointApp', function() {
    var $scope;

    beforeEach(module('app', 'firebase'));

    // beforeEach(inject(function($rootScope, $controller) {
    //     $scope = $rootScope.$new();
    //     $controller('PageController', {$scope: $scope})
    // }));

    it('some test desc ...', inject(function (checkpointApp, $firebase) {
      // now we can use $firebase!!
      fireSync = $firebase(new Firebase('https://checkpoint-game.firebaseio.com/games/game1/checkpoints'));
      expect(true).to.equal(true);
    }));

    xit('regularFirebaseValue should equal "testValue"', function(done) {
        setTimeout(function(){
            //This passes
            expect($scope.regularFirebaseValue).to.equal('testValue');
            done();
        }, 1900)
    });

    xit('angularFireValue should equal "testValue"', function(done) {
        setTimeout(function(){
            //This does NOT pass
            expect($scope.angularFireValue).to.equal('testValue');
            done();
        }, 1900)
    });
});