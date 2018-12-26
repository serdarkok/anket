/**
 * Group.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName : 'groups',

  attributes: {
    name    : {
      type      : 'string',
      unique    : true,
      required  : true
    },
    status : {
      type        : 'ref',
      columnType  : 'tinyint',
      defaultsTo  : 1
    },
  },
};

