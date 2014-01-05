"use strict";

angular.module("codiagApp")
    .service("UserService", function UserService() {
        return {
            getCurrentUserName: function() {
                return "THE GREAT FREEZER";
            }
        };
    });