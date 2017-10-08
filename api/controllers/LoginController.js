'use strict';
var mongoose = require('mongoose');
var UserInfo = mongoose.model('User'); 
var bcrypt = require('bcrypt');
const saltRounds = 2;

exports.signup_user = function(req, res){
	if(!req.body) return res.sendStatus(400);
	if(!req.body.username){
		res.json(400,{ error : "No username supplied" });
		return;
	}
	if(!req.body.password){
		res.json(400, { error : "No password supplied" });
		return;
	}
	if(!req.body.CASCODE){
		res.json(400,  {error : "No CAS protected password supplied" });
		return;
	}
		
	//Register user.
	let registerUser = function(saltedPassword){
	var user = new UserInfo({ _id : req.body.username, Firstname : "somebody", Lastname : "lastname", phone_number_1 : 0, role : "guest", password : saltedPassword });	
	user.save(function(err, _) {
		if(err) {
			if(err.code == 11000){ // Duplicate key
				res.json(400, { error : "A user with that name already exists" });
			}
			else {
					console.error(err);
					res.json(500, { error : "Failed to save user"});
			}
		}
		else {
			res.status(200);
			res.end();
			
		}
	});
	};
			
	//TODO: Verify CAS 	
	bcrypt.hash(req.body.password, saltRounds, function(err, salt){
		if(err){
			res.json(500, error : "Failed to hash password" });
			return;
		}
		else{
			registerUser(salt);	
		}
	});	

};


