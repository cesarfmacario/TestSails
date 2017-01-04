var app = angular.module("app", ["ngRoute", "app.controllers"]);

app.config(["$routeProvider", function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "partials/tweet/index.html"
        })
        .when("/user", {
            templateUrl: "partials/user/index.html",
            controller: "UserController"
        })
        .when("/user/create", {
            templateUrl: "partials/user/new.html",
            controller: "UserCreateCtrl"
        })
        .when("/user/edit/:username", {
            templateUrl: "partials/user/edit.html",
            controller: "UserEditCtrl"
        })
        .when("/user/destroy/:username", {
            templateUrl: "partials/user/edit.html",
            controller: "UserEditCtrl"
        })
        .otherwise({redirectTo:"/"});
}]);