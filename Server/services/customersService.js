const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "projectDB",
  password: "123",
  port: 5432,
});

const getAllCustomers = async () => {
  try {
    const { rows } = await pool.query("SELECT * FROM customers");
    return rows;
  } catch (error) {
    return error;
  }
};

const updateCustomer = async (customer) => {
  try {
    const data = await pool.query(
      `UPDATE customers SET first_name='${customer.first_name}', last_name='${customer.last_name}', 
        city='${customer.city}' WHERE id=${customer.customer_id}`
    );
    return data;
  } catch (error) {
    return error;
  }
};

const deleteCustomer = async (id) => {
  try {
    const data1 = await pool.query(`delete from purchases where customer_id=${id}`)
    const data2 = await pool.query(`delete from customers where id=${id}`);
    return data2;
  } catch (err) {
    return err;
  }
};

const getProductsOfCustomer = async (customer_id) => {
    try {
      const products = await pool.query(`select * from purchases;
      select distinct p2.id, p2.name, p2.price, p2.quantity
      from purchases as p1 join products as p2
      on p1.product_id = p2.id
      where p1.customer_id = ${customer_id}`);
      return products;
    } catch (error) {
      return error;
    }
  };

  
const getPurchasesDetails = async (customer_id) => {
    try {
      const details = await pool.query(`SELECT products.id, products.name, products.price, products.quantity, purchases.date
      FROM purchases
      INNER JOIN products
      ON purchases.product_id = products.id
      WHERE purchases.customer_id = ${customer_id}`);
      return details;
    } catch (error) {
      return error;
    }
  };

module.exports = {
  getAllCustomers,
  updateCustomer,
  deleteCustomer,
  getProductsOfCustomer,
  getPurchasesDetails
};
