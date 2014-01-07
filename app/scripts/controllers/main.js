"use strict";

angular.module("codiagApp")
  .controller("MainCtrl", function ($rootScope) {
    $scope.loginError = '';
    $rootScope.pageTitle = "Codiag";
  });
