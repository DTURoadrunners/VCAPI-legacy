var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var EventSchema = new Schema({
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
});

module.exports = mongoose.model('Event', EventSchema);