const express = require("express");
const supportAgencyController = require("../controllers/supportAgencyController");

const router = express.Router();

router.post("/", supportAgencyController.createSupportAgency);

router.get("/", supportAgencyController.getSupportAgency);

router.get("/:id", supportAgencyController.getSingleSupportAgency);

router.put("/:id", supportAgencyController.updateSupportAgency);

router.delete("/:id", supportAgencyController.deleteSupportAgency);

module.exports = router;
