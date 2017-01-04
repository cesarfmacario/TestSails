var app = angular.module('app.controllers', ['app.factories']);

app.controller('UserController', ["$scope", "$location", "$routeParams", "UsersFactory", 
    function($scope, $location, $routeParams, UsersFactory) {    

    var onUsersComplete = function(data) {
        $scope.users = data;
    };
    var onError = function(reason) {
        console.log(reason);
        $scope.error = reason;
    };

    UsersFactory.getUsers().then(onUsersComplete, onError);

    $scope.editUser = function(username) {
        $location.path('/user/edit/' + username);
    };

    var onDestroyUser = function(data) {
        $location.path('/user');
    };
    $scope.destroyUser = function(username) {
        UsersFactory.destroyUser(username).then(onDestroyUser, onError);
        alert('User ' + username + ' has been deleted');
    };

}]);

app.controller('UserCreateCtrl', ["$scope", "$location", "UsersFactory", 
    function($scope, $location, UsersFactory) {

    var onUserComplete = function(data) {
        $location.path('/user');
    };
    var onError = function(reason) {
        console.log(reason);
    };
    $scope.saveUser = function() {
        $scope.user.isAdmin = false;
        UsersFactory.createUser($scope.user).then(onUserComplete, onError);
    };

}]);

app.controller('UserEditCtrl', ["$scope", "$location", "$routeParams", "UsersFactory", 
    function($scope, $location, $routeParams, UsersFactory) {

    var onUserComplete = function(data) {
        $scope.user = data;
    };
    var onEditUser = function(data) {
        if(data == 'success') return $location.path('/user');
        else { alert(data); $location.path('/user'); }
    }
    var onError = function(reason) {
        console.log(reason);
    };
    $scope.saveUser = function() {
        UsersFactory.editUser($scope.user).then(onEditUser, onError);
    };

    var username = $routeParams.username;
    UsersFactory.getUser(username).then(onUserComplete, onError);

}]);
