const mongoose = require("mongoose");

const Category = require("../models/category.model");

exports.categories_get_all = (req, res, next) => {
  Category.find()    
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        categories: docs.map(doc => {
          return {
            id: doc._id,
            name: doc.name
          };
        })
      };

      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.categories_create = (req, res, next) => {
  const Category = new Category({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name
  });
  Category
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created Category successfully",
        createdCategory: {            
            id: result._id,
            name: result.name
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

exports.categories_get_by_id = (req, res, next) => {
  const id = req.params.id;
  Category.findById(id)
    .select('name price _id CategoryImage')
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          createdCategory: {            
            id: doc._id,
            name: doc.name
          }
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

exports.categories_update = (req, res, next) => {
  const Category = new Category({
    _id: req.body.id,
    name: req.body.name
  });
  Category.update()
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'Category updated',
          createdCategory: {            
            id: result._id,
            name: result.name
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

exports.categories_delete = (req, res, next) => {
  const id = req.params.id;
  Category.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'Category deleted'
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
