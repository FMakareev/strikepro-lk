import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Alert, Button, Col, ModalBody, ModalFooter, Row} from "reactstrap";
import {Field, reduxForm} from "redux-form";
import {InputText} from "../../Input/InputText/InputText";

import {SelectDefault} from "../../select/select_default";
import {connect as connectRestEasy} from '@brigad/redux-rest-easy'

import {
  getStore,
  hasSucceededGetStore,
  hasFailedGetStore, GetStoreAction,
} from "../../../store/reduxRestEasy/store";
import {
  CreateOrderAction,
  UpdateOrderAction,
  DeleteOrderAction,
  hasSucceededGetOrders,
  hasFailedGetOrders,

  isCreateOrder,
  isUpdateOrder,
  isDeleteOrder,
  ResetOrders
} from "../../../store/reduxRestEasy/order";


@reduxForm({
  form: 'FormOrderCreate',
})
@connectRestEasy(
  (state, ownProps) => ({
    store: getStore(state, ownProps),
    hasSucceededGetStore: hasSucceededGetStore(state, ownProps),
    hasFailedGetStore: hasFailedGetStore(state, ownProps),
    isCreateOrder: isCreateOrder(state, ownProps),
    isUpdateOrder: isUpdateOrder(state, ownProps),
    isDeleteOrder: isDeleteOrder(state, ownProps)
  }),
  dispatch => ({
    CreateOrderAction: body => dispatch(CreateOrderAction({body})),
    UpdateOrderAction: (body, urlParams) =>
      dispatch(UpdateOrderAction({urlParams, body})),
    DeleteOrderAction: urlParams => dispatch(DeleteOrderAction({urlParams})),
    GetStoreAction: () => dispatch(GetStoreAction()),
    ResetOrder: () => dispatch(ResetOrders())
  })
)
export class FormOrderCreate extends Component {

  static propTypes = {
    closeForm: PropTypes.func,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  get initialState() {
    return {}
  }

  componentDidMount() {
    this.props.GetStoreAction()
  }

  onSubmit(value) {
    console.log('value: ', value);
    const data = Object.assign({}, value);
    this.props.CreateOrderAction(data)
      .then((response) => {
        console.log(response);
        this.props.reset();
        this.props.closeForm();
      }).catch(error => {
      console.log(error);
    })
  }

  onCancel() {

  }

  render() {
    const {error, handleSubmit, pristine, reset, submitting, hasSucceededGetStore, store} = this.props;
    console.log(this.props);
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <ModalBody>
          <div className="row">
            <div className="col-md-12">
              <Field
                name={"store.id"}
                labelKey={'label'}
                valueKey={'value'}
                isLoading={!hasSucceededGetStore}
                disabled={!hasSucceededGetStore}
                options={store && store.map(item => ({
                  label: item.name,
                  value: item.id,
                }))}
                component={SelectDefault}
                label="Выберите магазин"
                // validate={[required]}
              />
            </div>
          </div>

          {
            error &&
            <Row>
              <Col xs="12">
                <Alert color="danger">
                  {error}
                </Alert>
              </Col>
            </Row>
          }
        </ModalBody>
        <ModalFooter>
          <Button disabled={!hasSucceededGetStore} type="submit" color="primary">Отправить</Button>
        </ModalFooter>
      </form>
    )
  }
}
