'use strict';

angular.module('users').controller('UsersController', ['$scope', '$http', '$stateParams', '$location', 'Authentication', 'Users', 'Master',  
	function($scope, $http, $stateParams, $location, Authentication, Users, Master) {
		$scope.authentication = Authentication;

		// If user is not signed in then redirect back home
		//if (!$scope.user) $location.path('/');

		$scope.create = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				//$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('users');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.remove = function(user) {

			if (Authentication.user.roles === 'master') {
				user.$remove();

				/*for (var i in $scope.users) {
					if ($scope.users[i] === user) {
						$scope.users.splice(i, 1);
					}
				}*/
			} else {
				$scope.user.$remove(function() {
					$location.path('users');
				});
			}
		};

		$scope.update = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);

				user.$update(function(response) {
					$scope.success = true;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

		$scope.find = function() {
			$scope.users = Master.query();
		};

		$scope.findOne = function() {
			 $scope.user = Master.get({
				userId: $stateParams.userId
			});
		};
	}
]);