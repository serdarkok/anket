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
      phone : {
          type     : 'string',
          required : false
      },
      password : {
        type      : 'string',
        required  : true
      },
      group     : {
        type        : 'number',
        defaultsTo   : 0
      },
      authority : {
          type      : 'number',
          defaultsTo : 2
      },
      description : {
          type     : 'string',
          required : false
      },
      status        : {
          type          : 'boolean',
          defaultsTo    : true
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
