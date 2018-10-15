/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

let bcrypt = require('bcrypt');

async function isFlash(message, header, req) {
  return await sails.helpers.isFlashMessage(message, header, req);
}

module.exports = {
  getLogin : function(req, res) {
      return res.view('login/index', {layout: 'login/layout'});
  },

  postLogin : function (req, res) {
    let email = req.param('email');
    let pass = req.param('password');

    if (!email || !pass) {
      isFlash('Lütfen kullanıcı adı ve şifreyi yazınız', 'Hata', req).then(function () {
        return res.redirect('/login');
      });
    }
    else {
      User.findOne({email: email})
        .then(function (veri) {
          if (veri && bcrypt.compareSync(pass, veri.password) === true)
          {
              sails.log(veri.id);
              req.session.userId = veri.id;
              req.session.user = true;
              return res.redirect('/admin');
          }
          else {
            isFlash('Kullanıcı adı veya şifre hatalıdır, lütfen tekrar deneyiniz', 'Hata', req).then(function () {
              return res.redirect('/login');
            });
          }
        })
        .catch(function (err) {
          return res.send('Hata var:' + err);
        });
    }
  },

  postCreateUser : function(req, res) {
    let _ = req.allParams();
    User.create(_)
                .then(function(veri){
                return res.send({
                  'success' : true,
                  'message' : 'Tebrikler, data işlendi',
                  'veri'    : veri
                })
              })
              .catch(function(err){
                sails.log.debug(err);
                return res.send({
                  'success' : false,
                  'message' : 'Data işlenemedi',
                })
              })
  },

  show : function(req, res) {
      User.find().then(function (veri){
                        return res.send({
                          'data' : veri,
                        })
                    });
  },

  // Kullanıcı logout olursa burası çalışacak
    getLogout : function (req, res) {
      req.session.userId = null;
      req.session.user = false;
      return res.redirect('/login');
  }

};
