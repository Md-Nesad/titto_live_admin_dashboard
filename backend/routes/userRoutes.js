const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/", userController.getAllUsers);

router.get("/stats", userController.userStats);

router.get("/:id", userController.getUserById);

router.delete("/:id", userController.deleteUser);

module.exports = router;
