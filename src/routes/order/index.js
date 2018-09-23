import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {PageTitle} from "../../blocks/PageTitle/PageTitle";
import {
  couldPerformGetOrders, CreateOrderAction,
  DeleteOrderAction, getMetadataGetOrders, GetOrderAction, GetOrderById, GetOrders,
  GetOrdersAction, getResourceGetOrders,
  hasFailedGetOrder,
  hasSucceededGetOrder, isCreateOrder, isDeleteOrder, isPerformingGetOrders, isUpdateOrder,
  isValidGetOrders,
  ResetOrders, UpdateOrderAction
} from "../../store/reduxRestEasy/order";
import {connect as connectRestEasy} from "@brigad/redux-rest-easy";

// import {order} from './orders';

@connectRestEasy(
  (state, ownProps) => ({
    orders: GetOrders(state, ownProps),
    order: GetOrderById(state, ownProps),
    getResourceGetOrders: getResourceGetOrders(state, ownProps),
    getMetadataGetOrders: getMetadataGetOrders(state, ownProps),
    couldPerformGetOrders: couldPerformGetOrders(state, ownProps),
    isPerformingGetOrders: isPerformingGetOrders(state, ownProps),
    hasSucceededGetOrder: hasSucceededGetOrder(state, ownProps),
    hasFailedGetOrder: hasFailedGetOrder(state, ownProps),
    isValidGetOrders: isValidGetOrders(state, ownProps),

    isCreateOrder: isCreateOrder(state, ownProps),
    isUpdateOrder: isUpdateOrder(state, ownProps),
    isDeleteOrder: isDeleteOrder(state, ownProps)
  }),
  dispatch => ({
    CreateOrderAction: body => dispatch(CreateOrderAction({body})),
    UpdateOrderAction: (body, urlParams) =>
      dispatch(UpdateOrderAction({urlParams, body})),
    DeleteOrderAction: urlParams => dispatch(DeleteOrderAction({urlParams})),
    ResetOrder: () => dispatch(ResetOrders()),
    GetOrderAction: (urlParams) => dispatch(GetOrderAction({urlParams})),
  })
)
class OrderPage extends Component {

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return {
      id: this.props.match.params.id,
      product: null,
      loading: true
    }
  }

  componentDidMount() {
    console.log(this.props);
    const {match: {params}} = this.props;
    this.props.GetOrderAction({id: params.id})
  }


  renderRow(item, index) {
    console.log((parseFloat(item.price.price) * parseFloat(item.total)).toFixed(2));
    return (
      <tr key={index}>
        <td>{item.article}</td>
        <td>{item.code}</td>
        <td>
          <img src="{product.image.thumb_image}" alt="" width="60"
               height="40"/>
        </td>
        <td>{item.name}</td>
        <td>{item.unit}</td>
        <td>{item.manufacturers}</td>
        <td style={{whiteSpace: 'nowrap'}}>{item.price.price} <i className="fa fa-rub" aria-hidden="true"/></td>
        <td>{item.balance}</td>
        <td> {item.count} </td>
        <td style={{whiteSpace: 'nowrap'}}>{(parseFloat(item.price.price) * parseFloat(item.total)).toFixed(2)} <i className="fa fa-rub" aria-hidden="true"/></td>
        <td>
          <button type="button" className="btn__control">
            <i className="fa fa-trash" aria-hidden="true"></i>
          </button>
        </td>
      </tr>
    )
  }

  render() {
    const {orders, hasSucceededGetOrder, hasFailedGetOrder} = this.props;
    console.log('OrderPage: ', this.props);
    return (
      <div id="body-container" className="animsition dashboard-page">

        <PageTitle>
          Заказ № {hasSucceededGetOrder && orders[0].id}
        </PageTitle>
        <div className="row">
          <div className="col-sm-12">
            <div className="panel panel-default">
              <div className="panel-body ">
                {
                  !hasSucceededGetOrder && (
                    <h2>Loading</h2>
                  )
                }
                {
                  hasSucceededGetOrder && (
                    <table className="table table-bordered" style={{
                      border: 'none'
                    }}>
                      <thead>
                      <tr>
                        <th width="100">Артикул</th>
                        <th width="100">Код</th>
                        <th>Изображение</th>
                        <th>Название</th>
                        <th width="80">Ед.</th>
                        <th>Страна</th>
                        <th>Цена</th>
                        <th width="80">Остаток</th>
                        <th width="150">Кол-во</th>
                        <th width="140">Общая стоимость</th>
                        <th width="50"></th>
                      </tr>
                      </thead>
                      <tbody>
                      {
                        orders && orders[0].products.map((item, index) => {
                          return this.renderRow(item, index);
                        })
                      }
                      </tbody>
                    </table>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

OrderPage.propTypes = {};

OrderPage.defaultProps = {};

export default OrderPage;
