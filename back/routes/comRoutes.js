const express = require("express")
const router = express.Router()

const comCtrl = require("../controllers/comCtrl")
const auth = require("../middleware/auth")

router.post("/", auth, comCtrl.createCom)

router.put("/:id", auth, comCtrl.modifyCom)

router.delete("/:id", auth, comCtrl.deleteCom)

router.get("/", auth, comCtrl.getCom)

module.exports = router