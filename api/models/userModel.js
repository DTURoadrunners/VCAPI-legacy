var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
  _id: {
    type: String,
    required: 'Kindly enter the id of the user'
  },
  Firstname: {
    type: String,
    required: 'Kindly enter the firstname of the user'
  },
  Lastname: {
    type: String,
    required: 'Kindly enter the lastname of the user'
  },
  phone_number_1: {
    type: String,
    required: 'Kindly enter the users phone number'
  },
  phone_number_2: {
    type: String
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  password:{
	type: String,
	required: 'Kindly enter a password'	
  }
});

module.exports = mongoose.model('User', UserSchema);
