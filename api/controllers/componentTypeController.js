'use strict';

var mongoose = require('mongoose'),
    ComponentType = mongoose.model('ComponentType'),
    Log = mongoose.model('Log'),
    Project = mongoose.model('Project'),
    logController = require('./logController');

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
    var username = "ThomasTemp"; //TODO: Get user id from JWT
    var submitionComment = req.body.comment;
    new_componentType.validate(function (err) {
        if (err) {
            console.log("error 1");
            res.status(500).send(err);
        } else {
            //Create component type
            new_componentType.save(function(err, model) {
                if(err) {
                    console.log("error 2");
                    res.status(500).send(err);
                } else {
                    //Create new reference in project
                    Project.findByIdAndUpdate(
                        req.params.projectId,
                        { $push: { "component_type": new_componentType} },
                        { safe: true, upsert: false, new: true },
                        function (err, model) {
                            if (err) {
                                res.status(500).send(err);
                            }
                            else {
                                //Create log entry
                                logController.create_log(model._id, username, submitionComment, "Created", new_componentType._id, res);
                            }
                        }
                    );
                }
            } )
        }
    });

    /*
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
    */
};


exports.read_a_componentType = function(req, res) {
  Project.findById(req.params.projectId, function (err, project) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            var componentType = project.component_type.id(req.params.componentTypeId);
            res.json(componentType);
        }
    })
};

exports.update_a_componentType = function(req, res) {
    var submitionComment = req.body.comment;
    console.log(submitionComment);
    var username = "ThomasTemp"; //TODO: Get user id from JWT
    var new_log = new Log({ submitter: username, comment: submitionComment, event: { type: "Changed", target: req.params.componentTypeId } });
    console.log(new_log);
    Project.findById(req.params.projectId, function (err, project) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            var componentType = project.component_type.id(req.params.componentTypeId);
            
            if(componentType == null){
                res.status(500).send({"error": "wrong id"});
            } else {

                componentType.name = req.body.name;
                componentType.category = req.body.category;
                componentType.storage = req.body.storage;
                componentType.description = req.body.description;
                project.save(function (err, model) {
                        if (err) {
                            res.status(500).send(err);
                        }
                        else {
                            project.update({ $push: { "log": new_log} },{ safe: true, upsert: false, new: true }, function (err, model) {
                                    if (err) {
                                        res.status(500).send(err);
                                    }
                                    else {
                                        res.json(model);
                                    }
                                }
                            );
                        }
                    }
                );
            }
        }
    })
};


exports.delete_a_componentType = function (req, res) {
    var submitionComment = req.body.comment;
    var username = "ThomasTemp"; //TODO: Get user id from JWT
    var new_log = new Log({ submitter: username, comment: submitionComment, event: {type: "Deleted", target: req.params.componentTypeId} });
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
                Project.update({ _id: req.params.projectId }, { $push: { "log": new_log} },{ safe: true, upsert: false, new: true }, function (err, model) {
                                if (err) {
                                    res.status(500).send(err);
                                }
                                else {
                                    res.json(model);
                                }
                            }
                        );
            }
        }
    );
    console.log("post delete");
};
