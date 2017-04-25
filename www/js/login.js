var app = angular.module('ankush-sample', ['ionic']);



app.controller('LoginCtrl', function($scope, $ionicPopup) {
    $scope.facebookLogin = function() {
        // The user is logged in and has authenticated your app, and response.authResponse supplies
        // the user's ID, a valid access token, a signed request, and the time the access token
        // and signed request each expire
        facebookConnectPlugin.getLoginStatus(function(success){
            console.log("1");
            if(success.status === 'connected'){
                console.log('getLoginStatus', success.status);
            }
        },function(fail) {
            console.log("deu ruim " + fail);
        });

        // In this function you get the acknowledge that the user accepted log in with facebook giving your permissions
        var fbLoginSuccess = function(response) {
            if (!response.authResponse){
                fbLoginError("Cannot find the authResponse");
                return;
            }
            // Put here your redirection / root page / any action that happens after user logs in.
            showFacebookAlert(response.authResponse);
        };
        
        // In this function you get the failure of facebook login.
         var fbLoginError = function(error){
            console.log('fbLoginError', error);
        };

        // Calls facebook login 
        facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
        console.log("3");
    };

    $scope.googlePlusLogin = function() {

    window.plugins.googleplus.login({},
      function (user_data) {
        showGoogleAlert(user_data);

      });
    };

    var showFacebookAlert = function(response ) {
        var alertPopup = $ionicPopup.alert({
            title: 'Facebook Login',
            template: JSON.stringify(response)
        });

        alertPopup.then(function(res) {
            console.log('facebook login routine finished');
        });
    };

    var showGoogleAlert = function(response ) {
        var alertPopup = $ionicPopup.alert({
            title: 'GooglePlus Login',
            template: JSON.stringify(response)
        });

        alertPopup.then(function(res) {
            console.log('google-plus login routine finished');
        });
    };

})