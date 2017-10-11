'use strict';
module.exports = function(openRouter) {
  var project = require('../controllers/projectController');
  var log = require('../controllers/logController');
  var loginController = require('../controllers/loginController');
  var componentType = require('../controllers/componentTypeController');

 	// project Routes
 	openRouter.route('/project')
    	.get(project.list_all_projects)
    	.post(project.create_project);

	openRouter.route('/project/:projectId')
	 	.get(project.read_a_project)
	 	.put(project.update_a_project)
	 	.delete(project.delete_a_project);

    // componentType Routes
    openRouter.route('/componentType/:projectId/:componentTypeId')
        .delete(componentType.delete_a_componentType)
        .put(componentType.update_a_componentType);

    openRouter.route('/componentType/:projectId')
        .get(componentType.list_all_componentsTypes)
        .post(componentType.create_a_componentType);
        
	 // log Routes
	 openRouter.route('/log')
	 	.get(log.list_all_log);

	 openRouter.route('/log/:projectId')
	 	.post(log.create_log_into_project)
	 	.get(log.list_all_logs_from_project);

	 // login
	 openRouter.route('/signup')
	 	.post(loginController.signup_user);
	
	 openRouter.route('/login')
	 	.put(loginController.login);

	 openRouter.get('/testOpen', function (req, res) {
  		res.send('hello world from Open')
	})
};




