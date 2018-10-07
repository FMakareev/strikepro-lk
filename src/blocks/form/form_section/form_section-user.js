import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {InputText} from "../../Input/InputText/InputText";
import {FormSection} from "redux-form";
import {CardBody, Col, Row} from "reactstrap";
import Field from "redux-form/es/Field";
import {
	isEmail, isNumber, isPassword, maxLength255, maxLength32, minLength6,
	required
} from "../form_register/form_registration-validate";

const FormSectionUser = ({}) => {
	return (<FormSection name="user">
		<CardBody className="animated fadeIn card-block">
			<Row>
				<Col className="col-md-12">
					<Field
						name="surename"
						component={InputText}
						label="Фамилия"
						type="text"
						validate={[required, maxLength255]}
					/>
				</Col>
				<Col className="col-md-6">
					<Field
						name="firstname"
						component={InputText}
						label="Имя"
						type="text"
						validate={[required, maxLength255]}
					/>
				</Col>
				<Col className="col-md-6">
					<Field
						name="patronymic"
						component={InputText}
						label="Отчество"
						type="text"
						validate={[required, maxLength255]}
					/>
				</Col>
				<Col className="col-md-6">
					<Field
						name={'email'}
						component={InputText}
						label={'Email'}
						type={'email'}
						validate={[required, maxLength255, isEmail]}
					/>
				</Col>
				<Col className="col-md-6">
					<Field
						name={'phone'}
						component={InputText}
						label={'Телефон'}
						type={'phone'}
						validate={[required, maxLength255, isNumber]}
					/>
				</Col>

				<Col className="col-md-6">
					<Field
						name={'password'}
						component={InputText}
						label={'Пароль'}
						type={'password'}
						validate={[isPassword, required, minLength6, maxLength32,]}
					/>
				</Col>
				<Col className="col-md-6">
					<Field
						name={'password_confirmation'}
						component={InputText}
						label={'Подтверждение пароля'}
						type={'password'}
						validate={[isPassword, required, minLength6, maxLength32]}
					/>
				</Col>
			</Row>
		</CardBody>
	</FormSection>);
}

export {FormSectionUser};
