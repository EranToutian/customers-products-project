const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'projectDB',
  password: '123',
  port: 5432,
});

const getNumberOfPurchases = async () => {
  try {
    const resp = await pool.query('SELECT count(*) FROM purchases');
    return resp.rows[0];
  } catch (error) {
    return error;
  }
};

const getPurchases = async (filter) => {
  try {
    var customer_id = filter.customer_id? filter.customer_id: 'customer_id'
    var product_id = filter.product_id? filter.product_id: 'product_id'
    var date = filter.date? `'${filter.date} 00:00:00'`: 'date'
    const resp = await pool.query(`SELECT p1.date, p3.first_name || ' ' || p3.last_name as customer_name, p2.name
    FROM purchases as p1 inner join products as p2 on p1.product_id=p2.id inner join customers as p3 on p1.customer_id=p3.id
    WHERE p1.customer_id = ${customer_id} 
    and p1.product_id = ${product_id} 
    and date = ${date}`);
    return resp.rows;
  } catch (error) {
    return error;
  }
};

const addPurchase = async (purchase) => {
  try{
  const data = await pool.query(`INSERT INTO purchases(customer_id, product_id, date) VALUES 
  (${purchase.customer_id}, ${purchase.product_id}, '${purchase.date}')`);
  return 'created';
} catch (error) {
  return res.json(error);
}
};

module.exports = {
    getNumberOfPurchases,
    addPurchase,
    getPurchases,
};