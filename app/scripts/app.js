"use strict";

angular.module("codiagApp", [
  "ngResource",
  "ngRoute"
])
.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "partials/main",
            controller: "MainCtrl"
        })
        .when("/rooms", {
            templateUrl: "partials/rooms",
            controller: "RoomsCtrl"
        })
        .when("/rooms/:roomId", {
            templateUrl: "partials/diagram-room",
            controller: "DiagramCtrl"
        })
        .otherwise({
            redirectTo: "/"
        });
    $locationProvider.html5Mode(true);
})
.run( function($rootScope, $location, Userservice, UserRoomService) {
    if ($location.path() !== "/") {
        Userservice.setOriginalPath($location.path());
    }
    
    $rootScope.$on("$routeChangeStart", function(event, next, current) {
        // will move this somewhere else eventually
        UserRoomService.roomUnregisterUser();
        if ( !Userservice.isUserLogged() ) {
            if (next.templateUrl !== "partials/main") {
                $location.path("/");
            }
        }
        else {
            if (next.templateUrl === "partials/main") {
                $location.path("/rooms/");
            }
        }
    });
});