const express = require('express');
const Product = require('../models/product');

const router  = express.Router();

router.get('/', (req, res, next) => {
  const criteria = {
    price: { $lte: req.query.price || 1000 }
  };

  Product.find(criteria, (err, products) => {
    if (err) { return next(err) }

    res.render('products/index', {
      products: products
    });
  });
});

router.get('/new', (req, res, next) => {
  res.render('products/form', {
    product: new Product()
  });
});

router.post('/', (req, res, next) => {
  const productInfo = {
    name: req.body.name,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
    description: req.body.description
  };

  // Create a new Product with the params
  const newProduct = new Product(productInfo);

  newProduct.save((err) => {
    if (err) {
      return res.render('products/form', {
        product: newProduct
      })
    }
    return res.redirect('/products');
  });
});

router.get('/:id', (req, res, next) => {
  let id = req.params.id

  Product.findById(id, (err, product) => {
    res.render('products/show', {
      product: product
    })
  })
});

router.get('/:id/edit', (req, res, next) => {
  let id = req.params.id

  Product.findById(id, (err, product) => {
    res.render('products/form', {
      product: product
    })
  })
});

router.post('/:id', (req, res, next) => {
  let id = req.params.id

  const updates = {
    name: req.body.name,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
    description: req.body.description
  };

  Product.findByIdAndUpdate(id, updates, (err, product) => {
    if (err){ return next(err); }

    return res.redirect(`/products/${product._id}`);
  });
});

router.post('/:id/delete', (req, res, next) => {
  let id = req.params.id

  Product.findByIdAndRemove(id, (err, product) => {
    if (err){ return next(err); }

    return res.redirect('/products');
  });
});

module.exports = router;
