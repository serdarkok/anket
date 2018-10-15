module.exports = {
  index : function (req, res) {
    return res.view('admin/blank', {layout: 'admin/layout'});
  },

  // Kullanıcı işlemleri

    getUsers : function (req, res) {
        User.find().then(function (veri) {
           return res.view('admin/getAllUsers', {'data' : veri, 'layout' : 'admin/layout'});
        });
    },
    
    getNewUser : function (req, res) {
        
    }
}
