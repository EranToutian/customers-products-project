import { useState, useEffect } from "react";
import ProductComp from "../Components/ProductComp";
import axios from "axios";
import { observer } from "mobx-react-lite";

const ProductsPage = (props) => {
  const [products, setProducts] = useState([]);
  const [customersComp, setCustomersComp] = useState('');
  const [customersDivFlag, setCustomersDivFlag] = useState(false)
  const [numberOfPurchases, setNumberOfPurchases] = useState('')

  const loadCustomersComponents = (compFromChild) => {
    setCustomersComp(<div className="ItemsList"> {compFromChild }
    </div>);
    setCustomersDivFlag(true)
  };

  useEffect(() => {
    async function fetchData() {
      // const accessToken = sessionStorage["accessToken"];

      // const resp = await fetch("http://localhost:8000/products", {
      //   method: "get",
      //   headers: { "x-access-token": accessToken },
      // });
      const resp = await axios.get("http://localhost:8000/products");
      const products = await resp.data;
      setProducts(products);
      const resp2 = await axios.get("http://localhost:8000/purchases");
      const purchases = await resp2.data.count;
      setNumberOfPurchases(purchases);
    }
    fetchData();
    if(props.store){
      props.store.setRender(false)
  }
  }, [props.store,props.store.render]);
  return (
    <div className="container">
      <h2>Products Page</h2>
      <h4>Total amount of purchases products: <strong> {numberOfPurchases} </strong> </h4>
      <br />
      <br />
      <br />
      <div className="ItemsList">
        <br />
        {products.map((product, index) => {
          return (
            <div key={index}>
              {" "}
              <ProductComp
                key={index}
                product={product}
                store={props.store}
                callback={loadCustomersComponents}
              />{" "}
              <br />{" "}
            </div>
          );
        })}
      </div>
          {customersDivFlag && customersComp}
    </div>
  );
};

export default observer(ProductsPage);
