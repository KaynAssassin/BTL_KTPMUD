const userController = require("../controllers/staff")
const categoryController = require("../controllers/category")
const brandController = require("../controllers/brands")
const express = require("express")
const router = express.Router()

router.post("/api/user",userController.create)
router.post("/api/user/login",userController.login)

router.get("/api/category",categoryController.getCategory)
router.post("/api/category",categoryController.addCategory)
router.delete("/api/category",categoryController.deleteCategory)
router.put("/api/category",categoryController.updateCategory)
router.get("/api/brands",brandController.getBrand)

module.exports = router