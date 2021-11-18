import "./App.css";
import NavBarComp from "./Components/NavBarComp";
import EditCustomerPage from "./Pages/EditCustomerPage";
import EditProductPage from "./Pages/EditProductPage";
import ProductsPage from "./Pages/ProductsPage";
import PurchasedPage from "./Pages/PurchasedPage";
import CustomersPage from "./Pages/CustomersPage";
import React from "react";
import Store from "./Store";
import { Routes, Route } from "react-router-dom";

const App = () => {
  const store = new Store();

  return (
    <div>
      <NavBarComp />
      <Routes>
        <Route path="/customers" element={<CustomersPage store={store} />} />
        <Route path="/products" element={<ProductsPage store={store} />} />
        <Route path="/purchased" element={<PurchasedPage store={store} />} />
        <Route
          path="/editProduct"
          element={<EditProductPage store={store} />}
        />
        <Route
          path="/editCustomer"
          element={<EditCustomerPage store={store} />}
        />
      </Routes>
    </div>
  );
};
export default App;
