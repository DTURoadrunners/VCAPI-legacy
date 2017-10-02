'use strict';
var mongoose = require('mongoose');
var Component = mongoose.model('Component');
var Schema = mongoose.Schema;

var componentModel = require('./componentTypeModel.js');

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
  component: {
    type: [componentModel.Schema],
    require: 'Kindly enter the component of the component type'
  }

});

module.exports = mongoose.model('ComponentType', componentTypeSchema);