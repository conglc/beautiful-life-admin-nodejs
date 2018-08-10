const mongoose = require("mongoose");

const Article = require("../models/article.model");


exports.articles_get_all = (req, res, next) => {
  Article.find((err, docs) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(docs);
  });
};

exports.articles_create = (req, res, next) => {  
  const article = new Article(req.body);
  article.id = new mongoose.Types.ObjectId();

  article.save(err => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(article);
  });
};

exports.articles_get_by_id = (req, res, next) => {
  Article.findById(req.params.id, (err, doc) => {
    if (err) return res.status(500).send(err);

    if (doc == null) return res.status(404).send({"message": "Not found"});

    if (doc) return res.status(200).send(doc);
  })    
};

exports.articles_update = (req, res, next) => {
  if (req.params.id != req.body.id) {
    const error = new Error('Bad request');
    error.status = 400;
    next(error);    
  }

  const article = new Article(req.body);
  Article.findByIdAndUpdate(req.params.id, article, (err, doc) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(article);
  });
};

exports.articles_delete = (req, res, next) => {
  Article.findByIdAndRemove(req.params.id, (err, doc) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(doc);    
  });
};

