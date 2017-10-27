'use strict';

var mongoose = require('mongoose'),
    ComponentType = mongoose.model('ComponentType'),
    Log = mongoose.model('Log'),
    Project = mongoose.model('Project'),
    logController = require('./logController');

exports.list_all_componentsTypes_by_project = function (req, res) {
    Project.find({"_id": req.params.projectId})
    .populate({
        path: 'component_type',
        match: {visible : true}
    })
    .exec(function (err, model) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(model);
        }
    });
};




exports.create_a_componentType = function(req, res) {
    
    var new_componentType = new ComponentType(req.body);
    var username = "ThomasTemp"; //TODO: Get user id from JWT
    var submitionComment = req.body.comment;
    new_componentType.validate(function (err) {
        if (err) {
            res.status(500).send(err);
        } else {
            //Create component type
            new_componentType.save(function(err, model) {
                if(err) {
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
                                console.log('test');
                                logController.create_log(model._id, username, submitionComment, "Created", new_componentType._id, res);
                            }
                        }
                    );
                }
            } )
        }
    });

};


exports.read_a_componentType = function(req, res) {
  ComponentType.findById(req.params.componentTypeId, function (err, model) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.json(model);
        }
    })
};

exports.update_a_componentType = function(req, res) {
    var submitionComment = req.body.comment;
    var username = "ThomasTemp"; //TODO: Get user id from JWT
    var name = req.body.name;
    var category = req.body.category;
    var storage = req.body.storage;
    var description = req.body.description;

    if(!submitionComment){
        res.json(400,{ error : "No submitionComment supplied" });
        return;
    }
    
    if(!name){
        res.json(400,{ error : "No name supplied" });
        return;
    }

    if(!category){
        res.json(400,{ error : "No category supplied" });
        return;
    }

    if(!storage){
        res.json(400,{ error : "No storage supplied" });
        return;
    }

    if(!description){
        res.json(400,{ error : "No description supplied" });
        return;
    }


    Project.findById(req.params.projectId, function (err, project) {
        if (err) {
            res.status(500).send(err);
            return;
        } else {

            ComponentType.findByIdAndUpdate(
                {"_id" : req.params.componentTypeId}, // TODO only select visible
                {$set: {"name" : name, "category" : category, "storage" : storage, "description": description } }, 
                function(err, componentType) {
                    if (err) {
                        res.status(500).send(err);
                        return;
                    } else {
                        logController.create_log(project._id, username, submitionComment, "Changed", componentType._id, res);
                                    
                    }
                }
            )};
    });

};


exports.delete_a_componentType = function (req, res) {
 
    var username = "ThomasTemp"; //TODO: Get user id from JWT
    
    Project.findById(req.params.projectId, function (err, project) {
        if (err) {
            res.status(500).send(err);
            return;
        } else {
            ComponentType.findByIdAndUpdate(
                {"_id" : req.params.componentTypeId}, // TODO only select visible
                {$set: {visible: false}}, 
                function(err, componentType) {
                    if (err) {
                        res.status(500).send(err);
                        return;
                    } else {
                        logController.create_log(project._id, username, componentType.name + " deleted from project", "Deleted", componentType._id, res);
                                    
                    }
                }
            )};
    });
};
