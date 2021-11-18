const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "projectDB",
  password: "123",
  port: 5432,
});

const getAllProducts = async () => {
  try {
    const { rows } = await pool.query("SELECT * FROM products");
    return rows;
  } catch (error) {
    return error;
  }
};

const getAvailableProducts = async () => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM products WHERE quantity > 0"
    );
    return rows;
  } catch (error) {
    return error;
  }
};

const getCustomersBoughtProduct = async (product_id) => {
  try {
    const customers = await pool.query(`select * from purchases;
    select distinct p1.customer_id, p1.date, p2.first_name, p2.last_name, p2.city
    from purchases as p1 join customers as p2
    on p1.customer_id = p2.id
    where p1.product_id = ${product_id}`);
    return customers;
  } catch (error) {
    return error;
  }
};

const updateProduct = async (product) => {
  try {
    const data = await pool.query(
      `UPDATE products SET name='${product.name}', price=${product.price}, 
        quantity=${product.quantity} WHERE id=${product.id}`
    );
    return data;
  } catch (error) {
    return error;
  }
};

const deleteProduct = async (id) => {
  try {
    console.log(id);
    const data1 = await pool.query(`delete from purchases where product_id=${id}`);
    const data2 = await pool.query(`delete from products where id=${id}`);
    console.log(data2);
    return data2;
  } catch (err) {
    return err;
  }
};

const updateQuantity = async (product_id) => {
  try {
    const product = await pool.query(
      `UPDATE products SET quantity = quantity-1 WHERE id=${product_id};`
    );
    return product;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllProducts,
  getCustomersBoughtProduct,
  getAvailableProducts,
  updateQuantity,
  updateProduct,
  deleteProduct,
};
