/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName : 'users',

  attributes: {
      name : {
          type      : 'string',
          required  : true
      },
      surname : {
          type      : 'string',
          required  : true
      },
      email : {
          type    : 'string',
          required : true
      },
      password : {
        type      : 'string',
        required  : true
      },
      company : {
          type    : 'string'
      }
  },

    toJSON : function() {
      var obj = this.toObject();
      delete obj.password;
      delete obj._csrf;
    },

    beforeCreate : function (value, next) {
      require('bcrypt').hash(value.password, 10, function passwordEncrypted(err, encryptedPassword) {
         if (err) return next(err);
         value.password = encryptedPassword;
         next();
      });
    }

};
