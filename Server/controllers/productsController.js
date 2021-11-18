const express = require('express');
const productsService = require('../services/productsService');

const router = express.Router();

router.route('/').get(async (req, res) => {
  try {
    const products = await productsService.getAllProducts();
    return res.json(products);
  } catch (error) {
    return res.json(error);
  }
});

router.route('/available').get(async (req, res) => {
  try {
    const products = await productsService.getAvailableProducts();
    return res.json(products);
  } catch (error) {
    return res.json(error);
  }
});

router.route('/:id/customers').get(async (req, res) => {
    try {
      const customers = await productsService.getCustomersBoughtProduct(req.params.id);
      return res.json(customers);
    } catch (error) {
      return res.json(error);
    }
  });

  router.route('/').put(async (req, res) => {
    const updatedProduct = req.body;
    const result = await productsService.updateProduct(updatedProduct);
    return res.json(result);
  });
  
  router.route('/:id').delete(async (req, res) => {
    const id = req.params.id;
    const result = await productsService.deleteProduct(id);
    return res.json(result);
  });

router.route(`/:id/updateQuantity`).put(async (req, res) => {
    try {
      const product = await productsService.updateQuantity(req.params.id);
      return res.json(product);
    } catch (error) {
      return res.json(error);
    }
  });


module.exports = router;