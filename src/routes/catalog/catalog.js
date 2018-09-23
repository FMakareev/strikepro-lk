import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {PageTitle} from "../../blocks/PageTitle/PageTitle";
import './catalog.css';
// import {CatalogFilter} from "../../blocks/catalog/catalog_filter";
import {CatalogSidebar} from "../../blocks/catalog/catalog_sidebar";
import {CatalogContent} from "../../blocks/catalog/catalog_content";
import {CatalogShoppingCart} from "../../blocks/catalog/catalog_shopping-cart";
import {Store} from '../../store/store';
import {initShoppingCart} from "../../store/reducers/shopping_cart/actions";
import {connect as connectRestEasy} from "@brigad/redux-rest-easy";
import {CatalogAction, getCatalog, isCatalog} from "../../store/reduxRestEasy/catalog";
import {GetOrderAction} from "../../store/reduxRestEasy/order";


@connectRestEasy(
  (state, ownProps) => ({
    isLogin: isCatalog(state, ownProps),
    getCatalog: getCatalog(state),
  }),
  dispatch => ({
    GetOrderAction: (urlParams) => dispatch(GetOrderAction({urlParams})),

    CatalogAction: urlParams => dispatch(CatalogAction({urlParams})),
  })
)
export class Catalog extends Component {

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return {}
  }

  componentWillMount() {

  }

  componentDidMount() {
    const {match: {params}} = this.props;
    console.log('this.props: ', this.props);
    if(params.id){
      this.props.GetOrderAction(params)
        .then(response => {
          Store.dispatch(initShoppingCart(response.normalizedPayload.orders[params.id]));
          return response;
        }).catch(error => {
        console.log(error);
      });
    }
  }

  render() {
    const {sum, count} = this.state;
    console.log(this.props);
    return (
      <div id="body-container" className="animsition dashboard-page">
        <PageTitle>
          Каталог
        </PageTitle>
        <div className="catalog_wrapper clearfix">
          <CatalogSidebar/>
          <div className="catalog_content">
            <div className="panel panel-default">
              <CatalogContent/>
              <CatalogShoppingCart/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
