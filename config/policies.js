/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/
  '*' : 'isFlash',
/*  UserController : {
    show : 'isLogin',
  },*/
  // '*': true,

  AdminController : {
      '*' : ['isLogin', 'isFlash'],
      index : ['isLogin', 'isFlash']
  },

  GroupController : {
    '*' : ['isLogin', 'isFlash'],
  },

  UserController : {
    '*' : ['isLogin', 'isFlash'],
    getLogin : ['isGuest', 'isFlash'],
    postLogin : ['isGuest', 'isFlash'],
    getLogout : ['isGuest', 'isFlash'],
  }

  // '/show' : 'isLogin',


};
