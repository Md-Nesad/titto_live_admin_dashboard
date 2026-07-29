const express = require("express");
const upload = require("../middlewares/upload");
const giftController = require("../controllers/giftController");

const router = express.Router();

router.post("/", upload.single("giftImage"), giftController.createGift);

router.get("/", giftController.getAllGifts);

router.get("/stats", giftController.giftStats);

router.get("/:id", giftController.getSingleGift);

router.put("/:id", upload.single("giftImage"), giftController.updateGift);

router.delete("/:id", giftController.deleteGift);

module.exports = router;
