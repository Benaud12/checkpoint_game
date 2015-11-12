checkpointApp.controller("UserCtrl", function(DatabaseDataFactory, UserDataFactory, UserAdminFactory, $scope, $state, $ionicPopup, $firebaseObject) {

  var ref = DatabaseDataFactory;
  var authData = ref.getAuth();
  var syncObject = $firebaseObject(ref);
  // syncObject.$bindTo($scope, 'data')

  if (authData){
    UserDataFactory(authData.uid, function(returnVal) {
      userDataRef = returnVal.ref()
      userSyncObject = $firebaseObject(userDataRef);
      userSyncObject.$bindTo($scope, 'user');
    });

  }

  $scope.signupPopUp = function() {
    $ionicPopup.show({
      templateUrl: 'views/authenticate-signup.html',
      title: 'Give us ya deets!',
      subTitle: '...please',
      scope: $scope,
      buttons: [
        { text: 'Cancel' }
      ]
    });
  };

  $scope.loginPopUp = function() {
    $ionicPopup.show({
      templateUrl: 'views/authenticate-login.html',
      title: 'Give us ya deets!',
      subTitle: '...please',
      scope: $scope,
      buttons: [
        { text: 'Cancel' }
      ]
    });
  };

  $scope.createNewUser = function() {
    var userEmail = this.newEmail;
    var userPassword = this.newPassword;
    var confirmPassword = this.confirmPassword;
    var username = this.username;
    UserAdminFactory.validate(username, userPassword, confirmPassword);
    UserAdminFactory.signUp(username, userEmail, userPassword);
  };

  $scope.userLogin = function() {
    var userEmail = this.email;
    var userPassword = this.password;
    UserAdminFactory.login(userEmail, userPassword);
  };

  $scope.userLogout = function() {
    ref.unauth();
    document.location.reload();
  };

});
