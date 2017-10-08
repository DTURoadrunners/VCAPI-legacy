'use strict';

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