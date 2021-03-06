var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var DocumentSchema = new Schema({
  fileName: {
    type: String,
    required: 'Kindly enter the name of the file'
  },
  bucketPath: {
    type: String,
    required: 'Kindly enter the bucketpath of the file'
  },
  description: {
    type: String,
    required: 'Kindly enter the description of the file'
  }
});

module.exports = mongoose.model('Document', DocumentSchema);