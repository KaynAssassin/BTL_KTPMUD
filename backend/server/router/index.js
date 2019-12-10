const userController = require("../controllers/staff")
const express = require("express")
const router = express.Router()

router.post("/api/user",userController.create)
router.post("/api/user/login",userController.login)

module.exports = router