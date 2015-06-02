'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	User = mongoose.model('User'),
	_ = require('lodash');

/**
 * Create user
 */
exports.create = function(req, res) {
	var user = new User(req.body);

	user.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(user);
		}
	});
};

/**
 * Show the current user
 */
exports.read = function(req, res) {
	res.json(req.user);
};

/**
 * Update a user
 */
exports.update = function(req, res) {
	var user = req.user;

	user = _.extend(user, req.body);

	user.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(user);
		}
	});
};

/**
 * Delete an user
 */
exports.delete = function(req, res) {
	var user = req.user;

	user.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(user);
		}
	});
};

/**
 * List of Users
 */
exports.list = function(req, res) {
	User.find().sort('-created').populate('user', 'displayName').exec(function(err, users) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(users);
		}
	});
};

/**
 * User middleware
 */
exports.userByID = function(req, res, next, id) {
	User.findById(id).populate('user', 'displayName').exec(function(err, user) {
		if (err) return next(err);
		if (!user) return next(new Error('Failed to load user ' + id));
		req.user = user;
		next();
	});
};

/**
 * User authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.user.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};