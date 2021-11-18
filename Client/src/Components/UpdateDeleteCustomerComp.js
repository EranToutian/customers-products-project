import { useState } from "react";
import axios from "axios";
import { observer } from "mobx-react-lite";


const UpdateDeleteCustomerComp = ({ store }) => {
  const [firstName, setFirstName] = useState(store.currentCustomer.first_name);
  const [lastName, setLastName] = useState(store.currentCustomer.last_name);
  const [city, setCity] = useState(store.currentCustomer.city);

  const updateCustomer = async () => {
    const customer = {
      customer_id: store.currentCustomer.customer_id,
      first_name: "" + firstName,
      last_name: "" + lastName,
      city: "" + city,
    };
    await axios.put(`http://localhost:8000/customers`, customer);
    store.setCustomer(customer);
  };

  const deleteCustomer = async () => {
    await axios.delete(
      `http://localhost:8000/customers/${store.currentCustomer.customer_id}`
    );
    setFirstName('');
    setLastName('');
    setCity('');
    store.setCustomer({});
  };

  return (
    <div className="UpdateDeleteComp">
      First Name:{" "} <br />
      <input
        type="text"
        onChange={(e) => setFirstName(e.target.value)}
        name="first_name"
        value={firstName}
      />{" "}
      <br />
      Last Name:{" "} <br />
      <input
        type="text"
        onChange={(e) => setLastName(e.target.value)}
        name="last_name"
        value={lastName}
      /> <br />
      City: <br></br>
       <input
        type="text"
        onChange={(e) => setCity(e.target.value)}
        name="city"
        value={city}
      />{" "}
      <br /><br /><br />
      <button style={{ width: 'fit-content', marginLeft: '0' }} onClick={updateCustomer}>Update</button>
      <button style={{ width: 'fit-content', marginLeft: '40px' }} onClick={deleteCustomer}>Delete</button>
    </div>
  );
};

export default observer(UpdateDeleteCustomerComp);
