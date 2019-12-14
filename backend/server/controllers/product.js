const Product = require('../models').Product;

exports.addProduct = function(req,res){
    Product.create(req.body)
}

exports.getProduct = function(req,res){
    Product.findAll({}).then(response =>{
        let re = response.map(function(item){
            return item.dataValues
        })
        res.json(re)
    })
}



exports.updateProduct = function(req,res){
    Product.update(req.body,{
        where:{
            id:req.body.id
        }
    })
}

exports.deleteProduct = function(req,res){
    Product.destroy({
        where:{
            id:req.query.id
        }
    })
}