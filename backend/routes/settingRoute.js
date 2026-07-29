const express = require("express");
const router = express.Router();

const settingController = require("../controllers/settingController");

router.post("/", settingController.createSetting);

router.get("/", settingController.getSetting);

module.exports = router;
