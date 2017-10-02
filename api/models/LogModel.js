'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var eventModel = require('./eventModel.js');


var LogSchema = new Schema({
    _id: {
        type: String,
        required: 'Log id'
    },
    submitter: {
        type: String,
        required: 'Submitter id'
    },
    timestamp: {
        type: Date,
        default: Date.timestamp,
        required: 'Creation time'
    },
    comment: {
        type: String,
        required: 'Submition comment'
    },
    event: {
        type: [eventModel.Schema],
        required: 'Type of change to the file'
    }

});

module.exports = mongoose.model('Log', LogSchema);