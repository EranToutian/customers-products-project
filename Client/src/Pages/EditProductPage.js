import { observer } from "mobx-react-lite";
import UpdateDeleteProductComp from "../Components/UpdateDeleteProductComp";
import CustomerOfProductComp from "../Components/CustomerOfProductComp";

const EditProductPage = ({ store }) => {
  return (
    <div className="container">
      <h1>Edit Product:</h1>
      <br />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <UpdateDeleteProductComp store={store} />
        <CustomerOfProductComp
          id={store.currentProduct.id}
          name={store.currentProduct.name}
          store={store}
        />
      </div>
    </div>
  );
};

export default observer(EditProductPage);
