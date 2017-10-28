'use strict';
module.exports = function(openRouter) {
  var project = require('../controllers/projectController');
  var log = require('../controllers/logController');
  var loginController = require('../controllers/loginController');
  var componentType = require('../controllers/componentTypeController');
  var component = require('../controllers/componentController');

 	// project Routes
 	var r = openRouter.route('/project')
    	.get(project.list_all_projects)
    	.post(project.create_project)
	openRouter.route('/project/:projectId')
	 	.get(project.read_a_project)
	 	.put(project.update_a_project)
	 	.delete(project.delete_a_project);
	
    // componentType Routes
    openRouter.route('/project/:projectId/componentType/:componentTypeId')
        .put(componentType.update_a_componentType)
        .delete(componentType.delete_a_componentType);

    openRouter.route('/componentType/:componentTypeId')
        .get(componentType.read_a_componentType);

    openRouter.route('/project/:projectId/componentType/')
        .get(componentType.list_all_componentsTypes_by_project)
        .post(componentType.create_a_componentType);

    // component Routes
    openRouter.route('/component/:projectId/componentType/:componentTypeId')
        .post(component.create_a_component)
        .get(component.list_all_components);

    openRouter.route('/component/:projectId/componentType/:componentTypeId/component/:componentId')
        .put(component.update_a_component);

	 // log Routes
	 openRouter.route('/log/:projectId')
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




