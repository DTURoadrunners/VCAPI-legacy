'use strict';
module.exports = function(app) {
  var controller = require('../controllers/projectController');

  // todoList Routes
  app.route('/project')
    .get(todoList.list_all_tasks)
    .post(todoList.create_a_task);
};