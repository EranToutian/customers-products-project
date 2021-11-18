import { useState, useEffect } from "react";
import axios from "axios";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

const CustomerOfProductComp = (props) => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const resp = await axios.get(
        `http://localhost:8000/products/${props.id}/customers`
      );
      const customers = await resp.data[1]?.rows;
      setCustomers(customers);
    }
    fetchData();
  }, [props.id]);

  const setCustomerInStore = (customer) => {
    props.store.setCustomer(customer);
  };

  return (
    <div className="ItemsList">
      <br />
      {props.name + ` customers`}
      <br /> <br />
      {customers?.map((customer, index) => {
        return (
          <div key={index}>
          <div className="Item">
            Name:{" "}
            <Link
              to="/editCustomer"
              onClick={() => setCustomerInStore(customer)}
            >
              {customer.first_name + " " + customer.last_name} <br /> <br />
            </Link>
            City: {customer.city} <br />
          </div>
          <br />
          </div>
        );
      })}
      <br />
    </div>

  );
};

export default observer(CustomerOfProductComp);
