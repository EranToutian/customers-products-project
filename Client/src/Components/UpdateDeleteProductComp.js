import { useState } from "react";
import { observer } from "mobx-react-lite";
import axios from "axios";

const UpdateDeleteProductComp = ({ store }) => {
  const [name, setName] = useState(store.currentProduct.name)
  const [price, setPrice] = useState(store.currentProduct.price)
  const [quantity, setQuantity] = useState(store.currentProduct.quantity)

  const updateProduct= async () => {
    const product = {
      id: store.currentProduct.id,
      name: "" + name,
      price: "" + price,
      quantity: "" + quantity,
    };
    await axios.put(`http://localhost:8000/products`, product);
    store.setProduct(product);
  };

  const deleteProduct = async () => {
    console.log(store.currentProduct.id);
    await axios.delete(
      `http://localhost:8000/products/${store.currentProduct.id}`
    );
    setName('');
    setPrice('');
    setQuantity('');
    // store.setEmptyProduct();
  };

  return (
    <div className="UpdateDeleteComp">
      Name:{" "} <br></br>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        name="name"
        value={name}
      />{" "}
      <br />
      Price:{" "}<br></br>
      <input
        type="number"
        onChange={(e) => setPrice(e.target.value)}
        name="price"
        value={price}
      />{" "}
      <br />
      Quantity:{" "}<br></br>
      <input
        type="number"
        onChange={(e) => setQuantity(e.target.value)}
        name="quantity"
        value={quantity}
      />{" "}
      <br /> <br />
      <button style={{padding: '6px'}} onClick={updateProduct}>Update</button>
      <button style={{padding: '6px', marginLeft: '50px' }} onClick={deleteProduct}>Delete</button>
    </div>
  );
};

export default observer(UpdateDeleteProductComp);
