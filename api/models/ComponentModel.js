'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ComponentSchema = new Schema({
	status : {
		type: String,
		enum: ['Stored', 'In-use', 'Broken', 'Expired'],
		required: 'Kindly enter the status(Stored, In-use, Broken or Expired) of the component'
	},
	name : {
		type: String,
		required: 'Kindly enter the name of the component'
	},
	comment : {
		type: String,
		required: 'Kindly enter the comment of the component'
	},
	timestamp : {
		type: Date,
		default: Date.now 
	}
});

module.exports = mongoose.model('Component', ComponentSchema);