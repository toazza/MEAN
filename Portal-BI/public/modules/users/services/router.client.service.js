'use strict';

angular.module('users').factory('UserService', function (_) {

  var currentUser = null;

  var adminRoles = ['admin', 'editor'];
  var otherRoles = ['user'];

  var _this = this;

    _this._data = {
      user: window.user
    };

    currentUser = _this;

  return {
    // some code that gets and sets the user to the singleton variable...

    validateRoleAdmin: function () {
      return _.contains(adminRoles, currentUser._data.role);
    },

    validateRoleOther: function () {
      return _.contains(otherRoles, currentUser._data.role);
    }
  };
});
