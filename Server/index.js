const express = require('express');
const cors = require('cors');

const productsController = require("./controllers/productsController")
const purchasesController = require("./controllers/purchasesController")
const customersController = require("./controllers/customersController")

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.use('/products', productsController);
app.use('/purchases', purchasesController);
app.use('/customers', customersController);

app.listen(port, () =>
  console.log(`app listening at http://localhost:${port}`)
);