"use strict";

angular.module("codiagApp")
  .controller("NavbarCtrl", function ($scope, $location, Userservice) {
    $scope.menu = [{
      "title": "Home",
      "link": "/"
    },
    {
      "title": "About",
      "link": "/about"
    },
    {
      "title": "Contact",
      "link": "/contact"
    }];

    $scope.logout = function() {
        Userservice.logout();
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
    
    $scope.userLogged = Userservice.isUserLogged();
    
    $scope.username = Userservice.getCurrentUserName;
  });
