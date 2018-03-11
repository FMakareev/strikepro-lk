import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Alert, Button, Col, ModalBody, ModalFooter, Row} from "reactstrap";
import {Field, reduxForm} from "redux-form";
import {InputText} from "../../input/input_text/input_text";
import {maxLength255, required} from "../form_register/form_registration-validate";

@reduxForm({
    form: 'FormFeedback',
})
export class FormFeedback extends Component {

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

    onSubmit(){

    }

    onCancel(){

    }

    render() {
        const {error, handleSubmit, pristine, reset, submitting, roles, type} = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <ModalBody>
                    <Field
                        name="token"
                        component="input"
                        type="hidden"
                    />
                    <div className="row">
                        <div className="col-md-6">
                            <Field
                                name="name"
                                component={InputText}
                                label="Ваше имя"
                                type="text"
                                validate={[required, maxLength255]}
                            />
                        </div>
                        <div className="col-md-6">
                            <Field
                                name="name"
                                component={InputText}
                                label="Email"
                                type="text"
                                validate={[required, maxLength255]}
                            />
                        </div>
                        <div className="col-md-12">
                            <Field
                                name="comment"
                                component={InputText}
                                label="Сообщение"
                                type="textarea"
                                validate={[required, maxLength255]}
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