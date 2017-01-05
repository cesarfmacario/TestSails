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
    $scope.editUser = function(id) {
        $location.path('/user/edit/' + id);
    };    
    $scope.destroyUser = function(id) {
        UsersFactory.destroyUser(id).catch(onError);
    };
    var onListUsers = function() {
        UsersFactory.getUsers().then(onUsersComplete, onError);
    };   

    onListUsers();

    var socket = io.socket;
    var listener = function(eventName) {
        socket.on(eventName, function(res) {
            if(res.data) return onListUsers();
        });
    }
    listener('userCreated');
    listener('userEditted');
    listener('userDestroyed');

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
        UsersFactory.editUser($scope.user).then(onEditUser).catch(onError);
    };

    var id = $routeParams.id;
    UsersFactory.getUser(id).then(onUserComplete, onError);

}]);

///////////////////////////////////////////////////////////////////////////////////

app.controller('IndexController', ["$scope", "TweetFactory", function($scope, TweetFactory) {

    var login = {
      "id": "58659484fbbd5e5f48a229d7",
      "firstName": "César Francisco",
      "lastName": "Macario Ixcot",
      "username": "cmchecha",
      "email": "checha@checha.com",
      "isAdmin": false
    }
    $scope.login = login;

    var onTweetsComplete = function(data) {
        var res = data;
        $scope.tweets = data;
    };
    var onError = function(reason) {
        console.log(reason);
        $scope.error = reason;
    };
    $scope.createTweet = function() {
        tweet = {
            tweet: $scope.tweet,
            user: $scope.login
        }
        TweetFactory.createTweet(tweet).then(onError);
    };
    var onListTweets = function() {
        TweetFactory.getTweets().then(onTweetsComplete, onError);
        
    };

    onListTweets();

    var socket = io.socket;
    var listener = function(eventName) {
        socket.on(eventName, function(res) {
            if(res.data) return onListUsers();
        });
    }
    listener('tweetCreated');

}]);