'use strict';

var mongoose = require('mongoose'),
Project = mongoose.model('Project'),
  Log = mongoose.model('Log');



exports.list_all_log = function(req, res) {
  Log.find({}, function(err, log) {
    if (err)
      res.send(err);
    res.json(log);
  });
};


exports.create_log_into_project = function(req, res){
	var new_log = new Log(req.body);

	new_log.validate(function (err) {
  	if (err) 
  		res.send(err);
  	else // validation passed
  		Project.findByIdAndUpdate(
		req.params.projectId,
		{$push: {"log": new_log}},
		{safe: true, upsert: false, new : true},
    		function(err, model) {
    			if(err)
        			res.send(err);
        		res.json(model);
    	}
		);
});


	


}