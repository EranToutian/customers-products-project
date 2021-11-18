import { observer } from "mobx-react-lite";
import UpdateDeleteCustomerComp from "../Components/UpdateDeleteCustomerComp";
import ProductsOfCustomerComp from "../Components/ProductsOfCustomerComp";

const EditCustomerPage = ({ store }) => {
  return (
    <div className="container">
      <h1>Edit Customer:</h1>
      <div style={{display: 'flex', flexDirection: 'row'}}>
      <UpdateDeleteCustomerComp store={store} />
      <ProductsOfCustomerComp
        id={store.currentCustomer.customer_id}
        name={store.currentCustomer.first_name}
        store={store}
      />

      </div>
    </div>
  );
};

export default observer(EditCustomerPage);
