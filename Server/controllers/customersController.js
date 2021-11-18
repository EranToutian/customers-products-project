const express = require('express');
const customersService = require('../services/customersService');

const router = express.Router();

router.route('/').get(async (req, res) => {
  try {
    const customers = await customersService.getAllCustomers();
    return res.json(customers);
  } catch (error) {
    return res.json(error);
  }
});


router.route('/:id/purchasesDetails').get(async (req, res) => {
  try {
    const id = req.params.id;
    const details = await customersService.getPurchasesDetails(id);
    return res.json(details);
  } catch (error) {
    return res.json(error);
  }
});



router.route('/').put(async (req, res) => {
  try {
  const updatedCustomer = req.body;
  const result = await customersService.updateCustomer(updatedCustomer);
  return res.json(result);
} catch (error) {
  return res.json(error);
}
});

router.route('/:id').delete(async (req, res) => {
  try {
  const id = req.params.id;
  const result = await customersService.deleteCustomer(id);
  return res.json(result);
} catch (error) {
  return res.json(error);
}
});

router.route('/:id/products').get(async (req, res) => {
  try {
    const products = await customersService.getProductsOfCustomer(req.params.id);
    return res.json(products);
  } catch (error) {
    return res.json(error);
  }
});


module.exports = router;