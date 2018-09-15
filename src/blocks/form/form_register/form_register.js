import React, {Component} from 'react';
import {Alert, Button, Card, CardFooter, CardHeader, Col, Row} from "reactstrap";
import {Field, FormSection, reduxForm, SubmissionError, getFormValues} from "redux-form";
import {connect as connectRestEasy} from "@brigad/redux-rest-easy";

import {FormSectionUser} from "../form_section/form_section-user";
import {FormSectionActivities} from "../form_section/form_section-activities";
import {FormSectionEmail, FormSectionPhone} from "../form_section/form_section-contacts";
import {FormSectionAboutCompany} from "../form_section/form_section-about-company";
import {connect} from "react-redux";

import {CreateUserAction, isCreateUser} from '../../../store/reduxRestEasy/register'
import {BrowserHistory} from "../../../history";

function mapStateToProps(state) {
    return {
        FormState: state.form['FormRegister'],
        values: getFormValues('FormRegister')(state),
    }
}


@reduxForm({
    form: 'FormRegister',
})
@connectRestEasy(
    (state, ownProps) => ({
        isCreateUser: isCreateUser(state, ownProps),
    }),
    dispatch => ({
        CreateUserAction: body => dispatch(CreateUserAction({body})),
    })
)
@connect(mapStateToProps)
export class FormRegister extends Component {

    FROM_TYPE_LEGAL_ENTITY = 'legal_entity';
    FORM_TYPE_INDIVIDUAL_ENTREPRENEUR = 'individual_entrepreneur';
    FROM_TYPE_LEGAL_ENTITY_NOT_RF = 'legal_entity_not_rf';

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.onSubmit = this.onSubmit.bind(this);
    }

    get initialState() {
        return {}
    }

    transformValue(data) {

        const value = Object.assign({}, data);

        console.log('transformValue: ', value);

        value.company.contacts = [
            ...(value.company.phone ? value.company.phone: null),
            ...(value.company.email ? value.company.email: null),
        ];

        console.log('transformValue: ', value);
        if(value.company.email){
            delete value.company.email;
        }
        if(value.company.phone){
            delete value.company.phone;
        }

        console.log('transformValue: ', value);


        if (value.company.places[1].isActive) {
            value.company.places[1].value = value.company.places[0].value;
            delete value.company.places[1].isActive
        }

        console.log('transformValue: ', value);


        return value;

    }

    onSubmit(data) {
        console.log('onSubmit: ', data);


        return new Promise((resolve, reject) =>
            this.props.CreateUserAction(this.transformValue(data))
                .then(response => {
                    console.log(response.normalizedPayload);
                    if(response.normalizedPayload){
                        BrowserHistory.push('/login');
                    }
                    if (response.status >= 200 && response.status < 300) {
                        resolve(response);
                    } else if (response.status === 422) {
                        return Promise.reject(response);
                    }
                    return Promise.reject(response);
                }).catch(error => {
                console.log(error);
                console.log(error.message);
                reject(new SubmissionError({_error: error.message}));
            }))

    }

    render() {
        const {error, handleSubmit, pristine, reset, submitting, roles, type} = this.props;
        console.log(this.props);
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

                    {/*<Card>*/}
                        {/*<CardHeader>*/}
                            {/*<h2><strong>Виды деятельности</strong></h2>*/}
                        {/*</CardHeader>*/}
                        {/*<FormSectionActivities/>*/}
                    {/*</Card>*/}

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