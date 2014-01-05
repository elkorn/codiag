"use strict";

angular.module("codiagApp")
  .controller("MainCtrl", function ($scope, $http, Userservice) {
    $http.get("/api/awesomeThings").success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });
    
    $scope.login = function() {
        Userservice.login($scope.email, $scope.pass);
    };
  });
