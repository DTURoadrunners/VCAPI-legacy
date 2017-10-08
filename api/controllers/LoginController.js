'use strict';
var mongoose = require('mongoose');
var UserInfo = mongoose.model('User'); 

exports.signup_user = function(req, res){
	if(!req.body) return res.sendStatus(400);
	if(!req.body.username){
		res.statusCode = 400;
		const error = { error : "No username supplied" }
		res.end(JSON.stringify(error));
		return;
	}
	if(!req.body.password){
		res.statusCode = 400;
		const error = { error : "No password supplied" }
		res.end(JSON.stringify(error));
		return;
	}
	if(!req.body.CASCODE){
		res.statusCode = 400;
		const error = { error : "No CAS protected password supplied" }
		res.end(JSON.stringify(error));
		return;
	}
	
		
	UserInfo.count({_id : req.body.username}, function(err, count) {
			if(count > 0){
				const error = { error : "A user is already registered with that id"};
				res.status(400).send(JSON.stringify(error));
				return;
			}
			else {
									
					//TODO: Verify CAS 	
					//Register user.
					var user = new UserInfo({ _id : req.body.username, Firstname : "somebody", Lastname : "lastname", phone_number_1 : 0, role : "guest", password : req.body.password });	
					user.save(function(err, _) {
						if(err) {
							console.error(err);
							const error = { error : "Failed to save user"};
							res.status(500).send(JSON.stringify(error));
						}
						else {
							res.status(200);
							res.end();
							
						}
					});
				}

	});	
};


