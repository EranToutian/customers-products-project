import SelectListComp from "./SelectListComp";
import { useState, useEffect } from "react";
import axios from "axios";
import { observer } from "mobx-react-lite";


const AddProductComp = (props) => {
  const [products, setProducts] = useState([]);
  const [selctedProduct, setSelctedProduct] = useState({});

  useEffect(() => {
    async function fetchData() {
      const resp = await axios.get(`http://localhost:8000/products/available`);
      const products = await resp.data;
      setProducts(products);
      if(products.length > 0){
      setSelctedProduct(products[0].id);
      }
    }
    fetchData();
  }, [props.customer]);

  const getValueFromSelect = (valueFromChild) => {
    setSelctedProduct(valueFromChild);
  };

  const postPurchase = async () => {
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
      var id = props.customer.customer_id? props.customer.customer_id : props.customer.id
    var purchase = {customer_id: id, product_id: selctedProduct, date: date}
    await axios.post(`http://localhost:8000/purchases`, purchase);
    await axios.put(`http://localhost:8000/products/${selctedProduct}/updateQuantity`)
    props.store.setRender(true)
  };

  return (
    <div className="Item">
      <h5>Add product to {props.customer.first_name} </h5>
      <SelectListComp list={products} callback={getValueFromSelect} />
      <button style={{padding: '6px', marginLeft: '70%' }} onClick={postPurchase}>Add Product</button>
      <br />
    </div>
  );
};

export default observer(AddProductComp)
