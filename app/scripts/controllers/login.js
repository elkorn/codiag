'use strict';

angular.module('codiagApp')
  .controller('LoginCtrl', function ($scope, Userservice) {
    
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
