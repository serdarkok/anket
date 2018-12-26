/**
 * Type.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName : 'Types',

  attributes: {
    name : {
      type  : 'string',
      required : true
    },
    status : {
      type        : 'ref',
      columnType  : 'tinyint',
      defaultsTo  : 1
    },
  },

};

