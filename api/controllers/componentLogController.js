'use strict';

var mongoose = require('mongoose'),
  ComponentLog = mongoose.model('ComponentLog');

exports.list_all_componentLogs = function(req, res) {
  ComponentLog.find({}, function(err, componentLog) {
    if (err)
      res.send(err);
    res.json(componentLog);
  });
};




exports.create_a_componentLog = function(req, res) {
  var new_componentLog = new ComponentLog(req.body);
  new_componentLog.save(function(err, componentLog) {
      res.send(err);
    res.json(componentLog);
  });
};


exports.read_a_componentLog = function(req, res) {
  ComponentLog.findById(req.params.componentLogId, function(err, componentLog) {
    if (err)
      res.send(err);
    res.json(componentLog);
  });
};


exports.update_a_componentLog = function(req, res) {
  ComponentLog.findOneAndUpdate({_id: req.params.componentLogId}, req.body, {new: true}, function(err, componentLog) {
    if (err)
      res.send(err);
    res.json(componentLog);
  });
};


exports.delete_a_componentLog = function(req, res) {
  ComponentLog.remove({
    _id: req.params.componentlogId
  }, function(err, componentLog) {
    if (err)
      res.send(err);
    res.json({ message: 'ComponentLog successfully deleted' });
  });
};
