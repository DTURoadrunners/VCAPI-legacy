'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ComponentSchema = new Schema({
	status : {
		type: String,
		enum: ['Stored', 'In-use', 'Broken', 'Expired']
	},
	comment : String,
	timestamp : Date
});

module.exports = mongoose.model('Component', ComponentSchema);