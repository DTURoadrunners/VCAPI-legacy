'use strict';

var mongoose = require('mongoose'),
Project = mongoose.model('Project'),
  Log = mongoose.model('Log');


exports.create_log = function(_projectId, _submitter, _comment, _type, _target, callback){
  //console.log(projectId, submitter, comment, type, target);
  
  var new_log = new Log({ submitter: _submitter, comment: _comment, event: { type: _type, target: _target} });
  new_log.validate(function(err) {
    if (err){
      callback.status(500).send(err);
    } else {
      //callback.status(200).send("success");
      Project.findByIdAndUpdate(
        _projectId ,
        {$push: {"log": new_log}},
        {safe: true, upsert: false, new : true},
        function(err, model) {
          if(err) {
              callback.send(err);
          } else {
            callback.json(model);
          }
        }
      );
    }
  });


  return;
}


exports.list_all_logs_from_project = function(req, res){
	Project.findById(req.params.projectId, function(err, project) {
	if (err)
		res.send(err);
	res.json(project.log);
	}); 
}