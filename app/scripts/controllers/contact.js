"use strict";

angular.module("codiagApp")
  .controller("ContactCtrl", function ($scope, $http) {
    $http.get("/api/authors").success(function(authors) {
      $scope.authors = authors;
    });
  });
