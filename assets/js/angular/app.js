var app = angular.module("app", ["ngRoute", "ngAnimate", "angularModalService"]);

app.config(["$routeProvider", function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "partials/tweet/index.html",
            controller: "TweetController"
        })
        .when("/user", {
            templateUrl: "partials/user/index.html",
            controller: "UserController"
        })
        .otherwise({redirectTo:"/"});
}]);