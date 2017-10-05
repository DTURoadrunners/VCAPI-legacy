'use strict';

var mongoose = require('mongoose'),
  ComponentType = mongoose.model('ComponentType');

exports.list_all_componentsTypes = function(req, res) {
  ComponentType.find({}, function(err, componentType) {
    if (err)
      res.send(err);
    res.json(componentType);
  });
};




exports.create_a_componentType = function(req, res) {
  var new_componentType = new ComponentType(req.body);
  new_componentType.save(function(err, componentType) {
      res.send(err);
    res.json(componentType);
  });
};


exports.read_a_componentType = function(req, res) {
  ComponentType.findById(req.params.componentTypeId, function(err, componentType) {
    if (err)
      res.send(err);
    res.json(componentType);
  });
};


exports.update_a_componentType = function(req, res) {
  ComponentType.findOneAndUpdate({_id: req.params.componentTypeId}, req.body, {new: true}, function(err, componentType) {
    if (err)
      res.send(err);
    res.json(componentType);
  });
};


exports.delete_a_componentType = function(req, res) {
  ComponentType.remove({
    _id: req.params.componentTypeId
  }, function(err, component) {
    if (err)
      res.send(err);
    res.json({ message: 'ComponentType successfully deleted' });
  });
};
