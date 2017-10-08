'use strict';
var mongoose = require('mongoose');
var UserInfo = mongoose.model('User'); 
var bcrypt = require('bcrypt');
const saltRounds = 2;

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
		
	//Register user.
	let registerUser = function(saltedPassword){
	var user = new UserInfo({ _id : req.body.username, Firstname : "somebody", Lastname : "lastname", phone_number_1 : 0, role : "guest", password : saltedPassword });	
	user.save(function(err, _) {
		if(err) {
			if(err.code == 11000){ // Duplicate key
				const error = { error : "A user with that name already exists" };
				res.status(400).send(JSON.stringify(error));
			}
			else {
					console.error(err);
					const error = { error : "Failed to save user"};
					res.status(500).send(JSON.stringify(error));
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
			const error = { error : "Failed to hash password" };
			res.status(500).send(JSON.stringify(error));
			return;
		}
		else{
			registerUser(salt);	
		}
	});	

};


