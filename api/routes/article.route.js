const express = require("express");
const router = express.Router();

const authorize = require('../middleware/auth');
const articleController = require('../controllers/article.controller');

router.get("/", articleController.articles_get_all);

router.post("/", articleController.articles_create);

router.get("/:id", articleController.articles_get_by_id);

router.put("/:id", authorize, articleController.articles_update);

router.delete("/:id", authorize, articleController.articles_delete);

module.exports = router;
