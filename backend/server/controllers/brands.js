const Brands = require('../models').Brand;
const Products = require("../models").Product;

exports.getBrand = function (req, res) {
  Brands.findAll({}).then(response => {
    res.json(response.map(function (item) {
      return item.dataValues
    }))
  })
}

exports.addBrand = function (req, res) {
  Brands.create({
    brand_name: req.body.brand_name
  })
}

exports.updateBrand = function (req, res) {

  Brands.update({
    brand_name: req.body.brand_name
  }, {
    where: {
      id: req.query.id
    }
  })
}

exports.deleteBrand = function (req, res) {
  Brands.destroy({
    where: {
      id: req.query.id
    }
  })
  Products.destroy({
    where:{
      brand_id:req.query.id
    }
  })
  
}
