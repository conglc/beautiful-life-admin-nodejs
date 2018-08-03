const mongoose = require("mongoose");

const Article = require("../models/article.model");


exports.articles_get_all = (req, res, next) => {
  Article.find()    
    .exec()
    .then(docs => {
      const response = docs.map(doc => {
        return {
          id: doc._id,
          title: doc.title,
          description: doc.description,
          content: doc.content,
          image: doc.image,
          createdAt: doc.createdAt,
          categoryId: doc.categoryId,
        };
      });

      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.articles_create = (req, res, next) => {  
  const article = new Article({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    description: req.body.description,
    content: req.body.content,
    image: req.body.image,
    createdAt: req.body.createdAt,
    categoryId: req.body.categoryId,
  });
  article
    .save()
    .then(doc => {      
      res.status(201).json({
        message: "Created Article successfully",
        createdArticle: {            
          id: doc._id,
          title: doc.title,
          description: doc.description,
          content: doc.content,
          image: doc.image,
          createdAt: doc.createdAt,
          categoryId: doc.categoryId,
        }
      });
    })
    .catch(err => {      
      res.status(500).json({
        error: err
      });
    });
};

exports.articles_get_by_id = (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  Article.findById(id)    
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json({            
          id: doc._id,
          title: doc.title,
          description: doc.description,
          content: doc.content,
          image: doc.image,
          createdAt: doc.createdAt,
          categoryId: doc.categoryId,
        });
      } else {
        res.status(404).json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.articles_update = (req, res, next) => {
  if (req.params.id != req.body.id) {
    const error = new Error('Bad request');
    error.status = 400;
    next(error);    
  }

  const article = new Article({
    _id: req.body.id,    
    title: req.body.title,
    description: req.body.description,
    content: req.body.content,
    image: req.body.image,
    createdAt: req.body.createdAt,
    categoryId: req.body.categoryId,
  });
  article.update()
    .exec()
    .then(doc => {
      res.status(200).json({
          message: 'Article updated',
          createdArticle: {            
            id: doc._id,
            title: doc.title,
            description: doc.description,
            content: doc.content,
            image: doc.image,
            createdAt: doc.createdAt,
            categoryId: doc.categoryId,
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.articles_delete = (req, res, next) => {
  const id = req.params.id;
  Article.remove({ _id: id })
    .exec()
    .then(doc => {
      res.status(200).json({
          message: 'Article deleted'
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

