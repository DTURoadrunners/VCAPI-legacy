'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userModel = require('userModel');


var user = require('./userModel');

var ProjectSchema = new Schema({
	name: {
		type: String,
		required: "Projects must have a name"
	},
	creation_date: {
		type: Date,
		default: Date.now 
	},
	users: [userModel.schema],
	log: [module.exports.Log],
	component_type: [module.exports.ComponentType]

});

module.exports = mongoose.model('Project', ProjectSchema);