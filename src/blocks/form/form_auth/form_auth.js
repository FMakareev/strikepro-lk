import React, {Component} from 'react';
import {Alert, Button} from "reactstrap";
import {Link} from "react-router-dom";
import {InputText} from "../../Input/InputText/InputText";
import {Field, getFormValues, reduxForm} from "redux-form";
import {isEmail, maxLength255, maxLength32, minLength6, required} from "../form_register/form_registration-validate";
import {config} from "../../../config";
import {BrowserHistory} from '../../../history';
import {validFail, validTrue} from '../../../store/reducers/auth/actions';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

function mapStateToProps(state) {
    return {
        AuthState: state.auth,
        values: getFormValues('FormAuth')(state),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        AuthValidFail: bindActionCreators(validFail, dispatch),
        AuthValidTrue: bindActionCreators(validTrue, dispatch),
    }
}

function mergeProps({AuthState, values}, dispatchProps, ownProps) {
    console.log(AuthState, dispatchProps, ownProps);

    return Object.assign({}, ownProps, {
        AuthState,
        values,
        AuthValidFail: (value) => dispatchProps.AuthValidFail(AuthState, value),
        AuthValidTrue: (value) => dispatchProps.AuthValidTrue(AuthState, value),
    });
}

@reduxForm({
    form: 'FormAuth',
})
@connect(mapStateToProps, mapDispatchToProps, mergeProps)
class FormAuth extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.onSubmit = this.onSubmit.bind(this);
    }

    get initialState() {
        return {}
    }

    async onSubmit(values) {
        console.log(this.props);
        console.log(values);

        const data = await fetch(config.api.baseUrl + config.api.login, {
            method: 'POST',
            credentials: 'include',
            cache: 'no-cache',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        }).then(response => {
            if (response.status >= 200 && response.status < 300) {
                this.props.AuthValidTrue(values);
                return Promise.resolve(response);
            } else if (response.status === 401) {
                this.props.AuthValidFail(values);
            }
            return Promise.reject(response);
        }).then((response) => {
            return response.json()
        }).then((response) => {
            return response
        }).catch(error => {
            console.log(error);
            return error;
        });

        // BrowserHistory.push ('/login')
        console.log(data);
    }

    errorHandler(response) {
        if (response.status === 200) {
            console.log('Успешно авторизирован:', response);
            return Promise.resolve(response);
        } else if (response.status === 302) {
            console.log('Пользователь уже авторизирован:', response);
        } else if (response.status === 401) {
            console.log('Пользователь не авторизирован:', response);
        } else if (response.status === 422) {
            console.log('Ошибка валидации:', response);
        } else if (response.status === 423) {
            console.log('Пользователь заблокирован:', response);
        } else if (response.status === 429) {
            console.log('Успешно авторизирован:', response);
        }
        return Promise.reject(response);
    }

    render() {
        const {error, handleSubmit, pristine, reset, submitting, type, AuthState, values} = this.props;
        // console.log('AuthState: ', AuthState);
        // console.log('values: ', values);
        // console.log('this.props: ', this.props);
        return (
            <form onSubmit={handleSubmit(this.onSubmit)} className="login-page-buttons">

                <div className="form-content">
                    <Field
                        name="email"
                        component={InputText}
                        placeholder={"введите email..."}
                        classNameInput="form-control input-underline input-lg"
                        type="email"
                        validate={[required, isEmail, maxLength255]}
                    />
                    <Field
                        name="password"
                        component={InputText}
                        placeholder={"введите пароль..."}
                        classNameInput="form-control input-underline input-lg"
                        type="password"
                        validate={[required, minLength6, maxLength32]}

                    />

                    {
                        error &&
                        <fieldset className="form-group">
                            <Alert color="danger">
                                {error}
                            </Alert>
                        </fieldset>
                    }
                    {
                        values && values.email && AuthState && AuthState[values.email] && AuthState[values.email].count !== 0 &&
                        <fieldset className="form-group">
                            <Alert color="danger">
                                Неверно введен логин или пароль. Осталось: {
                                AuthState[values.email].count
                            } попытки
                            </Alert>
                        </fieldset>

                    }
                    {
                        values && values.email && AuthState && AuthState[values.email] && AuthState[values.email].count === 0 &&
                        <fieldset className="form-group">
                            <Alert color="danger">
                                Лимит попыток исчерпан. Попробуйте повторить через 15 минут или обратитесь в службу
                                поддержки
                            </Alert>
                        </fieldset>

                    }

                </div>
                <Button type="submit" className="btn btn-rounded btn-white p1025" outline
                        color="secondary">Вход</Button>

                <Link className="btn btn-rounded btn-white p1025" to={{
                    pathname: '/register/type'
                }}>
                    Регистрация
                </Link>
            </form>
        )
    }
}

FormAuth.propTypes = {};

FormAuth.defaultProps = {};

export {FormAuth};