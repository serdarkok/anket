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

function modal(title, message, type) {
  return sails.sockets.broadcast('room', 'event', {modal : 'true', title : title, message: message, type: type});
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
      User.findOne(
        {
          or : [
            {email : email},
            {username : email}
          ]
        }).then(function (veri) {
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

  getUsers : function (req, res) {
    User.find().then(function (data) {
      return res.view('admin/getUsers', {'data' : data, 'layout' : 'admin/layout'});
    });
  },

  getEditUsers : function(req, res) {
    var _group;
    Group.find({status : '1'}).then(function (data) {
          _group = data;
    });

    User.findOne({id: req.param('id')}).then(function (data) {
      return res.view('admin/editUser', {data: data, 'layout' : 'admin/layout', group : _group});
    });
  },

  postEditUsers : async function(req, res) {
    var __ = req.allParams();
    // __ = _.pick(__, _.identity);
    console.log(__);

    sails.sockets.join(req, 'room', function (err) {
      if (err) return res.serverError(err);
    });
    if (!__['name'] || !__['surname'] || !__['email']) {
      modal('Hata', 'Formda bulunan kırmızı renkteki alanları doldurmanız gerekmektedir!', 'err');
    }
    else if (!__['password']) {
      console.log('PASSWORD ALANI BOŞ DEĞİL');
      delete __.password;
    }
    else if (__['password'] != __['password1'])
      {
        modal('Hata', 'Yazmış olduğunuz şifreler birbirinden farklıdır, lütfen kontrol ediniz!', 'err');
      }

      console.log(__);


    // Şifrelerin uyumu kontrol ediliyor
     else
    {
      await User.updateOne({id : req.param('id')}).set(__)
      .then(function () {
        modal('Bilgi', 'Kullanıcı güncellemesi başarılı bir şekilde yapıldı', 'info');
      })
      .catch(function (err) {
        modal('Hata', 'Kayıt sırasında bir sunucu hatası oluştu:<br/>' + err, 'err');
      })
    }

    /*    User.create(__)
                    .then(function(veri){
    /!*                return res.send({
                      'success' : true,
                      'message' : 'Tebrikler, data işlendi',
                      'veri'    : veri
                    })*!/
                  })
                  .catch(function(err){
                    sails.log.debug(err);
                    return res.send({
                      'success' : false,
                      'message' : 'Data işlenemedi',
                    })
                  })*/
  },

  getUserDestroy : function(req, res) {
    User.destroy({id: req.param('id')}).then(function () {
      return res.redirect('/admin/user');
    });
  },

  getUserStatus : async function(req, res) {

    if (req.session.userId == req.param('id')) {
      isFlash('Kendi hesabınızı pasif duruma getiremezsiniz', 'Hata', req).then(function () {
        return res.redirect('/admin/user');
      });
    }
    else {
      var updateStatus = await User.updateOne({id : req.param('id')}).set({ status : req.param('status') });
      if (updateStatus) {
        return res.redirect('/admin/user');
      }
    }
  },

  getNewUsers : async function (req, res) {
    await Group.find({status : '1'}).then(function (data) {
      return res.view('admin/newUser', {'layout' : 'admin/layout', 'group' : data});
    });
  },

  postNewUsers : function(req, res) {
    var __ = req.allParams();
    __ = _.pick(__, _.identity);
    console.log(__);

    sails.sockets.join(req, 'room', function (err) {
      if (err) return res.serverError(err);
    });

    if (!__['name'] || !__['surname'] || !__['email'] || !__['password'] || !__['password1']) {
      modal('Hata', 'Formda bulunan kırmızı renkteki alanları doldurmanız gerekmektedir!', 'err');
    }
    // Şifrelerin uyumu kontrol ediliyor
    else if (__['password'] != __['password1'])
    {
      modal('Hata', 'Yazmış olduğunuz şifreler birbirinden farklıdır, lütfen kontrol ediniz!', 'err');
    }
    else
    {
      User.create(__).then(function () {
        modal('Bilgi', 'Kullanıcı kaydı başarılı bir şekilde yapıldı', 'info');
      }).catch(function (err) {
        modal('Hata', 'Kayıt sırasında bir sunucu hatası oluştu:<br/>' + err, 'err');
      })
    }

/*    User.create(__)
                .then(function(veri){
/!*                return res.send({
                  'success' : true,
                  'message' : 'Tebrikler, data işlendi',
                  'veri'    : veri
                })*!/
              })
              .catch(function(err){
                sails.log.debug(err);
                return res.send({
                  'success' : false,
                  'message' : 'Data işlenemedi',
                })
              })*/
  },

  show : function(req, res) {
    if (req.isSocket)
    {
      User.find().then(function (veri){
        return res.send(veri);
      });
    }
    else {
      return res.notFound();
    }
  },

  // Kullanıcı logout olursa burası çalışacak
    getLogout : function (req, res) {
      req.session.userId = null;
      req.session.user = false;
      return res.redirect('/login');
  },

};
