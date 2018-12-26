/**
 * GroupController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

async function isFlash(message, header, req) {
  return await sails.helpers.isFlashMessage(message, header, req);
}

function modal(title, message, type) {
  return sails.sockets.broadcast('room', 'event', {modal : 'true', title : title, message: message, type: type});
}

module.exports = {

  show : function(req, res){
    Group.find().then(function (data) {
      return res.send(data);
    })
  },

  postNewGroups : function (req, res) {
    if (req.isSocket)
    {
      sails.sockets.join(req, 'room', function (err) {
        if (err) return res.serverError(err);
      });

      let _ = req.allParams();

      if (!_['status']) _['status'] = 0;

      if (!_['name']) {
        modal('Hata', 'Lütfen isim alanını boş bırakmayınız', 'err');
      }
      else if (_['name'].length < 3)
      {
        modal('Hata', 'Grup adı 3 karakterden az olmamalıdır', 'err');
      }
      else {
        Group.create(_)
          .then(function () {
            modal('Hata', 'Grup kaydı başarılı bir şekilde yapıldı', 'info');
          })
          .catch(function (err) {
            modal('Hata', 'Kayıt sırasında bir sunucu hatası oluştu:<br/>' + err, 'err');
          })
      }
    }
  },

  getGroups : function(req, res) {
    Group.find()
            .then(function (data) {
              return res.view('admin/getGroups', {data: data, 'layout' : 'admin/layout'});
            })
          .catch(function (err) {
            console.log(err);
          });
  },

  getStatusGroups : async function(req, res) {
    console.log(req.param('id'));
    console.log(req.param('status'));
    var updateStatus = await Group.updateOne({id : req.param('id')}).set({ status : req.param('status') });
    if (updateStatus) {
      return res.redirect('/admin/group');
    }
  },

  getGroupsDestroy : function(req, res) {
    Group.destroy({id: req.param('id')}).then(function (data) {
      return res.redirect('/admin/group');
    });
  },

  getEditGroups : function(req, res) {
    Group.findOne({id: req.param('id')}).then(function (data) {
      console.log(data);
      return res.view('admin/editGroup', {data: data, 'layout' : 'admin/layout'});
    });
  },

  postEditGroups : async function(req, res) {
    if (req.isSocket)
    {
      sails.sockets.join(req, 'room', function (err) {
        if (err) return res.serverError(err);
      });

      let _ = req.allParams();

      if (!_['status']) _['status'] = 0;

      if (!_['name']) {
        modal('Hata', 'Lütfen isim alanını boş bırakmayınız', 'err');
      }
      else if (_['name'].length < 3)
      {
        modal('Hata', 'Grup adı 3 karakterden az olmamalıdır', 'err');
      }
      else {
        await Group.updateOne({id : req.param('id')}).set({name: _['name'], status: _['status']})
          .then(function () {
            modal('Bilgi', 'Grup güncellemesi başarılı bir şekilde yapıldı', 'info');
          })
          .catch(function (err) {
            modal('Hata', 'Kayıt sırasında bir sunucu hatası oluştu:<br/>' + err, 'err');
          })
      }
    }
  },

  getNewGroups : function (req, res) {
    return res.view('admin/newGroup', {'layout' : 'admin/layout'});
  },

  getSocketGroups : function (req, res) {
    if (req.isSocket) {

      sails.sockets.join(req, 'oda', function (err) {
        if (err)
        {
          return res.serverError(err);
        }

        return res.json({
          message : 'Socket girişi yapıldı.',
        });
      });

      // Broadcast a notification to all the sockets who have joined
      // the "funSockets" room, excluding our newly added socket:

      sails.sockets.broadcast('oda', 'eventz', {howdy: 'hi there!'});
    }
  }
};
