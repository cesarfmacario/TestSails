var app = angular.module("app.factories", []);

app.factory('UsersFactory', function($http)
{
    var getUsers = function() {
        return $http.get('/api/user')
                    .then(function(response) {
                        return response.data;
                    });
    };
    var getUser = function(id) {
        return $http.get('/api/user/' + id)
                    .then(function(response) {
                        return response.data;
                    });
    };
    var createUser = function(user) {
        return $http.post('/api/user/create', user)
                    .then(function(response) {
                        return response.data;
                    });
    };
    var editUser = function(user) {
        return $http.post('/api/user/edit/' + user.id, user)
                    .then(function(response) {
                        return response.data;
                    });
    };
    var destroyUser = function(id) {
        return $http.post('/api/user/destroy/' + id)
                    .then(function(response) {
                        return response.data;
                    });
    };

    return {
        getUsers: getUsers,
        getUser: getUser,
        createUser: createUser,
        editUser: editUser,
        destroyUser: destroyUser
    };
});

app.factory('TweetFactory', function($http) {
    var getTweets = function() {
        return $http.get('/api/tweet')
                    .then(function(response) {
                        return response.data;
                    });
    };
    var getTweet = function(id) {
        return $http.get('/api/tweet/' + id)
                    .then(function(response) {
                        return response.data;
                    });
    };
    var createTweet = function(tweet) {
        return $http.post('/api/tweet/create', tweet)
                    .then(function(response) {
                        return response.data;
                    });
    };

    return {
        getTweets: getTweets,
        getTweet: getTweet,
        createTweet: createTweet
    }
});