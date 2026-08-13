const express = require("express");
const router = express.Router();
const agencyController = require("../controllers/agencyController");
const upload = require("../middlewares/upload");

router.post(
  "/",
  upload.fields([
    { name: "nidFront", maxCount: 1 },
    { name: "nidBack", maxCount: 1 },
    { name: "profilePic", maxCount: 1 },
  ]),
  agencyController.createAgency,
);

router.get("/", agencyController.getAllAgencies);

router.get("/:agencyId", agencyController.getAgencyById);

router.put("/:agencyId", agencyController.getByIdAndUpdate);

router.delete("/:agencyId", agencyController.getByIdAndDelete);

module.exports = router;
