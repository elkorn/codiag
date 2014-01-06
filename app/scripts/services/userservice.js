(function(window, angular, Firebase, FirebaseSimpleLogin, codiag, undefined) {
    "use strict";
    var ref = new Firebase("https://codiag.firebaseio.com");

    angular.module("codiagApp")
      .service("Userservice", function Userservice($location, $rootScope) {
            
            var loggedUser = null;
            var auth = new FirebaseSimpleLogin(ref, function(error, user) {
                if (error) {
                    // an error occurred while attempting login
                    $rootScope.$broadcast("login:error", error);
                } else if (user) {
                    // user authenticated with Firebase
                    loggedUser = user;
                    $location.path("/rooms/");
                    if(!$rootScope.$$phase) {
                        $rootScope.$apply();
                    }
                } else {
                    // user is logged out
                    loggedUser = null;
                    $location.path("/");
                    if(!$rootScope.$$phase) {
                        $rootScope.$apply();
                    }
                }
            });
  
            return {
                getUserService: function() {
                    return auth;
                },
                getCurrentUserName: function() {
                    return loggedUser.email;
                },
                login: function(email, password) {
                    auth.login("password", {
                        email: email,
                        password: password
                    });
                },
                logout: function() {
                    auth.logout();
                },
                isUserLogged: function() {
                    if (loggedUser)
                        return loggedUser.id;
                    else
                        return null;
                }
            };
      });

})(window, window.angular, window.Firebase, window.FirebaseSimpleLogin, window.codiag);