import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Alert, Button, Row, Col} from 'reactstrap'
import {Link} from 'react-router-dom'
import {connect as connectRestEasy} from '@brigad/redux-rest-easy'

import {InputText} from '../../Input/InputText/InputText'
import {Field, getFormValues, reduxForm, SubmissionError} from 'redux-form'
import {
	isEmail,
	maxLength255,
	maxLength32,
	minLength6,
	required
} from '../form_register/form_registration-validate'
import {connect} from 'react-redux'
import {UserLogin, isLogin} from '../../../store/reduxRestEasy/login'
import {BrowserHistory} from '../../../history'


// export const minLength6 = number => value => value && value.length < 6 ? `Минимальное кол-во знаков ${6}` : undefined;

const validationPassword = (values,errors) => {
	if(minLength6(values)){
		errors.password = minLength6(values);
	}
};



const validate = values => {
	const errors = {};
	if(values && values.password && minLength6(values.password)){
		errors.password = minLength6(values.password);
	}
	if(values && values.password_confirmation && values.password !==values.password_confirmation){
		errors.password_confirmation = 'Пароли не совпадают';
	}
	return errors
};





@reduxForm({
	form: 'FormPasswordRecovery',
	validate, // <--- validation function given to redux-form

})
@connect((state, ownProps) => ({
	values: getFormValues('FormPasswordRecovery')(state)
}))
export class FormPasswordRecovery extends Component {
	static propTypes = {
		values: PropTypes.object.isRequired
	};
	static defaultProps = {};

	constructor(props) {
		super(props);
		this.state = this.initialState;
		this.onSubmit = this.onSubmit.bind(this)
	}

	get initialState() {
		return {}
	}

	parseJSON(response) {
		return new Promise((resolve) => response.json()
			.then((json) => resolve({
				status: response.status,
				ok: response.ok,
				json,
			})));
	}


	onSubmit(values) {

		return fetch('/api/v1/auth/password/reset', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(values),
		})
			.then(this.parseJSON)
			.then((response) => {
				console.log('RESPONSE: ', response);
				if (response.ok) {
					BrowserHistory.push('/login');

					return Promise.resolve(response.json);
				}
				// extract the error from the server's json
				return Promise.reject(response);
			})
			.catch(error => {
				console.log('ERROR: ', error);
				throw new SubmissionError({_error: this.errorHandler(error)})
			})

	}

	// TODO: уточнить у Артура формат ошибок
	errorHandler({status,json:{email,token, ...rest},}) {
		try {
			console.log(status,email,token,rest);
			if (status === 401) {
				console.log('Пользователь не авторизирован:', status,email);
				return 'Неверный логин или пароль';
			} else if (status === 422) {
				console.log('Ошибка валидации:', status,email,token);
				if(email){
					return email;
				}
				if(token){
					return token;
				}
			} else if (status === 423) {
				console.log('Пользователь заблокирован:', status,email);
				return 'Пользователь заблокирован:';
			} else if (status === 429) {
				console.log('Успешно авторизирован:', status,email);
				return 'Пользователь заблокирован:';
			} else {
				return email;
			}
		} catch (error) {
			console.error('Неизвестная ошибка: ', error);
			return 'Неизвестная ошибка.'
		}
	}


	render() {
		const {
			error,
			handleSubmit,
		} = this.props;

		return (
			<form
				onSubmit={handleSubmit(this.onSubmit)}
				className='login-page-buttons'
			>

				<div className='form-content'>
					<Field
						name={'email'}
						component={InputText}
						placeholder={'введите email...'}
						classNameInput='form-control input-lg'
						type={'email'}
						validate={[isEmail, required, maxLength255]}
					/>
					<Field
						name={'password'}
						component={InputText}
						placeholder={'введите пароль...'}
						classNameInput='form-control input-lg'
						type={'password'}
						validate={[required, maxLength255]}
					/>
					<Field
						name={'password_confirmation'}
						component={InputText}
						placeholder={'подтвердите пароль...'}
						classNameInput='form-control input-lg'
						type={'password'}
						validate={[required, maxLength255]}
					/>
					<Field
						name={'token'}
						component={'component'}
						type={'hidden'}
					/>
					{error &&
					<fieldset className='form-group'>
						<Alert color='danger'>
							{error}
						</Alert>
					</fieldset>}

				</div>
				<Row>
					<Col>
						<Button
							type={'submit'}
							className={'btn btn-rounded btn-white border-none box-shadow-none '}
							outline
							color={'secondary'}
							style={{
								padding: '10px 60px'
							}}
						>
							Восстановить
						</Button>
					</Col>
				</Row>


			</form>
		)
	}
}

export default FormPasswordRecovery
