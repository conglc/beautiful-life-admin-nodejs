const express = require("express");
const router = express.Router();

const authorize = require('../middleware/auth');
const categoryController = require('../controllers/category.controller');

router.get("/", categoryController.categories_get_all);

router.post("/", authorize, upload.single('productImage'), categoryController.categories_create);

router.get("/:id", categoryController.categories_get_by_id);

router.patch("/:id", authorize, categoryController.categories_update);

router.delete("/:id", authorize, categoryController.categories_delete);

module.exports = router;
