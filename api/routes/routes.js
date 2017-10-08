'use strict';
module.exports = function(app) {
  var project = require('../controllers/projectController');


 	// project Routes
 	app.route('/project')
    	.get(project.list_all_projects)
    	.post(project.create_project);

	app.route('/project/:projectId')
	 	.get(project.read_a_project)
	 	.put(project.update_a_project)
	 	.delete(project.delete_a_project);

};