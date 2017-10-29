'use strict';

var mongoose = require('mongoose'),
    Component = mongoose.model('Component'),
    Project = mongoose.model('Project'),
    ComponentType = mongoose.model('ComponentType'),
    Log = mongoose.model('Log'),
    ComponentLog = mongoose.model('ComponentLog'),
    logController = require('./logController');

exports.list_all_components = function (req, res) {
    ComponentType.find({ "_id": req.params.componentTypeId })
        .populate({
            path: 'component'
        })
        .exec(function (err, model) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(model);
            }
        });
};




exports.create_a_component = function (req, res) {
    var new_component = new Component(req.body);
    var username = "ThomasTemp"; //TODO: Get user id from JWT
    var submitionComment = "commentComment"; //req.body.logComment;

    if (!submitionComment) {
        res.json(400, { error: "No logComment supplied" });
        return;
    }

    new_component.validate(function (err) {
        if (err)
            res.status(500).send(err);
        return;
    });

    //Create component
    new_component.save(function (err, model) {
        if (err) {
            res.status(500).send(err);
        } else {
            //Create new reference in project
            ComponentType.findByIdAndUpdate(
                req.params.componentTypeId,
                { $push: { "component": new_component } },
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


exports.read_a_component = function (req, res) {

    Component.findById(
        req.params.componentId,
        function (err, model) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json(model);
            }
        })

};


exports.update_a_component = function (req, res) {
    var new_component = new Component(req.body);
    var username = "ThomasTemp"; //TODO: Get user id from JWT
    var submitionComment = "commentComment"; //req.body.logComment;

    if (!submitionComment) {
        res.json(400, { error: "No logComment supplied" });
        return;
    }

    new_component.validate(function (err) {
        if (err)
            res.status(500).send(err);
        return;
    });

    //Create component
    new_component.save(function (err, model) {
        if (err) {
            res.status(500).send(err);
        } else {
            //Switch reference to new component
            ComponentType.findByIdAndUpdate(
                { "_id": req.params.componentTypeId, "component": req.params.componentId },
                { $set: { "component.$": new_component } },
                { safe: true, upsert: false, new: true },
                function (err, model) {
                    if (err) {
                        res.status(500).send(err);
                    }
                    else {
                        logController.create_log(model._id, username, submitionComment, "Updated", req.params.componentId, res);
                    }
                }
            );
        }
    });
};


exports.delete_a_component = function (req, res) {
    var username = "ThomasTemp"; //TODO: Get user id from JWT
    var submitionComment = "commentComment"; //req.body.logComment;

    if (!submitionComment) {
        res.json(400, { error: "No logComment supplied" });
        return;
    }

    new_component.validate(function (err) {
        if (err)
            res.status(500).send(err);
        return;
    });
    //Delete reference to component
    ComponentType.findByIdAndRemove( //Not tested, unlikely to work. Same problem as update?
        { "_id": req.params.componentTypeId, "component": req.params.componentId },
        { safe: true, upsert: false, new: true },
        function (err, model) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                logController.create_log(model._id, username, submitionComment, "Updated", req.params.componentId, res);
            }
        }
    );
};
