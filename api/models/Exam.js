/**
 * Exam.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName : 'exams',

  attributes: {
    name : {
      type : 'string',
      required: true
    },
    q_number : {
      type : 'number',
      required: true
    },
    time : {
      type : 'number',
      required: true
    },
    start_date : {
      type : 'ref',
      columnType : 'datetime',
      required: true
    },
    end_date : {
      type : 'ref',
      columnType : 'datetime',
      required: true
    },
    status : {
      type : 'ref',
      columnType : 'tinyint',
      defaultsTo : 1
    }

  },

};

