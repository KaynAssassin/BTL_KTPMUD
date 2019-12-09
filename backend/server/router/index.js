const userController = require("../controllers/staff")
const express = require("express")
const router = express.Router()

router.post("/api/user",userController.create)

module.exports = router