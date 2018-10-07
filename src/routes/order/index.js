import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { PageTitle } from '../../blocks/PageTitle/PageTitle'
import {
  couldPerformGetOrders,
  CreateOrderAction,
  DeleteOrderAction,
  getMetadataGetOrders,
  GetOrderAction,
  GetOrderById,
  GetOrders,
  GetOrdersAction,
  getResourceGetOrders,
  hasFailedGetOrder,
  hasSucceededGetOrder,
  isCreateOrder,
  isDeleteOrder,
  isPerformingGetOrders,
  isUpdateOrder,
  isValidGetOrders,
  ResetOrders,
  UpdateOrderAction
} from '../../store/reduxRestEasy/order'
import { Link } from 'react-router-dom'
import { connect as connectRestEasy } from '@brigad/redux-rest-easy'

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
    CreateOrderAction: body => dispatch(CreateOrderAction({ body })),
    UpdateOrderAction: body => dispatch(UpdateOrderAction(body)),
    DeleteOrderAction: urlParams => dispatch(DeleteOrderAction({ urlParams })),
    ResetOrder: () => dispatch(ResetOrders()),
    GetOrderAction: urlParams => dispatch(GetOrderAction({ urlParams }))
  })
)
class OrderPage extends Component {
  constructor (props) {
    super(props)
    this.state = this.initialState
    this.changeOrderStatus = this.changeOrderStatus.bind(this)
  }

  get initialState () {
    return {
      id: this.props.match.params.id,
      product: null,
      loading: true
    }
  }

  componentDidMount () {
    console.log(this.props);
    const { match: { params } } = this.props;
    this.props
      .GetOrderAction({ id: params.id })
      .then(response => {
        console.log('response: ', response);

        // this.props.GetOrderById(params.id).then(response => {
        //   console.log('response: ', response)
        //
        //  }).catch(error => {
        //   console.log('error: ', error)
        // })
      })
      .catch(error => {
        console.log('error: ', error)
      })
  }

  changeOrderStatus () {
    const { match: { params } } = this.props;

    this.props
      .UpdateOrderAction({
        body: {
          id: params.id,
          status: 'PROCESSING'
        }
      })
      .then(response => {
        console.log('response: ', response);
        this.props.GetOrderAction({ id: params.id })
      })
      .catch(error => {
        console.log('error: ', error)
      })
  }

  renderRow (item, index) {
    console.log(
      (parseFloat(item.price.price) * parseFloat(item.total)).toFixed(2)
    );
    return (
      <tr key={index}>
        <td>{item.id}</td>
        <td>{item.code}</td>
        <td>
          <img
            src='{product.image.thumb_image}'
            alt=''
            width='60'
            height='40'
          />
        </td>
        <td>{item.name}</td>
        <td style={{ whiteSpace: 'nowrap' }}>
          {item.price.price} <i className='fa fa-rub' aria-hidden='true' />
        </td>
        <td>{item.balance}</td>
        <td> {item.count} </td>
        <td style={{ whiteSpace: 'nowrap' }}>
          {(parseFloat(item.price.price) * parseFloat(item.total)).toFixed(2)}
          {' '}
          <i className='fa fa-rub' aria-hidden='true' />
        </td>
        <td>
          <button type='button' className='btn__control'>
            <i className='fa fa-trash' aria-hidden='true' />
          </button>
        </td>
      </tr>
    )
  }

  render () {
    const {
      orders,
      hasSucceededGetOrder,
      hasFailedGetOrder,
      match: { params }
    } = this.props;
    console.log('OrderPage: ', this.props);

    return (
      <div id='body-container' className='animsition dashboard-page'>

        <PageTitle>
          Заказ № {hasSucceededGetOrder && params.id}
          {hasSucceededGetOrder &&
            orders[0].status === 'ACTIVE' &&
            <div
              className='float-right'
              style={{
                margin: '-4px 0 0 0',
                float: 'right'
              }}
            >
              <button
                className={'btn btn-success'}
                onClick={() => this.changeOrderStatus()}
              >
                Обновить статус
              </button>
              <Link
                className={'btn btn-success'}
                to={{
                  pathname: '/catalog/' + orders[0].id
                }}
              >
                В каталог
              </Link>
            </div>}
        </PageTitle>
        <div className='row'>
          <div className='col-sm-12'>
            <div className='panel panel-default'>
              <div className='panel-body '>
                {!hasSucceededGetOrder && <h2>Loading</h2>}
                {hasSucceededGetOrder &&
                  <table
                    className='table table-bordered'
                    style={{
                      border: 'none'
                    }}
                  >
                    <thead>
                      <tr>
                        <th width='100'>Код</th>
                        <th width='100'>Артикул</th>
                        <th>Изображение</th>
                        <th>Название</th>
                        <th>Цена</th>
                        <th width='80'>Остаток</th>
                        <th width='150'>Кол-во</th>
                        <th width='140'>Общая стоимость</th>
                        <th width='50' />
                      </tr>
                    </thead>
                    <tbody>
                      {orders &&
                        orders[0].products.map((item, index) => {
                          return this.renderRow(item, index)
                        })}
                    </tbody>
                  </table>}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

OrderPage.propTypes = {}

OrderPage.defaultProps = {}

export default OrderPage
