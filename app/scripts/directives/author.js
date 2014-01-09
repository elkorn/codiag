"use strict";

angular.module("codiagApp")
  .directive("author", function () {
    return {
      templateUrl: "partials/author.html",
      restrict: "A",
      link: function postLink(scope, element, attrs) {
      }
    };
  });
