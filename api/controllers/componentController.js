'use strict';

var mongoose = require('mongoose'),
  Component = mongoose.model('Component'),
  Project = mongoose.model('Project'),
  ComponentType = mongoose.model('ComponentType'),
  Log = mongoose.model('Log'),
  ComponentLog = mongoose.model('ComponentLog'),
  logController = require('./logController');

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
    var submitionComment = req.body.logComment;
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

    new_component.save(function (err, model) {
        if (err) {
            res.status(500).send(err);
        } else {
            //Create new reference in project
            Project.findByIdAndUpdate(
                { "_id": req.params.projectId, "component_type._id": req.params.componentTypeId },
                { $push: { "component_type.$.component": new_component } },
                { safe: true, upsert: false, new: true },
                function (err, model) {
                    if (err) {
                        res.status(500).send(err);
                    }
                    else {
                        //Create log entry
                        logController.create_log(model._id, username, submitionComment, "Created", new_component._id, res);
                    }
                }
            );
        }
    });
};


exports.read_a_component = function(req, res) {
    var projectId = req.params.projectId;
    var ComponentTypeId = req.params.componentTypeId; 
    var ComponentId = req.params.componentId; 
   
    Project.findById(   
        { "_id" : projectId, "component_type._id" : ComponentTypeId, "component_type.component._id" : ComponentId},
        function (err, model) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.json(model.component_type);
        }
    })

};


exports.update_a_component = function(req, res) {
    var new_component = new Component(req.body);
    var username = "ThomasTemp"; //TODO: Get user id from JWT
    var submitionComment = req.body.logComment;
    var new_log = new Log({ submitter: username, comment: submitionComment, event: { type: "Updated", target: req.params.componentId } });

    if (!submitionComment) {
        res.json(400, { error: "No logComment supplied" });
        return;
    }

    new_component.validate(function (err) {
        if (err)
            res.status(500).send(err);
        return;
    });

    new_component.save(function (err, model) {
        if (err) {
            res.status(500).send(err);
        } else {
            //Create new reference in project
            Project.findByIdAndUpdate(
                { "_id": req.params.projectId, "component_type._id": req.params.componentTypeId, "component._id": req.params.componentId },
                { $set: { "component_type.$.component": new_component } },
                { safe: true, upsert: false, new: true },
                function (err, model) {
                    if (err) {
                        res.status(500).send(err);
                    }
                    else {
                        //Create log entry
                        logController.create_log(model._id, username, submitionComment, "Created", new_component._id, res);
                    }
                }
            );
        }
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
