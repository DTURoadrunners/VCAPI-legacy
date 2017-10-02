'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userModel = require('./userModel.js');
var logModel = require('./LogModel.js');
var componentModel = require('./componentTypeModel.js');


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
	log: [logModel.schema],
	component_type: [componentModel.schema]

});

module.exports = mongoose.model('Project', ProjectSchema);