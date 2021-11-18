import { useState, useEffect } from "react";
import SelectListComp from "../Components/SelectListComp";
import PurchasesTableComp from "../Components/PurchasesTableComp";
import axios from "axios";

const PurchasedPage = (props) => {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selctedProduct, setSelctedProduct] = useState(0);
  const [selctedCustomer, setSelctedCustomer] = useState(0);
  const [date, setDate] = useState("");
  const [purchasesTable, setPurchasesTable] = useState();

  useEffect(() => {
    async function fetchData() {
      const resp = await axios.get(`http://localhost:8000/products`);
      const products = resp.data;
      products.unshift({
        id: 0,
        name: "Select Product",
        price: 0,
        quantity: 0,
      });
      setProducts(products);
      const resp2 = await axios.get(`http://localhost:8000/customers`);
      const customers = resp2.data;
      customers.unshift({
        id: 0,
        first_name: "Select Customer",
        last_name: "",
        city: "",
      });
      setCustomers(customers);
    }
    fetchData();
  }, []);

  const selectProduct = async (productId) => {
    setSelctedProduct(productId);
  };

  const selectCustomer = async (customerID) => {
    setSelctedCustomer(customerID);
  };

  const search = async () => {
    var filters = {
      customer_id: selctedCustomer,
      product_id: selctedProduct,
      date: date,
    };
    const resp = await axios.post(
      `http://localhost:8000/purchases/filterPurchases`,
      filters
    );
    const purchases = resp.data;
    if (purchases.name === "error") {
      setPurchasesTable(<h3>There are no purchases on such terms</h3>);
    } else {
      setPurchasesTable(<PurchasesTableComp purchases={purchases} />);
    }
  };
  return (
    <div className="container">
      <h2>Purchased Page</h2>
      <br />
      <div style={{ display: "flex", flexDirection: "row" }}>

      <SelectListComp callback={selectProduct} list={products} />
      <SelectListComp callback={selectCustomer} list={customers} />
      <input
        type="date"
        onChange={(e) => setDate(e.target.value)}
        name="date"
        id="date"
      />
      <button onClick={search}>Search</button>
    </div>

      <br />
      {purchasesTable}
    </div>
  );
};

export default PurchasedPage;
