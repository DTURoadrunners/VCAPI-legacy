'use strict';

var mongoose = require('mongoose'),
    ComponentType = mongoose.model('ComponentType'),
    Log = mongoose.model('Log'),
    Project = mongoose.model('Project');

exports.list_all_componentsTypes = function (req, res) {
    Project.findById(req.params.projectId, function (err, project) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.json(project.component_type);
        }
    })
};




exports.create_a_componentType = function(req, res) {
    var new_componentType = new ComponentType(req.body);
    var submitionComment = req.body.comment;
    var username = "ThomasTemp"; //TODO: Get user id from JWT
    var new_log = new Log({ submitter: username, comment: submitionComment, event: { type: "Created", target: new_componentType._id } });

    new_componentType.validate(function (err) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            Project.findByIdAndUpdate(
                req.params.projectId,
                { $push: { "log": new_log, "component_type": new_componentType} },
                { safe: true, upsert: false, new: true },
                function (err, model) {
                    if (err) {
                        res.status(500).send(err);
                    }
                    else {
                        res.json(model);
                    }
                }
            );
        }
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


exports.delete_a_componentType = function (req, res) {
    console.log("pre delete");
    Project.update(
        { _id: req.params.projectId },
        { $pull: { "component_type": {"_id" : req.params.componentTypeId}} }, function (err, model) {
            console.log(req.params.projectId);
            console.log(req.params.componentTypeId);
            if (err) {
                console.log(err)
                res.status(500).send(err);
            }
            else {
                res.status(200).send("deleted");
            }
        }
    );
    console.log("post delete");
};
