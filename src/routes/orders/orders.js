import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {PageTitle} from "../../blocks/PageTitle/PageTitle";
import {OrdersTabs} from "../../blocks/OrdersTabs/OrdersTabs";
import {ModalOrderCreate} from "../../blocks/modal/modal_order-create";
import {connect as connectRestEasy} from '@brigad/redux-rest-easy'
import {
  CreateOrderAction,
  DeleteOrderAction,
  isCreateOrder,
  isDeleteOrder,
  isUpdateOrder,
  ResetOrders,
  UpdateOrderAction,
  GetOrdersAction,
  GetOrders,
  getResourceGetOrders,
  getMetadataGetOrders,
  couldPerformGetOrders,
  isPerformingGetOrders,
  hasSucceededGetOrders, hasFailedGetOrders, isValidGetOrders
} from "../../store/reduxRestEasy/order";


@connectRestEasy(
  (state, ownProps) => ({
    orders: GetOrders(state, ownProps),
    getResourceGetOrders: getResourceGetOrders(state, ownProps),
    getMetadataGetOrders: getMetadataGetOrders(state, ownProps),
    couldPerformGetOrders: couldPerformGetOrders(state, ownProps),
    isPerformingGetOrders: isPerformingGetOrders(state, ownProps),
    hasSucceededGetOrders: hasSucceededGetOrders(state, ownProps),
    hasFailedGetOrders: hasFailedGetOrders(state, ownProps),
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
    GetOrdersAction: () => dispatch(GetOrdersAction()),
  })
)
class Orders extends Component {

  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.orderStatusSort = this.orderStatusSort.bind(this);
  }

  get initialState() {
    return {
      loading: true,
      error: null
    }
  }

  componentDidMount() {
    // this.orderStatusSort(order);
    this.props.GetOrdersAction()
  }

  orderStatusSort(data) {
    let statusArray = {};
    data.map((item) => {
      statusArray[item.status] = []
    });
    data.map((item) => {
      statusArray[item.status].push(item)
    });
    console.log(Object.keys(statusArray).sort());
    this.setState({data: statusArray, loading: false});
  }

  noOrder() {
    return (
      <div id="body-container" className="animsition dashboard-page">

        <PageTitle>
          Заказыы
          <div className="float-right" style={{
            margin: "-4px 0 0 0",
            float: 'right'
          }}>
            <ModalOrderCreate/>
          </div>
        </PageTitle>

        <div className="row">
          <div className="col-sm-12">
            <div className="panel panel-default">
              <div className="panel-body">
                <h3>У вас нет заказов.</h3>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }

  render() {

    const {orders, hasSucceededGetOrders,hasFailedGetOrders} = this.props;
    console.log('orders:',this.props);
    console.log('orders hasFailedGetOrders:',hasFailedGetOrders);
    console.log('orders hasSucceededGetOrders:',hasSucceededGetOrders);
    console.log('orders orders:',orders);

    return (
      <div id="body-container" className="animsition dashboard-page">

        <PageTitle>
          Заказы
          <div className="float-right" style={{
            margin: "-4px 0 0 0",
            float: 'right'
          }}>
            <ModalOrderCreate/>
          </div>
        </PageTitle>
        <div className="row">
          <div className="col-sm-12">
            <div className="panel panel-default">
              <div className="panel-body">
                {
                  !hasSucceededGetOrders && <div>loading...</div>
                }
                {
                  hasFailedGetOrders && <div>Ошибка</div>
                }
                {
                  !orders.length && this.noOrder()
                }
                {hasSucceededGetOrders && <OrdersTabs orders={orders}/>}
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

Orders.propTypes = {};

Orders.defaultProps = {};

export {Orders};
