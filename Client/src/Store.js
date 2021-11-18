import { makeObservable, observable, action } from "mobx";

class Store {
  currentCustomer = {};
  currentProduct = {};
  render = false;

  constructor() {
    makeObservable(this, {
      currentCustomer: observable,
      currentProduct: observable,
      render: observable,
      setCustomer: action,
      setProduct: action,
      setRender: action,
      setEmptyProduct: action,
    });
  }

  setCustomer(customer) {
    this.currentCustomer = {
      customer_id: customer.customer_id,
      first_name: customer.first_name,
      last_name: customer.last_name,
      city: customer.city,
    };
  }

  setProduct(product) {
    this.currentProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    };
  }

  setEmptyProduct() {
    this.currentProduct = {}
    
  }

  setRender(flag) {
    this.render = flag;
  }
}

export default Store;
