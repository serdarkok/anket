/**
 * Option.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName : 'options',

  attributes: {
    name  : {
      type : 'string',
      required : true,
    },
    q_id : {
      type: 'number',
      required : true,
    },
    correct : {
      type: 'boolean'
    },
    status : {
      type        : 'ref',
      columnType  : 'tinyint',
      defaultsTo  : 1
    },


  },

};

