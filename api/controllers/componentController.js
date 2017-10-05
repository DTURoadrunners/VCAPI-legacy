'use strict';

var mongoose = require('mongoose'),
  Component = mongoose.model('Component');

exports.list_all_components = function(req, res) {
  Component.find({}, function(err, component) {
    if (err)
      res.send(err);
    res.json(component);
  });
};




exports.create_a_component = function(req, res) {
  var new_component = new Component(req.body);
  new_component.save(function(err, component) {
      res.send(err);
    res.json(component);
  });
};


exports.read_a_component = function(req, res) {
  Component.findById(req.params.componentId, function(err, component) {
    if (err)
      res.send(err);
    res.json(component);
  });
};


exports.update_a_component = function(req, res) {
  Component.findOneAndUpdate({_id: req.params.componentId}, req.body, {new: true}, function(err, component) {
    if (err)
      res.send(err);
    res.json(component);
  });
};


exports.delete_a_component = function(req, res) {
  Component.remove({
    _id: req.params.componentId
  }, function(err, component) {
    if (err)
      res.send(err);
    res.json({ message: 'Component successfully deleted' });
  });
};
