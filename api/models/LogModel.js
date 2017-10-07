'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


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
        type: {
            type: String,
            enum: ['Created', 'Deleted', 'Changed'],
            required: 'Kindly enter the type of the event'
        },
        target: {
            type: String,
            required: 'Kindly enter the target of the event'
        },
        path: {
            type: String,
            required: 'Kindly enter the path to the file'
        },
        Created_date: {
            type: Date,
            default: Date.now
        }
    }

});

module.exports = mongoose.model('Log', LogSchema);