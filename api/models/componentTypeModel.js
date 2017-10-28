'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var componentModel = require('./ComponentModel.js');

var componentTypeSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of the component type'
  },
  category: {
    type: String,
    require: 'Kindly enter the category of the component type'
  },
  storage: {
    type: Number,
    require: 'Kindly enter the storage of the component type'
  },
  description: {
    type: String,
    require: 'Kindly enter the description of the component type'
  },
  document: [{type: Schema.Types.ObjectId, ref: 'Document'}],
  component:  [componentModel.schema]
  
});

module.exports = mongoose.model('ComponentType', componentTypeSchema);