'use strict';

var mongoose = require('mongoose'),
    ComponentType = mongoose.model('ComponentType'),
    Log = mongoose.model('Log'),
    Project = mongoose.model('Project');

exports.list_all_componentsTypes = function(req, res) {
  ComponentType.find({}, function(err, componentType) {
    if (err)
      res.send(err);
    res.json(componentType);
  });
};




exports.create_a_componentType = function(req, res) {
    var new_componentType = new ComponentType(req.body);
    var submitionComment = req.body.comment;
    var username = "ThomasTemp";
    var new_log = new Log({ submitter: username, comment: submitionComment, event: { type: "Created", target: "DenHer" } });

    new_componentType.validate(function (err) {
        if (err) {
            console.log("Validation error");
            res.status(500).send(err);
        }
        else {
            Project.findByIdAndUpdate(
                req.params.projectId,
                { $push: { "log": new_log, "component_type": new_componentType, "testComponent" : "test" } },
                { safe: true, upsert: false, new: true },
                function (err, model) {
                    if (err) {
                        console.log("Validation error2");
                        console.log(new_componentType);
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


exports.delete_a_componentType = function(req, res) {
  ComponentType.remove({
    _id: req.params.componentTypeId
  }, function(err, component) {
    if (err)
      res.send(err);
    res.json({ message: 'ComponentType successfully deleted' });
  });
};
