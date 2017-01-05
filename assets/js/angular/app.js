var app = angular.module("app", ["ngRoute", "app.controllers"]);

app.config(["$routeProvider", function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "partials/tweet/index.html",
            controller: "IndexController"
        })
        .when("/user", {
            templateUrl: "partials/user/index.html",
            controller: "UserController"
        })
        .when("/user/create", {
            templateUrl: "partials/user/new.html",
            controller: "UserCreateCtrl"
        })
        .when("/user/edit/:id", {
            templateUrl: "partials/user/edit.html",
            controller: "UserEditCtrl"
        })
        .when("/user/destroy/:id", {
            templateUrl: "partials/user/edit.html",
            controller: "UserEditCtrl"
        })
        .otherwise({redirectTo:"/"});
}]);