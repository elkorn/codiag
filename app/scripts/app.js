"use strict";

angular.module("codiagApp", [
  "ngResource",
  "ngRoute"
])
.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "partials/main",
            controller: "MainCtrl",
            access: "all"
        })
        .when("/login", {
            templateUrl: "partials/login",
            controller: "LoginCtrl",
            access: "not-user"
        })
        .when("/rooms", {
            templateUrl: "partials/rooms",
            controller: "RoomsCtrl",
            access: "user"
        })
        .when("/rooms/:roomId", {
            templateUrl: "partials/diagram-room",
            controller: "DiagramCtrl",
            access: "user"
        })
        .when("/about", {
          templateUrl: "partials/about",
          controller: "AboutCtrl"
        })
        .when("/contact", {
          templateUrl: "partials/contact",
          controller: "ContactCtrl"
        })
        .otherwise({
            redirectTo: "/"
        });
    $locationProvider.html5Mode(true);
})
.run( function($rootScope, $location, Userservice, UserRoomService) {
    if ($location.path() !== "/login" && $location.path() !== "/") {
        Userservice.setOriginalPath($location.path());
    }
    
    $rootScope.$on("$routeChangeStart", function(event, next, current) {
        // will move this somewhere else eventually
        UserRoomService.roomUnregisterUser();
        if ( !Userservice.isUserLogged() ) {
            if (next.access === "user") {
                $location.path("/login");
            }
        }
        else {
            if (next.access === "not-user") {
                $location.path("/");
            }
        }
        
        
    });
});