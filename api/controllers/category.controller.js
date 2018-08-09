const mongoose = require("mongoose");

const Category = require("../models/category.model");

exports.categories_get_all = (req, res, next) => {
  Category.find((err, docs) => {
    if (err) return res.status(500).send({error: err});
    return res.status(200).send(docs);   
  });    
};

exports.categories_create = (req, res, next) => {     
  const category = new Category(req.body);
  category.id = new mongoose.Types.ObjectId();

  category.save(err => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(category);
  });  
};

exports.categories_get_by_id = (req, res, next) => {  
  Category.findById(req.params.id, (err, doc) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(doc);
  });
};

exports.categories_get_by_name = (req, res, next) => {
  const name = req.query.name;  
  Category.findOne({name: name}, (err, doc) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(doc);
  });
};

exports.categories_update = (req, res, next) => {
  if (req.params.id != req.body.id) {
    const error = new Error('Bad request');
    error.status = 400;
    next(error);    
  }  
  
  Category.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(req.body);
  });
};

exports.categories_delete = (req, res, next) => {  
  Category.findByIdAndRemove(req.params.id, (err, doc) => {
    if (err) res.status(500).send(err);
    res.status(200).send(doc);
  });
};

