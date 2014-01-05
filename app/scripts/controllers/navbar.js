"use strict";

angular.module("codiagApp")
  .controller("NavbarCtrl", function ($scope, $location, Userservice) {
    $scope.menu = [{
      "title": "Home",
      "link": "/"
    },
    {
      "title": "About",
      "link": "#"
    },
    {
      "title": "Contact",
      "link": "#"
    }];

    $scope.logout = function() {
        Userservice.logout();
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
