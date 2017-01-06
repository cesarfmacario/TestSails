var app = angular.module('app');

app.controller('YesNoController', ['$scope', 'title', 'message', 'close', 
	function($scope, title, message, close) {

	$scope.title = title;
	$scope.message = message;
	$scope.close = function(result) {
	  close(result, 500); // close, but give 500ms for bootstrap to animate
	};

}]);

app.controller('NoticeController', ['$scope', 'title', 'message', 'close', 
	function($scope, title, message, close) {

	$scope.title = title;
	$scope.message = message;
	$scope.close = function(result) {
	  close(result, 500); // close, but give 500ms for bootstrap to animate
	};

}]);

app.controller('UserEditController', [
  '$scope', '$element', 'user', 'close', 
  function($scope, $element, user, close) {

  $scope.user = user;
  
  //  This close function doesn't need to use jQuery or bootstrap, because
  //  the button has the 'data-dismiss' attribute.
  $scope.close = function() {
    close({ user: $scope.user }, 500); // close, but give 500ms for bootstrap to animate
  };
}]);

app.controller('UserNewController', [
  '$scope', '$element', 'close', 
  function($scope, $element, close) {
  
  //  This close function doesn't need to use jQuery or bootstrap, because
  //  the button has the 'data-dismiss' attribute.
  $scope.close = function() {
    close({ user: $scope.user }, 500); // close, but give 500ms for bootstrap to animate
  };
}]);

