var app = angular.module('app');

app.controller('TweetController', ["$scope", "TweetFactory", function($scope, TweetFactory) {
    var login = {
        "id": "586593cf447740b147691bbb",
        "firstName": "admin",
        "lastName": "chococian",
        "username": "admin",
        "email": "admin@admin.com",
        "isAdmin": true
    }
    $scope.login = login;

    var onTweetsComplete = function(data) {
        $scope.tweets = data.reverse();
        $scope.tweet = "";
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
        TweetFactory.createTweet(tweet).catch(onError);
    };
    var onListTweets = function() {
        TweetFactory.getTweets().then(onTweetsComplete, onError);
    };

    onListTweets();

    var socket = io.socket;
    var listener = function(eventName) {
        socket.on(eventName, function(res) {
            if(res.data) return onListTweets();
        });
    }
    listener('tweetCreated');
}]);