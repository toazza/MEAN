'use strict';

// Configuring the Users module
angular.module('users').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Users', 'users', 'dropdown', '/users(/create)?');
		Menus.addSubMenuItem('topbar', 'users', 'Listar Usuarios', 'users');
		Menus.addSubMenuItem('topbar', 'users', 'Novo Usuario', 'users/create');
	}
]);