/**
 * Question.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'quesitons',

  attributes: {
    name : {
      type        : 'string',
      required    : true
    },
    type : {
      type        : 'ref',
      columnType  : 'tinyint',
      required    : true
    },
    score : {
      type        : 'number',
      required    : true,
    },
    time : {
      type        : 'number',
      required    : true
    },
    status : {
      type        : 'ref',
      columnType  : 'tinyint',
      defaultsTo  : 1
    },
  },
};

