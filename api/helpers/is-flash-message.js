module.exports = {
  inputs : {
    message : {
      type      : 'string',
      required  : true
    },

    header : {
      type      : 'string',
      required  : true
    },

    req : {
      type      : 'ref',
      required  : true
    }
  },

  exits : {
    success  : {
    }
  },

  fn : async function (inputs, exits) {
    let _m = inputs.message;
    let _h = inputs.header;

    return exits.success(
      inputs.req.session.flash = {
        message : [_m],
        header : _h
      }
    );
  }
}
