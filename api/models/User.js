/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName : 'users',

  attributes: {
      us_id : {
        type        : 'string'
      },
      username : {
        type : 'string'
      },
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
        model     : 'group',
      },
      authority : {
        type        : 'number',
        defaultsTo  : 2
      },
      description : {
          type     : 'string',
          required : false
      },
      status : {
        type        : 'ref',
        columnType  : 'tinyint',
        defaultsTo  : 1
      },
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
    },

  beforeUpdate : function (value, next) {
    if (value.password) {
      require('bcrypt').hash(value.password, 10, function passwordEncrypted(err, encryptedPassword) {
        if (err) return next(err);
        value.password = encryptedPassword;
        next();
      });
    }
    next();
  }

};
