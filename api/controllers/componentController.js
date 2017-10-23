'use strict';

var mongoose = require('mongoose'),
  Component = mongoose.model('Component'),
  Project = mongoose.model('Project'),
  ComponentType = mongoose.model('ComponentType'),
  Log = mongoose.model('Log'),
  ComponentLog = mongoose.model('ComponentLog');

exports.list_all_components = function(req, res) {
  Component.find({}, function(err, component) {
    if (err)
      res.send(err);
    res.json(component);
  });
};




exports.create_a_component = function(req, res) {
    var new_component = new Component(req.body);
    var username = "ThomasTemp"; //TODO: Get user id from JWT
    var projectId = req.params.projectId;
    var submitionComment = req.body.logComment;
    var ComponentTypeId = req.params.componentTypeId;    
    var new_log = new Log({ submitter: username, comment: submitionComment, event: { type: "Created", target: new_component._id } });

    if(!submitionComment){
        res.json(400, { error : "No logComment supplied" });
        return;
    }

    new_component.validate(function(err) {
    if (err) 
        res.status(500).send(err);  
        return;
    });
    
    
    Project.findOneAndUpdate(
        { "_id" : projectId, "component_type._id" : ComponentTypeId}, 
        {$push : {"component_type.$.component" : new_component, "log": new_log,}}, 
        { safe: true, upsert: false, new: true },
        function(err, model){
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(model.component_type);
            }
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
