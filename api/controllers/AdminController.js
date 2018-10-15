module.exports = {
  index : function (req, res) {
    return res.view('admin/blank', {layout: 'admin/layout'});
  }

}
