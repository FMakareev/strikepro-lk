import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Alert, Button, Col, ModalBody, ModalFooter, Row} from "reactstrap";
import {Field, reduxForm} from "redux-form";
import {InputText} from "../../input/input_text/input_text";
import {required} from "../form_register/form_registration-validate";
import {SelectDefault} from "../../select/select_default";

import {connect} from "react-redux";
import * as actions from '../../../store/reducers/order/actions';
import { bindActionCreators } from 'redux'

@connect(
    state => ({
        Store: state
    }), //
    dispatch => ({
        createOrder: bindActionCreators(actions, dispatch)
    })
)
@reduxForm({
    form: 'FormOrderCreate',
})
export class FormOrderCreate extends Component {

    static propTypes = {};

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

    onSubmit(value) {
        console.log(value);
        console.log(this.props);
        this.props.createOrder.actionCreateOrder(value);
    }

    onCancel() {

    }

    render() {
        const {error, handleSubmit, pristine, reset, submitting, roles, type} = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <ModalBody>
                    <div className="row">
                        <div className="col-md-12">
                            <Field
                                name="store_id"
                                options={[
                                    {
                                        id: 1,
                                        name: 'store 1'
                                    }, {
                                        id: 2,
                                        name: 'store 2'
                                    }, {
                                        id: 3,
                                        name: 'store 3'
                                    }
                                ]}
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
                    <Button type="submit" color="primary">Отправить</Button>
                </ModalFooter>
            </form>
        )
    }
}