"use strict";

angular.module("codiagApp", [
  "ngResource",
  "ngRoute",
  "btford.socket-io",
  "firebase"
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
  });