import { useState, useEffect } from "react";
import axios from "axios";
import { observer } from "mobx-react-lite";
import {  Link } from 'react-router-dom'


const ProductsOfCustomerComp = (props) => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function fetchData() {
      const resp = await axios.get(
        `http://localhost:8000/customers/${props.id}/products`
      );
      const products = await resp.data[1]?.rows;
      setProducts(products);
    }
    fetchData();
  }, [props.id]);

  const setProductInStore = (product) =>{
    props.store.setProduct(product);
  }

  return (
    <div className="ItemsList" >
      <br />
    {props.name + ` Products:`} <br /><br />
      {products.map((product, index) => {
        return (
          <div key={index}>
            <div  className="Item" >
              Name:{" "}
              <Link to="/editProduct" onClick={() => setProductInStore(product)}>
                {product.name} <br />
              </Link>
              Price: {product.price} <br />
              Quantity: {product.quantity} <br />
              <br />
          </div>
          <br />
          </div>
        );
      })}
      <br />
      <br />
    </div>
  );
};

export default observer(ProductsOfCustomerComp);

