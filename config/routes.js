/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'pages/homepage'
  },

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/

    'GET /login' : 'UserController.getLogin',
    'POST /login' : 'UserController.postLogin',
    'POST /post' : 'UserController.postCreateUser',
    'GET /admin' : 'AdminController.index',
    'GET /logout' : 'UserController.getLogout',

    // Admin Route
    'GET /admin/user' : 'UserController.getUsers',
    'GET /admin/user/new' : 'UserController.getNewUsers',
    'POST /admin/user/new' : 'UserController.postNewUsers',
    'GET /admin/user/destroy/:id' : 'UserController.getUserDestroy',
    'GET /admin/user/status/:id/:status' : 'UserController.getUserStatus',
    'GET /admin/user/edit/:id' : 'UserController.getEditUsers',
    'POST /admin/user/edit/:id' : 'UserController.postEditUsers',

    // Admin Group Routes
    'GET /admin/group/new'  : 'GroupController.getNewGroups',
    'POST /admin/group/new' : 'GroupController.postNewGroups',
    'GET /admin/group/socket' : 'GroupController.getSocketGroups',
    'GET /admin/group' : 'GroupController.getGroups',
    'GET /admin/group/destroy/:id' : 'GroupController.getGroupsDestroy',
    'GET /admin/group/edit/:id' : 'GroupController.getEditGroups',
    'POST /admin/group/edit/:id' : 'GroupController.postEditGroups',
    'GET /admin/group/status/:id/:status' : 'GroupController.getStatusGroups',

    // API
    'GET /admin/api/osubscribe' : 'UserController.osubscribe',
};
