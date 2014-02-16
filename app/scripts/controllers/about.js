"use strict";

angular.module("codiagApp")
  .controller("AboutCtrl", function ($scope, $http) {
    $http.get("/api/awesomeThings").success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $http.get("/api/version").success(function(version) {
      $scope.version = version;
    });
  });
