const Staff = require('../models').Staff;
const crypto = require("crypto");
const uuidv4 = require('uuid/v4');

exports.create = function (req, res) {
  let pwd = req.body.password;
  let hashPwd = crypto.createHash('sha1')
  .update(pwd)
  .digest('hex');

  Staff.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    phone: req.body.phone,
    active: true,
    password: hashPwd,
    store_id: -1,
    role: 0,
    block: false,
    avatar: '',
  }).then(r=>{
      let session_id = uuidv4()
      // req.session.uid = r.dataValues.id
      req.session.sid = session_id
      res.cookie("session_id",session_id).json({
          status:1
      })
  })
}
