const Product = require('../models/productModel');
const fs = require('fs');

exports.index = (req, res) => {
  Product.getAll((err, data) => {
    res.render('index', { products: data });
  });
};

exports.showAdd = (req, res) => {
  res.render('add');
};

exports.create = (req, res) => {
  const data = {
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    stock: req.body.stock,
    image: req.file ? req.file.filename : null
  };

  Product.create(data, () => res.redirect('/'));
};

exports.showEdit = (req, res) => {
  Product.getById(req.params.id, (err, data) => {
    res.render('edit', { product: data[0] });
  });
};

exports.update = (req, res) => {
  Product.getById(req.params.id, (err, data) => {
    let oldImg = data[0].image;
    let newImg = oldImg;

    if (req.file) {
      newImg = req.file.filename;
      if (oldImg) fs.unlink('uploads/' + oldImg, () => {});
    }

    const newData = {
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      stock: req.body.stock,
      image: newImg
    };

    Product.update(req.params.id, newData, () => res.redirect('/'));
  });
};

exports.delete = (req, res) => {
  Product.getById(req.params.id, (err, data) => {
    if (data[0].image) {
      fs.unlink('uploads/' + data[0].image, () => {});
    }
    Product.delete(req.params.id, () => res.redirect('/'));
  });
};