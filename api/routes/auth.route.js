const express = require("express");
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post("/", userController.users_login);

module.exports = router;
