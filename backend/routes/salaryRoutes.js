const express = require("express");
const salaryController = require("../controllers/salaryController");

const router = express.Router();

router.post("/", salaryController.createSalary);

router.get("/", salaryController.getAllSalary);

router.get("/:id", salaryController.getSingleSalary);

router.put("/:id", salaryController.updateSalary);

router.delete("/:id", salaryController.deleteSalary);

module.exports = router;
