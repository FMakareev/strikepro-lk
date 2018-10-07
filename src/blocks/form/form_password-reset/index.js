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

@reduxForm({
	form: 'FormPasswordReset'
})
@connect((state, ownProps) => ({
	values: getFormValues('FormPasswordReset')(state)
}))
export class FormPasswordReset extends Component {
	static propTypes = {
		values: PropTypes.object.isRequired,
		callBack: PropTypes.func,
	};
	static defaultProps = {
		callBack: () => null,
	};

	constructor(props) {
		super(props);
		this.state = this.initialState;
		this.onSubmit = this.onSubmit.bind(this)
	}

	get initialState() {
		return {}
	}

	onSubmit(values) {

		return fetch('/api/v1/auth/password/send_reset_link', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(values),
		})
			.then(response => {
				console.log('RESPONSE: ', response);
				if (response.status >= 200 && response.status < 300) {
					this.props.callBack && this.props.callBack();
					return Promise.resolve(response);
				} else if (response.error && response.status >= 400) {
					return Promise.reject(response);
				} else {
					return Promise.reject(response);
				}
			})
			.catch(error => {
				console.log('ERROR: ', error);
				throw new SubmissionError({_error: this.errorHandler(error)})
			})
	}

	errorHandler({status, statusText}) {
		try {
			console.log(status, statusText);
			if (status === 401) {
				console.log('Пользователь не авторизирован:', status, statusText);
				return 'Неверный логин или пароль';
			} else if (status === 422) {
				console.log('Ошибка валидации:', status, statusText);
				return 'Пользователь с таким паролем не найден в системе.';
			} else if (status === 423) {
				console.log('Пользователь заблокирован:', status, statusText);
				return 'Пользователь заблокирован:';
			} else if (status === 429) {
				console.log('Успешно авторизирован:', status, statusText);
				return 'Пользователь заблокирован:';
			} else {
				return statusText;
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
			pristine,
			reset,
			submitting,
			type,
			values
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
						type='text'
						validate={[isEmail, required, maxLength255]}
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

export default FormPasswordReset
