var app = angular.module("app.factories", []);

app.factory('UsersFactory', function($http)
{
    var getUsers = function() {
        return $http.get('/api/user')
                    .then(function(response) {
                        return response.data;
                    });
    };
    var getUser = function(username) {
        return $http.get('/api/user/' + username)
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
        return $http.post('/api/user/edit/' + user.username, user)
                    .then(function(response) {
                        return response.data;
                    });
    };
    var destroyUser = function(username) {
        return $http.post('/api/user/destroy/' + username)
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