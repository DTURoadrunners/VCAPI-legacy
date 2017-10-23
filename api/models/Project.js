'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userModel = require('./userModel.js');
var logModel = require('./logModel.js');
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
	users: [{
			userid: Number,
			rank : {
				type: String, 
				enum: ['superuser', 'admin', 'user', 'guest'],
				default: 'guest'
			}
	}],
	log: [logModel.schema],
	component_type: [{type: Schema.Types.ObjectId, ref: 'ComponentType'}],

});

module.exports = mongoose.model('Project', ProjectSchema);
