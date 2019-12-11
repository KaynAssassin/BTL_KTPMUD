const Category = require('../models').Category;

exports.getCategory = function(req,res){
    Category.findAll({}).then(response =>{
        res.json(response.map(function(item){
            return item.dataValues
        }))
    })
}

exports.addCategory = function(req,res){

    Category.create({
        category_name:req.body.category_name
    })
}

exports.updateCategory = function(req,res){

    Category.update({
        category_name:req.body.category_name
    },{
        where:{
            id:req.query.id
        }
    })
}

exports.deleteCategory = function(req,res){
    Category.destroy({
        where:{
            id:req.query.id
        }
    })
}