import CustomerBoughtComp from "./CustomerBoughtComp";
import {  Link } from 'react-router-dom'
import axios from "axios";

const ProductComp = (props) => {

  const sendCompToFather = async () => {
    const resp = await axios.get(
      `http://localhost:8000/products/${props.product.id}/customers`
    );
    const customers = await resp.data[1].rows;
    if(customers.length > 0){
      props.callback(<CustomerBoughtComp store={props.store} customers={customers} />)
    }
    else{
      props.callback(<h5>No customer has yet purchased this product</h5>)
    }
  };

  const setProductInStore = (product) =>{
    props.store.setProduct(product);
  }

  return (
    <div>
      
      <div className="Item">
      <Link to="/editProduct" onClick={() => setProductInStore(props.product)}>
          {props.product?.name} <br />
        </Link>
        {props.product?.price} <br />
        {props.product?.quantity}
        <button style={{ width: 'fit-content', marginLeft: '55%' }} onClick={sendCompToFather}>Customers</button>
      </div>
    </div>
  );
};

export default ProductComp;
