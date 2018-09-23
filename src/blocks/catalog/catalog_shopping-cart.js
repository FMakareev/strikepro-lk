import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {Store} from '../../store/store';
// import {CatalogProductRow} from "./catalog_product-row";

// function mapStateToProps(store) {
//     return {
//         products: store.order.products,
//         store
//     }
// }
//
@connect(
  state => ({ // получаем данные из store
    shopping_cart: state.shopping_cart,
  }), //
  dispatch => ({
    setStore: (type, value) => {
      dispatch({type: type, payload: value})
    }
  })
)
export class CatalogShoppingCart extends Component {

  constructor(props) {
    super(props);
    this.state = this.initialState;

  }

  get initialState() {
    return {}
  }

  render() {
    const {shopping_cart: {order, load, error, success}} = this.props;
    if (!order) return null;
    // if(!success) return null;
    return (<div className="panel shopping-cart__wrap">
      <a title="Перейти в корзину" className="shopping-cart__desc">
        <strong>Корзина:</strong>
        {order.total_products} / {order.total_price}
      </a>
    </div>)
  }
}
