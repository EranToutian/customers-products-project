import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import AddProductComp from '../Components/AddProductComp'

const CustomersTableComp = (props) => {
  const [customers, setCustomers] = useState([]);
  const [addProductComp, setAddProductComp] = useState([])


  useEffect(() => {
    async function fetchData() {
      const resp = await axios.get(`http://localhost:8000/customers`);
      var customers = resp.data;
      var responses = [];
      customers.map((customer) => {
        return responses.push(getDetails(customer));
      });
      const results = await Promise.all(responses);
      setCustomers(results);
    }
    fetchData();
    if(props.store){
        props.store.setRender(false)
    }
  }, [props.store,props.store.render]);

  const getDetails = async (customer) => {
    const resp = await axios.get(
      `http://localhost:8000/customers/${customer.id}/purchasesDetails`
    );

    const details = resp.data.rows;
    return { customer, details };
  };

  const setProductInStore = (product) => {
    props.store.setProduct(product);
  };

  const addProductToCustomer = (customer) =>{
    const comp = <AddProductComp style={{width: "20%"}} store={props.store} customer={customer}/>
    setAddProductComp(comp)
  }

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <td>
              <strong>Customers</strong>
            </td>
            <td>
              <strong>Products</strong>
            </td>
            <td>
              <strong>Purchesed</strong>
            </td>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => {
            return (
              <tr key={index}>
                <td>
                  {customer.customer.first_name +
                    " " +
                    customer.customer.last_name}
                    <br /><br />
                  <button style={{ width: 'fit-content', marginLeft: '0px' }} onClick={() => addProductToCustomer(customer.customer)}>Add Product</button>
                </td>
                <td>
                  {customer.details.map((product, index) => {
                    return (
                      <Link
                        key={index}
                        to="/editProduct"
                        onClick={() => setProductInStore(product)}
                      >
                        <li> {product.name} </li>
                      </Link>
                    );
                  })}
                </td>
                <td>
                  {customer.details.map((purchase, index) => {
                    return (
                        <li key={index}> {purchase.date.slice(0,10)} </li>
                    );
                  })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      {addProductComp}
    </div>
  );
};

export default observer(CustomersTableComp);
