"use strict";

angular.module("codiagApp")
  .controller("MainCtrl", function ($scope, $http, Userservice) {
    $scope.loginError = '';
      
    $http.get("/api/awesomeThings").success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });
    
    $scope.login = function() {
        $scope.loginError = '';
        Userservice.login($scope.email, $scope.pass);
    };
    
    $scope.$on("login:error", function(event, error) {
        switch(error.code)
        {
            case "INVALID_EMAIL":
                $scope.loginError = "Invalid email address.";
                break;
            case "INVALID_USER":
                $scope.loginError = "User does not exist.";
                break;
            case "INVALID_PASSWORD":
                $scope.loginError = "Invalid password.";
                break;
            default:
                $scope.loginError = "Problem with login service, please try later.";
        }
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    });
  });
