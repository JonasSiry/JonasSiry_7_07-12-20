const express = require("express")
const router = express.Router()
const userCtrl = require("../controllers/userCtrl")
const validate = require('../middleware/validate')
const auth = require("../middleware/auth")

router.post("/signup", validate.signup, userCtrl.signup)

router.post("/login", validate.login, userCtrl.login)

router.put("/:id", auth, validate.update, userCtrl.logUpdate)

router.delete("/:id", auth, userCtrl.logDelete)

router.get("/", auth, userCtrl.isAuth)


module.exports = router