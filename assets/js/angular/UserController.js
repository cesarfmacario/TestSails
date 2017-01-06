var app = angular.module('app');

app.controller('UserController', ["$scope", "$rootScope", "$location", "UsersFactory", "ModalService", 
    function($scope, $rootScope, $location, UsersFactory, ModalService) {    

    //////////////// GLOBAL FUNCTIONS ////////////////
    var onError = function(reason) {
        console.log(reason);
        $scope.error = reason;
    };

    //////////////// TO LIST USERS ////////////////
    var onGetUsersComplete = function(data) {
        $scope.users = data;
    };
    var onListUsers = function() {
        UsersFactory.getUsers().then(onGetUsersComplete, onError);
    };

    onListUsers();

    //////////////// TO VIEW A USER ////////////////
    var onViewUser = function(data) {
        var user = data;
        ModalService.showModal({
            templateUrl: "partials/user/formUserModal.html",
            controller: "UserEditController",
            inputs: {
                user: user
            }
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(result) {
            });
        });
    }
    $scope.viewUser = function(id) {
        //  OPEN MODAL
        UsersFactory.getUser(id).then(onViewUser, onError);
    };

    //////////////// TO CREATE A USER ////////////////
    $scope.createUser = function() {
        //  OPEN MODAL
        ModalService.showModal({
            templateUrl: "partials/user/formNewModal.html",
            controller: "UserNewController"
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(result) {
                if(result.user) {
                    return saveUser(result.user);
                }
            });
        });
    };
    var onCreateUser = function(data) {
        if(data == 'success') {
            return true;    //  CLOSE MODAL;
        }
        else return alert(data);
    };
    var saveUser = function(user) {
        user.isAdmin = false;
        UsersFactory.createUser(user).then(onCreateUser, onError);
    };

    //////////////// TO EDIT A USER ////////////////
    var onGetUser = function(data) {
        ModalService.showModal({
            templateUrl: "partials/user/formEditModal.html",
            controller: "UserEditController",
            inputs: {
                user: data
            }
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(result) {
                if(result.user) {
                    return saveEditUser(result.user);
                }
            });
        });
    };
    $scope.editUser = function(id) {
        UsersFactory.getUser(id).then(onGetUser, onError);
    }
    var onEditUser = function(data) {
        if(data == 'success') {
            return true;    //  CLOSE MODAL;
        }
        else return alert(data);
    }
    var saveEditUser = function(user) {
        UsersFactory.editUser(user).then(onEditUser, onError);
    };

    //////////////// TO DESTROY A USER ////////////////  
    var onDestroyUser = function(data) {
        var message = "";
        if(data == 'success') message = "Usuario eliminado exitosamente";
        else message = data;
        ModalService.showModal({
            templateUrl: "partials/modal/noticeModal.html",
            controller: "NoticeController",
            inputs: {
                title: "¿Eliminar usuario?",
                message: message
            }
        })
        .then(function(modal) {
            modal.element.modal();
            modal.close.then(function(result) {
            });
        });
    };
    $scope.destroyUser = function(id, username) {
        //  OPEN MODAL WITH MESSAGE
        ModalService.showModal({
            templateUrl: "partials/modal/yesNoModal.html",
            controller: "YesNoController",
            inputs: {
                title: "¿Eliminar usuario?",
                message: "Desea eliminar al usuario " + username
            }
        })
        .then(function(modal) {
            modal.element.modal();
            modal.close.then(function(result) {
                if(result) return UsersFactory.destroyUser(id).then(onDestroyUser, onError);
            });
        });
        
    };

    //////////////// SOCKET IO REALTIME LISTENER ////////////////
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

