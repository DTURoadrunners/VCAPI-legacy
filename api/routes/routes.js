'use strict';
module.exports = function(app) {
  var project = require('../controllers/projectController');
  var log = require('../controllers/logController');

 	// project Routes
 	app.route('/project')
    	.get(project.list_all_projects)
    	.post(project.create_project);

	app.route('/project/:projectId')
	 	.get(project.read_a_project)
	 	.put(project.update_a_project)
	 	.delete(project.delete_a_project);

	 // log Routes
	 app.route('/log')
	 	.get(log.list_all_log);

	 app.route('/log/:projectId')
	 	.post(log.create_log_into_project);

		 // login
	var loginController = require('../controllers/loginController');
	app.post('/signup', loginController.signup_user);  
};
