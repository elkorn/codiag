(function(window, angular, Firebase, FirebaseSimpleLogin, codiag, undefined) {
    "use strict";
    var ref = new Firebase("https://codiag.firebaseio.com");

    angular.module("codiagApp")
      .service("Userservice", function Userservice($location, $rootScope) {
            
            var loggedUser = null;
            var originalPath = null;
            var auth = new FirebaseSimpleLogin(ref, function(error, user) {
                if (error) {
                    // an error occurred while attempting login
                    $rootScope.$broadcast("login:error", error);
                } else if (user) {
                    // user authenticated with Firebase
                    loggedUser = user;
                    if (originalPath) {
                        $location.path(originalPath);
                        originalPath = null;
                    }
                    else {
                        $location.path("/rooms/");
                    }
                    if(!$rootScope.$$phase) {
                        $rootScope.$apply();
                    }
                } else {
                    // user is logged out
                    if (loggedUser !== null) {
                        $location.path("/login");
                        if(!$rootScope.$$phase) {
                            $rootScope.$apply();
                        }
                    }
                    loggedUser = null;
                }
            });
  
            return {
                setOriginalPath: function(path) {
                    originalPath = path;
                },
                getUserService: function() {
                    return auth;
                },
                getCurrentUserName: function() {
                    return loggedUser.email;
                },
                getCurrentUserId: function() {
                    return loggedUser.id;
                },
                login: function(email, password) {
                    auth.login("password", {
                        email: email,
                        password: password
                    });
                },
                logout: function() {
                    auth.logout();
                    loggedUser = null;
                },
                isUserLogged: function() {
                    if (loggedUser)
                        return loggedUser.id;
                    else
                        return null;
                },
                register: function(email, password) {
                    auth.createUser(email, password, function(error, user) {
                        if (!error) {
                            $rootScope.$broadcast("register:ok");
                        }
                        else {
                            $rootScope.$broadcast("register:error", error);
                        }
                    });
                }
            };
      });

})(window, window.angular, window.Firebase, window.FirebaseSimpleLogin, window.codiag);