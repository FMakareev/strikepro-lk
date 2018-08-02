import React, {Component} from 'react';
import {Field, FormSection, reduxForm, formValueSelector, FieldArray} from "redux-form";
import {Alert, Button, Col, ModalBody, ModalFooter, Row} from "reactstrap";
import {InputText} from "../Input/InputText/InputText";
import {maxLength255, required} from "./form_register/form_registration-validate";
import {WorkingHoursItem} from "./form_array/form_array-working-hours";
import {connect as connectRestEasy} from "@brigad/redux-rest-easy/dist/redux-rest-easy.es";
import {
    CreateStoreAction, DeleteStoreAction, getStore, GetStoreAction,
    isCreateStore,
    isDeleteStore,
    isGetStore,
    isUpdateStore, UpdateStoreAction
} from "../../store/reduxRestEasy/store";

const data = [
    {
        type: 'monday',
        from: '',
        to: ''
    }, {
        type: 'tuesday',
        from: '',
        to: ''
    }, {
        type: 'wednesday',
        from: '',
        to: ''
    }, {
        type: 'thursday',
        from: '',
        to: ''
    }, {
        type: 'friday',
        from: '',
        to: ''
    }, {
        type: 'saturday',
        from: '',
        to: ''
    }, {
        type: 'sunday',
        from: '',
        to: ''
    }
]


@reduxForm({
    form: 'FormStoreEdit',
})

@connectRestEasy(
    (state, ownProps) => ({
        getStore: getStore(state),
        isGetStore:isGetStore(state, ownProps),
        isCreateStore: isCreateStore(state, ownProps),
        isUpdateStore: isUpdateStore(state, ownProps),
        isDeleteStore: isDeleteStore(state, ownProps),
    }),
    dispatch => ({
        CreateStoreAction: body => dispatch(CreateStoreAction({body})),
        UpdateStoreAction: (body,urlParams) => dispatch(UpdateStoreAction({urlParams,body})),
        DeleteStoreAction: (urlParams) => dispatch(DeleteStoreAction({urlParams})),
        GetStoreAction: () => dispatch(GetStoreAction()),
    })
)
class FormStoreEdit extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    get initialState() {
        return {}
    }

    onCancel() {
        this.props.toggleModal()
    }

    async onSubmit(values) {
        console.log(values);
        this.props.CreateStoreAction(values);
        // this.props.toggleModal()
        // const data = await fetch('http://alex.taran.ru/api/v1/auth/register', {
        //     method: 'POST',
        //     credentials: 'include',
        //     cache: 'no-cache',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(values),
        // }).then(response => {
        //     console.log(response);
        //     if (response.status >= 200 && response.status < 300) {
        //         return Promise.resolve(response);
        //     }
        //     return Promise.reject(response);
        // }).then((response) => {
        //     return response.json()
        // }).then((response) => {
        //     return response
        // }).catch(error => {
        //     console.log(error);
        // });
        // console.log(data);
    }

    render() {
        const {error, handleSubmit, pristine, reset, submitting, roles, type} = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <ModalBody>
                    <Field
                        name="id"
                        component="input"
                        type="hidden"
                    />
                    <h2>О магазине</h2>
                    <div className="row">
                        <div className="col-md-6">
                            <Field
                                name="name"
                                component={InputText}
                                label="Название магазина"
                                type="text"
                                validate={[required, maxLength255]}
                            />
                        </div>
                        <div className="col-md-6">
                            <Field
                                name="address"
                                component={InputText}
                                label="Адрес"
                                type="text"
                                validate={[required, maxLength255]}
                            />
                        </div>
                        <div className="col-md-12">

                            <FieldArray name="workinghours" data={data} component={WorkingHoursItem}/>
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
                    <Button type="button" color="secondary" onClick={this.onCancel}>Отмена</Button>{' '}
                    <Button type="submit" color="primary">Сохранить</Button>
                </ModalFooter>
            </form>
        )
    }
}

FormStoreEdit.propTypes = {};

FormStoreEdit.defaultProps = {};

export {FormStoreEdit};