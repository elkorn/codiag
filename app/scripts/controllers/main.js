"use strict";

angular.module("codiagApp")
  .controller("MainCtrl", function ($scope, $http) {
    $scope.loginError = '';
      
    $http.get("/api/awesomeThings").success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });
    
  });
