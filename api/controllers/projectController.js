'use strict';

var logController = require('./logController')

var mongoose = require('mongoose'),
Log = mongoose.model('Log'),
Project = mongoose.model('Project');


exports.list_all_projects = function(req, res) {
  Project.find({}, function(err, project) {
    if (err)
      res.send(err);
    res.json(project);
  });
};

exports.create_project = function(req, res) { 
    var new_project = new Project(req.body);
    var submitionComment = req.body.comment;
    var submitter = "ThomasTemp"; //TODO: Get user id from JWT

    new_project.save(function(err, model) {
        if(err){
             res.send(err);
         } else {
            logController.create_log(model._id, submitter, submitionComment, "Created", model._id, res);            
         }     
    });
};


exports.read_a_project = function(req, res) {
  Project.findById(req.params.projectId, function(err, project) {
  if (err)
    res.send(err);
  res.json(project);
  }); 
};


exports.update_a_project = function(req, res) {
  Project.findOneAndUpdate({_id: req.params.projectId}, req.body, {new: true}, function(err, project) {
    if (err)
      res.send(err);
    res.json(project);
  });
};


exports.delete_a_project = function(req, res) {
  Project.remove({
    _id: req.params.projectId
  }, function(err, project) {
    if (err)
      res.send(err);
    res.json({ message: 'Project successfully deleted' });
  });
};


