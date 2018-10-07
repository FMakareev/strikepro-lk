import React, {Component} from 'react';
import {TabContent, TabPane, Nav, NavItem, NavLink, Row, Col} from 'reactstrap';
import {Link} from "react-router-dom";
import {
  couldPerformGetOrders, CreateOrderAction,
  DeleteOrderAction, getMetadataGetOrders, GetOrders,
  GetOrdersAction, getResourceGetOrders,
  hasFailedGetOrders,
  hasSucceededGetOrders, isCreateOrder, isDeleteOrder, isPerformingGetOrders, isUpdateOrder,
  isValidGetOrders,
  ResetOrders, UpdateOrderAction
} from "../../store/reduxRestEasy/order";
import {connect as connectRestEasy} from "@brigad/redux-rest-easy";
import {Orders} from "../../routes/orders/orders";

const StatusOrder = [
  {
    label: 'Активный',
    type: 'ACTIVE'
  }, {
    label: 'PROCESSING',
    type: 'PROCESSING'
  }, {
    label: 'Завершенные',
    type: 'FINISH'
  },
];

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
export class OrdersTabs extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: 0
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  deleteOrder(id) {
    const result = window.confirm("Вы уверенны?");
    if (result) {
      console.log('Удолить заказ',id);
      this.props.DeleteOrderAction({id}).then(response => {
        console.log(response);
        this.props.ResetOrder();
        this.props.GetOrdersAction();
      }).catch(error => {
        console.log(error);
      })
    } else {
      console.log('не Удолить заказ')
    }
  }

  render() {
    const {orders} = this.props;
    console.log(this.props);
    // const tabsType = Object.keys(orders);

    return (
      <div>

        <Nav tabs>
          {
            StatusOrder.map((item, index) => (<NavItem key={index}>
              <NavLink
                className={this.state.activeTab === index ? 'active' : ''}
                onClick={() => {
                  this.toggle(index);
                }}
              >
                {item.label}
              </NavLink>
            </NavItem>))
          }

        </Nav>

        <TabContent activeTab={this.state.activeTab}>

          {
            StatusOrder.map((status, index) => (<TabPane tabId={index}>
              <Row>
                <Col sm="12">
                  <table className="table table-bordered">
                    <thead>
                    <tr>
                      <th>Дата создания</th>
                      <th>Дата обновления</th>
                      <th>Номер заказа</th>
                      <th>Магазин</th>
                      <th>Сумма заказа</th>
                      <th>Кол-во позиций/Кол-во товаров</th>
                      <th>Подробности</th>
                      <th width={"100px"}></th>
                      <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                      orders.filter(item => item.status === status.type).map((item, index) => {
                        return (<tr key={index}>
                          <td>{item.created_at.date}</td>
                          <td>{item.updated_at.date}</td>
                          <td>{item.id}</td>
                          <td>{item.store_id}</td>                          
                          <td>{item.totalPrice} {' '}
                            <i className="fa fa-rub" aria-hidden="true"/>
                          </td>
                          <td>{item.products.length}/{item.total_products}</td>
                          <td align="center">
                            <Link to={{
                              pathname: '/order/' + item.id
                            }}>
                              Подробнее
                            </Link>
                          </td>
                          <td align="center">
                            <Link to={{
                              pathname: '/catalog/' + item.id
                            }}>
                              В каталог
                            </Link>
                          </td>
                          <td>
                            <button onClick={() => this.deleteOrder(item.id)}>
                              <i className="fa fa-trash" aria-hidden="true"/>
                            </button>
                          </td>
                        </tr>)
                      })
                    }
                    </tbody>
                  </table>
                </Col>
              </Row>
            </TabPane>))
          }


        </TabContent>
      </div>
    );
  }
}
