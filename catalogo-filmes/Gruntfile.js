module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
	  concat: {
	    js: {
	      src: ['public/bower_components/angular/angular.js', 'public/bower_components/jquery/dist/jquery.js', 'public/bower_components/bootstrap/dist/js/bootstrap.js'],
	      dest: 'public/dist/js/scripts.js',
	    },
	    css: {
	      src: ['public/bower_components/bootstrap/dist/css/bootstrap.css', 'public/bower_components/bootstrap/dist/css/bootstrap-theme.css', 'css/main.css'],
	      dest: 'public/dist/css/style.css',
	    },
	  },
	});

	grunt.loadNpmTasks('grunt-contrib-concat');

};