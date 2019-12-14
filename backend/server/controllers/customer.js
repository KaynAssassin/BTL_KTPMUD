const Customer = require("../models").Customer

exports.addCustomer = function (req, res) {
  let data = req.body;
  data.avatar = "";
  Customer.create(data)
}

exports.getCustomer = function (req, res) {
  Customer.findAll({}).then(response => {
    res.json(response.map(function (item) {
      return item.dataValues
    }))
  })
}

exports.updateCustomer = function (req, res) {
  Customer.update(
    req.body, {
      where: {
        id: req.body.id
      }
    }
  )
}

exports.deleteCustomer = function(req,res){
    Customer.destroy({
        where:{
            id:req.query.id
        }
    })
}
