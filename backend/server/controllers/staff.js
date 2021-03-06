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
      req.session.uid = r.dataValues.id
      req.session.sid = session_id
      res.json({
          status:1,
          role:'staff',
          session_id:session_id
      })
  })
}

exports.login = function(req,res){
  let pwd = req.body.password;
  let email = req.body.email
  let hashPwd = crypto.createHash('sha1')
  .update(pwd)
  .digest('hex');
  Staff.findOne({
    where:{
      email:email,
      password:hashPwd
    }
  }).then(result=>{
    let session_id = uuidv4();
    req.session.uid = result.dataValues.id;
    req.session.sid = session_id;
    res.json({
      status:1,
      role:(result.dataValues.role === 1) ? 'admin' : 'staff',
      session_id:session_id
    })
  }).catch(err =>{
    
  })
 
}

exports.getStaff = function(req,res){
  Staff.findAll({}).then(response=>{
    res.json(response.map(function(item){
      return item.dataValues
    }))
  })
}

exports.updateStaff = function(req,res){
  Staff.update(req.body,{
    where:{
      id:req.body.id
    }
  })
}

exports.deleteStaff = function(req,res){
  Staff.destroy({
    where:{
      id:req.query.id
    }
  })
}

exports.addStaff = function(req,res){
  let staff = req.body;
  staff.store_id = -1;
  staff.avatar = '';
  staff.password = crypto.createHash('sha1')
  .update(staff.password)
  .digest('hex');
  Staff.create(staff)
}