const express = require("express");
const router = express.Router();

const authorize = require('../middleware/auth');
const categoryController = require('../controllers/category.controller');

router.get("/", categoryController.categories_get_all);

router.post("/", categoryController.categories_create);

router.get("/filter", categoryController.categories_get_by_name);

router.get("/:id", categoryController.categories_get_by_id);

router.put("/:id", authorize, categoryController.categories_update);

router.delete("/:id", authorize, categoryController.categories_delete);

module.exports = router;
