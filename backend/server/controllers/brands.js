const Brands = require('../models').Brand;

exports.getBrand = function(req,res){
    Brands.findAll({}).then(response =>{
        res.json(response.map(function(item){
            return item.dataValues
        }))
    })
}