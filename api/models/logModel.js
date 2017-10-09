'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var LogSchema = new Schema({
    submitter: {
        type: String,
        required: 'Submitter id'
    },
    timestamp: {
        type: Date,
        default: Date.now 
    },
    comment: {
        type: String,
        required: 'Submition comment'
    },
    event: {
        type: {
            type: String,
            enum: ['Created', 'Deleted', 'Changed'],
            required: 'Kindly enter the type of the event'
        },
        target: {
            type: String,
            required: 'Kindly enter the target of the event'
        },
        Created_date: {
            type: Date,
            default: Date.now
        },

      
    }
    

});

module.exports = mongoose.model('Log', LogSchema);