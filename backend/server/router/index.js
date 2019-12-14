const userController = require("../controllers/staff")
const categoryController = require("../controllers/category")
const brandController = require("../controllers/brands")
const productController = require("../controllers/product")
const customerController = require("../controllers/customer")
const express = require("express")
const router = express.Router()

router.post("/api/user",userController.create)
router.post("/api/user/login",userController.login)

router.get("/api/category",categoryController.getCategory)
router.post("/api/category",categoryController.addCategory)
router.delete("/api/category",categoryController.deleteCategory)
router.put("/api/category",categoryController.updateCategory)


router.get("/api/brands",brandController.getBrand)
router.post("/api/brands",brandController.addBrand)
router.put("/api/brands",brandController.updateBrand)
router.delete("/api/brands",brandController.deleteBrand)

router.post("/api/product",productController.addProduct)
router.get("/api/product",productController.getProduct)
router.put("/api/product",productController.updateProduct)
router.delete("/api/product",productController.deleteProduct)


router.post("/api/customer",customerController.addCustomer)
router.get("/api/customer",customerController.getCustomer)
router.put("/api/customer",customerController.updateCustomer)
router.delete("/api/customer",customerController.deleteCustomer)

module.exports = router