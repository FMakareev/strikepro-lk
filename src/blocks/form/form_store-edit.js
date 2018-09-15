import React, {Component} from 'react'
import {
    Field,
    FormSection,
    reduxForm,
    formValueSelector,
    FieldArray,
    SubmissionError
} from 'redux-form'
import {Alert, Button, Col, ModalBody, ModalFooter, Row} from 'reactstrap'
import {InputText} from '../Input/InputText/InputText'
import {
    maxLength255,
    required
} from './form_register/form_registration-validate'
import {WorkingHoursItem} from './form_array/form_array-working-hours'
import {
    connect as connectRestEasy
} from '@brigad/redux-rest-easy/dist/redux-rest-easy.es'
import {
    couldPerformGetStore,
    CreateStoreAction,
    DeleteStoreAction, getMetadataGetStore, getResourceGetStore,
    getStore,
    GetStoreAction, hasFailedGetStore, hasSucceededGetStore,
    isCreateStore,
    isDeleteStore, isPerformingGetStore,
    isUpdateStore, isValidGetStore,
    UpdateStoreAction
} from '../../store/reduxRestEasy/store'
import {BrowserHistory} from '../../history'

const data = [
    {
        type: 'monday',
        from: '',
        to: ''
    },
    {
        type: 'tuesday',
        from: '',
        to: ''
    },
    {
        type: 'wednesday',
        from: '',
        to: ''
    },
    {
        type: 'thursday',
        from: '',
        to: ''
    },
    {
        type: 'friday',
        from: '',
        to: ''
    },
    {
        type: 'saturday',
        from: '',
        to: ''
    },
    {
        type: 'sunday',
        from: '',
        to: ''
    }
]

@reduxForm({
    form: 'FormStoreEdit'
})
@connectRestEasy(
    (state, ownProps) => ({
        getStore: getStore(state),
        getResourceGetStore: getResourceGetStore(state, ownProps),
        getMetadataGetStore: getMetadataGetStore(state, ownProps),
        couldPerformGetStore: couldPerformGetStore(state, ownProps),
        isPerformingGetStore: isPerformingGetStore(state, ownProps),
        hasSucceededGetStore: hasSucceededGetStore(state, ownProps),
        hasFailedGetStore: hasFailedGetStore(state, ownProps),
        isValidGetStore: isValidGetStore(state, ownProps),
        isCreateStore: isCreateStore(state, ownProps),
        isUpdateStore: isUpdateStore(state, ownProps),
        isDeleteStore: isDeleteStore(state, ownProps)
    }),
    dispatch => ({
        CreateStoreAction: body => dispatch(CreateStoreAction({body})),
        UpdateStoreAction: (body, urlParams) =>
            dispatch(UpdateStoreAction({urlParams, body})),
        DeleteStoreAction: urlParams => dispatch(DeleteStoreAction({urlParams})),
        GetStoreAction: () => dispatch(GetStoreAction())
    })
)
class FormStoreEdit extends Component {
    constructor(props) {
        super(props)
        this.state = this.initialState
        this.onSubmit = this.onSubmit.bind(this)
        this.onCancel = this.onCancel.bind(this)
    }

    get initialState() {
        return {}
    }

    onCancel() {
        this.props.toggleModal()
    }

    async onSubmit(values) {
        console.log(values)

        const newValues = Object.assign({}, values)
        newValues.workinghours = JSON.stringify(newValues.workinghours)

        if (values.id) {
            return new Promise((resolve, reject) => {
                this.props
                    .UpdateStoreAction(newValues, {id: values.id})
                    .then(response => {
                        console.log(response)
                        if (response.status >= 200 && response.status < 300) {
                            this.props.toggleModal()
                            this.props.reset()
                            this.props.GetStoreAction()
                            return resolve(response)
                        } else if (response.status >= 400 || response.error) {
                            return Promise.reject(response)
                        } else {
                            this.props.toggleModal()

                            return resolve(response)
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        reject(new SubmissionError({_error: error.error.message}))
                    })
            })
        } else {
            return new Promise((resolve, reject) => {
                this.props
                    .CreateStoreAction(newValues)
                    .then(response => {
                        console.log(response)
                        if (response.status >= 200 && response.status < 300) {
                            this.props.toggleModal()
                            this.props.reset()
                            this.props.GetStoreAction()
                            return resolve(response)
                        } else if (response.status >= 400 || response.error) {
                            return Promise.reject(response)
                        } else {
                            this.props.toggleModal()

                            return resolve(response)
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        reject(new SubmissionError({_error: error.error.message}))
                    })
            })
        }


    }

    render() {
        const {
            error,
            handleSubmit,
            pristine,
            reset,
            submitting,
            roles,
            type
        } = this.props
        return (
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <ModalBody>
                    <Field name='id' component='input' type='hidden'/>
                    <Row>
                        <Col md={6}>
                            <Field
                                name='name'
                                component={InputText}
                                label='Название магазина'
                                type='text'
                                validate={[required, maxLength255]}
                            />
                        </Col>
                        <Col md={6}>
                            <Field
                                name='address'
                                component={InputText}
                                label='Адрес'
                                type='text'
                                validate={[required, maxLength255]}
                            />
                        </Col>
                        <Col xs='12'>
                            <h3>
                                Время работы
                            </h3>
                        </Col>
                        <Col xs='12'>

                            <FieldArray
                                name='workinghours'
                                data={data}
                                component={WorkingHoursItem}
                            />
                        </Col>
                    </Row>

                    {error &&
                    <Row>
                        <Col xs='12'>
                            <Alert color='danger'>
                                {error}
                            </Alert>
                        </Col>
                    </Row>}
                </ModalBody>
                <ModalFooter>
                    <Button type='button' color='secondary' onClick={this.onCancel}>
                        Отмена
                    </Button>
                    {' '}
                    <Button type='submit' color='primary'>Сохранить</Button>
                </ModalFooter>
            </form>
        )
    }
}

FormStoreEdit.propTypes = {}

FormStoreEdit.defaultProps = {}

export {FormStoreEdit}
