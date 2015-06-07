'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('users').factory('Master', ['$resource',
	function($resource) {
		return $resource('users/:userId', {
			userId: '@_id'
		}, {
			update: { method: 'PUT'}
		});
	}
]);