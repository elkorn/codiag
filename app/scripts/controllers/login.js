'use strict';

angular.module('codiagApp')
  .controller('LoginCtrl', function ($scope, Userservice) {
    
    $scope.login = function() {
        $scope.loginError = '';
        $scope.registerError = '';
        $scope.registerOk = null;
        Userservice.login($scope.email, $scope.pass);
    };
    
    $scope.register = function() {
        $scope.loginError = '';
        $scope.registerError = '';
        $scope.registerOk = null;
        Userservice.register($scope.email, $scope.pass);
    };
    
    $scope.$on("login:error", function(event, error) {
        switch(error.code)
        {
            case "INVALID_EMAIL":
                $scope.loginError = "The specified email address is incorrect.";
                break;
            case "INVALID_USER":
                $scope.loginError = "User does not exist.";
                break;
            case "INVALID_PASSWORD":
                $scope.loginError = "The specified password is incorrect.";
                break;
            default:
                $scope.loginError = "Problem with login service, please try later.";
        }
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    });
    
    $scope.$on("register:error", function(event, error) {
        switch(error.code)
        {
            case "INVALID_EMAIL":
                $scope.registerError = "The specified email address is incorrect.";
                break;
            case "EMAIL_TAKEN":
                $scope.registerError = "The specified email address is already in use.";
                break;
            case "INVALID_PASSWORD":
                $scope.registerError = "The specified password is incorrect.";
                break;
            default:
                $scope.registerError = "Problem with login service, please try later.";
        }
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    });
    
    $scope.$on("register:ok", function(event) {
        $scope.registerOk = true;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    });
  });
