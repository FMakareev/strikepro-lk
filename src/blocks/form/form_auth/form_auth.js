import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Alert, Button} from "reactstrap";
import {Link} from "react-router-dom";
import {connect as connectRestEasy} from "@brigad/redux-rest-easy";

import {InputText} from "../../Input/InputText/InputText";
import {Field, getFormValues, reduxForm, SubmissionError} from "redux-form";
import {isEmail, maxLength255, maxLength32, minLength6, required} from "../form_register/form_registration-validate";
import {connect} from "react-redux";
import {UserLogin, UserLogOut, isLogin} from '../../../store/reduxRestEasy/login';
import {BrowserHistory} from "../../../history";


@reduxForm({
    form: 'FormAuth',
})
@connectRestEasy(
    (state, ownProps) => ({
        isLogin: isLogin(state, ownProps),
    }),
    dispatch => ({
        UserLogin: body => dispatch(UserLogin({body})),
        UserLogOut: () => dispatch(UserLogOut()),
    })
)
@connect((state, ownProps) => ({
    values: getFormValues('FormAuth')(state),
}))
export class FormAuth extends Component {

    static propTypes = {
        UserLogOut: PropTypes.func.isRequired,
        UserLogin: PropTypes.func.isRequired,
        isLogin: PropTypes.bool.isRequired,
        values: PropTypes.object.isRequired,
    };
    static  defaultProps = {};

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.onSubmit = this.onSubmit.bind(this);
    }

    get initialState() {
        return {}
    }

    componentDidMount() {
        this.props.UserLogOut();
    }

    onSubmit(values) {
        console.log(this.props);
        console.log(values);
        return new Promise((resolve, reject) => {
            this.props.UserLogin(values)
                .then(response => {
                    console.log(response);
                    if (response.status >= 200 && response.status < 300) {
                        BrowserHistory.push('/');
                        return resolve(response);
                    } else if (response.status >= 400) {
                        return Promise.reject(response);
                    } else {
                        BrowserHistory.push('/');

                        return resolve(response);
                    }
                })
                .catch(error => {
                    console.log(error);
                    reject(new SubmissionError({_error: this.errorHandler(error)}));
                });
        })


    }

    errorHandler({error}) {
        try {
            console.log(error.response);
            if (error.response.status === 401) {
                console.log('Пользователь не авторизирован:', error);
                return 'Неверный логин или пароль';
            } else if (error.response.status === 422) {
                console.log('Ошибка валидации:', error);
                return 'Ошибка валидации:'
            } else if (error.response.status === 423) {
                console.log('Пользователь заблокирован:', error);
                return 'Пользователь заблокирован:'
            } else if (error.response.status === 429) {
                console.log('Успешно авторизирован:', error);
                return 'Пользователь заблокирован:'
            } else {
                return error.error.message;
            }
        } catch (e) {
            return 'Неизвестная ошибка.'
        }
    }

    render() {
        const {error, handleSubmit, pristine, reset, submitting, type,  values} = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit)} className="login-page-buttons">

                <div className="form-content">
                    <Field
                        name="email"
                        component={InputText}
                        placeholder={"введите email..."}
                        classNameInput="form-control input-underline input-lg"
                        type="text"
                        validate={[isEmail, required, maxLength255]}
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


                </div>
                <Button
                    type="submit"
                    className="btn btn-rounded btn-white p1025"
                    outline
                    color="secondary"
                >
                    Вход
                </Button>

                <Link
                    className="btn btn-rounded btn-white p1025"
                    to={{
                        pathname: '/register/type'
                    }}
                >
                    Регистрация
                </Link>
            </form>
        )
    }
}


export default FormAuth;