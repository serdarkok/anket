// flashPolicies tüm controller'larda geri dönen mesajları yayınlar.
module.exports = function (req, res, next) {

  res.locals.flash = {};

  if(req.session.flash != {}) {
    // return next();
    res.locals.flash = _.clone(req.session.flash);

    //clear flash
    req.session.flash = null;

    next();
  }
  else {
    next();
  }
}
