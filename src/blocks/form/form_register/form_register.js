import React, {Component} from 'react';
import {Alert, Button, Card, CardFooter, CardHeader, Col, Row} from "reactstrap";
import {Field, FormSection, reduxForm, formValueSelector, SubmissionError, getFormValues} from "redux-form";

import {FormSectionUser} from "../form_section/form_section-user";
import {FormSectionActivities} from "../form_section/form_section-activities";
import {FormSectionEmail, FormSectionPhone} from "../form_section/form_section-contacts";
import {FormSectionAboutCompany} from "../form_section/form_section-about-company";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {ServerValidError} from "../../../store/reducers/form_register/actions";

// TODO: допилить отправку данных на сервак
// TODO: Тестировать
// TODO: на будующее запилить компонент stepper

function mapStateToProps(state) {
    return {
        FormState: state.form['FormRegister'],
        values: getFormValues('FormRegister')(state),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ServerValidError: bindActionCreators(ServerValidError, dispatch),
    }
}

function mergeProps({FormState,values}, dispatchProps, ownProps) {
    // console.log(FormState,values, dispatchProps, ownProps);

    return Object.assign({}, ownProps, {
        FormState,
        values,
        ServerValidError: (value) => dispatchProps.ServerValidError(FormState, value),
    });
}

@reduxForm({
    form: 'FormRegister',
})
@connect(mapStateToProps, mapDispatchToProps, mergeProps)
export class FormRegister extends Component {

    static FROM_TYPE_LEGAL_ENTITY = 'legal_entity';
    static FORM_TYPE_INDIVIDUAL_ENTREPRENEUR = 'individual_entrepreneur';
    static FROM_TYPE_LEGAL_ENTITY_NOT_RF = 'legal_entity_not_rf';

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.onSubmit = this.onSubmit.bind(this);
        this.onServerValidError = this.onServerValidError.bind(this);
    }

    get initialState() {
        return {}
    }

    async onServerValidError(promis) {
        const data = await promis
            .then((respons) => {
                return respons.json();

            }) .then((respons) => {
                return respons;
            });
        this.props.ServerValidError(data);

    }

    async onSubmit(val) {
        console.log(val);


        let values = JSON.parse(JSON.stringify(val));
        // values.company.contacts = [...values.company.email, ...values.company.phone];
        // delete values.company.email;
        // delete values.company.phone;
        //
        const data = await fetch('http://alex.taran.ru/api/v1/auth/register', {
            method: 'POST',
            credentials: 'include',
            cache: 'no-cache',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        }).then(response => {
            console.log(response);
            if (response.status >= 200 && response.status < 300) {
                return Promise.resolve(response);
            } else if (response.status === 422) {
                this.onServerValidError(Promise.resolve(response));
            }
            return Promise.reject(response);
        })

    }

    render() {
        const {error, handleSubmit, pristine, reset, submitting, roles, type} = this.props;
        // console.log(this.props);
        return (
            <form style={{
                maxWidth: '768px',
                margin: '0 auto',
                color: '#666',
                textAlign: 'left'
            }} onSubmit={handleSubmit(this.onSubmit)}>

                <CardHeader>
                    <h1><strong>Регистрация</strong></h1>
                    <small>{type}</small>
                </CardHeader>

                <Field
                    name="form_type"
                    component="input"
                    type="hidden"
                />
                <FormSection name="company">
                    <Card>
                        <CardHeader>
                            <h2><strong>О компании</strong></h2>
                        </CardHeader>
                        <FormSectionAboutCompany type={type}/>
                    </Card>

                    <Card>
                        <CardHeader>
                            <h2><strong>Email</strong></h2>
                        </CardHeader>
                        <FormSectionEmail/>
                    </Card>

                    <Card>
                        <CardHeader>
                            <h2><strong>Телефон</strong></h2>
                        </CardHeader>
                        <FormSectionPhone/>
                    </Card>

                    <Card>
                        <CardHeader>
                            <h2><strong>Пользователь портала</strong></h2>
                        </CardHeader>
                        <FormSectionUser/>
                    </Card>

                    {/*<Card>*/}
                    {/*<CardHeader>*/}
                    {/*<h2><strong>Персонал</strong></h2>*/}
                    {/*</CardHeader>*/}
                    {/*<FormSectionPersons/>*/}
                    {/*</Card>*/}

                    <Card>
                        <CardHeader>
                            <h2><strong>Виды деятельности</strong></h2>
                        </CardHeader>
                        <FormSectionActivities/>
                    </Card>

                    {/*<Card>*/}
                    {/*<CardHeader>*/}
                    {/*<h2><strong>Транспортная компания</strong></h2>*/}
                    {/*</CardHeader>*/}
                    {/*<FormSectionCarrier/>*/}
                    {/*</Card>*/}


                </FormSection>

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
                <CardFooter>
                    <Button type="submit" color="primary">Отправить</Button>{' '}
                    {/*<i className="fa fa-chevron-left"></i> Назад*/}

                    {/*Далее <i className="fa fa-chevron-right"></i>*/}

                </CardFooter>
            </form>
        )
    }
}