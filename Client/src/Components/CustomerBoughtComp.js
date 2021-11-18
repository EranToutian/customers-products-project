import { useState } from "react";
import AddProductComp from "./AddProductComp";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

const CustomerBoughtComp = (props) => {
  const [addProductComp, setAddProductComp] = useState([]);
  const [selectionCustomer, setSelectionCustomer] = useState();

  const addProductToCustomer = () => {
    console.log(selectionCustomer);
    var comp ;
    if (selectionCustomer) {
      comp = (
        <AddProductComp store={props.store} customer={selectionCustomer} />
      );
    } else {
      comp = 'Please Select Cutomer by click on the box'
    }
    setAddProductComp(comp);
  };

  const setCustomerInStore = (customer) => {
    props.store.setCustomer(customer);
  };

  return (
    <div>
      <br />
      {props.customers.map((customer, index) => {
        return (
          <div
            key={index}
            onClick={() => {
              setSelectionCustomer(customer);
            }}
          >
            <div className="Item" key={index}>
              Name:{" "}
              <Link
                to="/editCustomer"
                onClick={() => setCustomerInStore(customer)}
              >
                {customer.first_name + " " + customer.last_name} <br /> <br />
              </Link>
              Purchased Date: {customer.date.slice(0, 10)} <br />
              <br />
              <br />
            </div>
            <br />
          </div>
        );
      })}
      <br />
      <button
       style={{ width: 'fit-content', marginLeft: '55%' }}
        onClick={addProductToCustomer}
      >
        Add
      </button>{" "}
      <br />
      <br />
      {addProductComp}
      <br />
    </div>
  );
};

export default observer(CustomerBoughtComp);
