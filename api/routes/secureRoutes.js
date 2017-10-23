'use strict';
var mongoose = require('mongoose');
var project = mongoose.model('Project');

//secure routing
module.exports = function(secureRouter) {

	secureRouter.use(function (req, res, next) {
	var token = req.headers['x-access-token'];
	
	if (token) {
			jwt.verify(token, config.secret, function (err, decoded) {
				if (err) {
					console.log(err);
					res.sendStatus(401);
				} else {
					req.decoded = decoded;
					var projectId = req.path['projectId'];
					project.findById(projectId, function(err, document){
						if(err)
							return res.send(err);
						req.rank = document.users[decoded.uid].rank;
					});
					next();
				}
			});
		} else {
			return res.sendStatus(401);
		}
	});

	secureRouter.get('/testSecure', function (req, res) {
  		res.send('hello world from Secure')
	})

};
