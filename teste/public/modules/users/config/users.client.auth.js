angular.module('users').run(function ($rootScope, $scope, $location, Authentication, Users) {

  // enumerate routes that don't need authentication
  var routesThatDontRequireAuth = '/users';
  var routesThatForAdmins = '/admin';

  // check if route does not require authentication
  var routeClean = function(route) { 
    if ( route == routesThatDontRequireAuth) {
      return true;
    } else return false;
  }
  // check if route requires admin priviledge
  var routeAdmin = function(route) { 
     if ( route == routesThatForAdmins) {
      return true;
    } else return false;
   }

  $rootScope.$on('$stateChangeStart', function (ev, to, toParams, from, fromParams) {
    
    if (!routeClean($location.url()) && !$scope.user) {
      // redirect back to login
      $location.path('/login');
    }
    else if (routeAdmin($location.url()) && !User.validateRoleAdmin()) {
      // redirect to error page
      $location.path('/error');
    }
  });
});