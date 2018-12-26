/**
 * Answer.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName : 'answers',

  attributes: {
    u_id : {
      type : 'number',
      required : true
    },

    q_id : {
      type : 'number',
      required : true
    },

    o_id : {
      type : 'number',
      required : true
    },

    e_id : {
      type : 'number',
      required : true
    },

    correct : {
      type : 'number',
      required : true
    },

  },

};

