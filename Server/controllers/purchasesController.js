const express = require("express");
const purchasesService = require("../services/purchasesService");

const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const purchases = await purchasesService.getNumberOfPurchases();
    return res.json(purchases);
  } catch (error) {
    return res.json(error);
  }
});

router.route("/filterPurchases").post(async (req, res) => {
  try {
    const purchases = await purchasesService.getPurchases(req.body);
    return res.json(purchases);
  } catch (error) {
    return res.json(error);
  }
});

router.route("/").post(async (req, res) => {
  try {
    const newPurchase = req.body;
    const result = await purchasesService.addPurchase(newPurchase);
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
});

module.exports = router;
