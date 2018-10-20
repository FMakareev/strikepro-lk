import
	React, { Component } from 'react';
import { Field, getFormValues } from 'redux-form'
import { InputText } from "../../Input/InputText/InputText";
import { isEmail, maxLength255, required } from "../form_register/form_registration-validate";
import { FormGroup, Input, Label } from "reactstrap";
import { connect } from "react-redux"; // ES6


export const InputCheckbox = function ({input, label, type, disabled, meta: {touched, error}, value, values, ...rest}) {

	return (
		<FormGroup>
			<Label>
				<Input type={type} {...input} onChange={() => input.onChange('test')} disabled={disabled}/> {' '}
				{label}
			</Label>
			<p className="help-block">{touched && error && <span>{error}</span>}</p>
		</FormGroup>
	)
};

export let InputRadioCheckbox = function ({input, label, type, disabled, meta: {touched, error}, currentValue, values, ...rest}) {
	console.log('InputRadioCheckbox input: ', input);
	console.log('InputRadioCheckbox currentValue:', currentValue);
	console.log('InputRadioCheckbox values:', values);

	return (
		<FormGroup>
			<Label>
				<Input type={'radio'} {...input} onChange={() => {
					if (values.company.email_main !== currentValue) {
						input.onChange(currentValue);
					}
				}}
				       disabled={disabled}
				       checked={values.company.email_main === currentValue}

				/> {' '}
				{label}
			</Label>
			<p className="help-block">{touched && error && <span>{error}</span>}</p>
		</FormGroup>
	)
};
InputRadioCheckbox = connect(state => ({
	values: getFormValues('FormRegister')(state),
}))(InputRadioCheckbox);

const renderSubFields = (member, index, fields) => {
	return (
		<div key={index}>
			<div className="form-inline">
				<Field
					name={`${member}.value`}
					type="text"
					component={InputText}
					label={'Email'}
					validate={[required, maxLength255, isEmail]}
					styleWrap={{
						width: 'calc(100% - 56px)'
					}}
				/>

				<button
					type="button"
					title="удолить email"
					style={{
						verticalAlign: 'top',
						marginLeft: '15px',
						marginTop: '31.5px'
					}}
					className="btn btn-danger" onClick={() => fields.remove(index)}>
					<i className="fa fa-trash-o"/>
				</button>
			</div>
			<Field
				name={`${member}.type`}
				type={"hidden"}
				component={"input"}
				value={'email'}
			/>
			<div className="form-inline">
				<div className="form-group">
					<Field
						name={`${member}.subscription`}
						component={InputCheckbox}
						type={'checkbox'}
						label={'Отправлять рассылку?'}
					/>
				</div>
				<Field
					name={`email_main`}
					component={InputRadioCheckbox}
					type={"checkbox"}
					currentValue={`${member}.is_main`}
					label={'Желаемый вид связи'}
				/>
			</div>
		</div>
	)
};

const FormArrayEmail = (props) => {
	return (
		<div>
			{props.fields.map(renderSubFields)}
			<br/>
			<button type="button" title="Добвить email" className="btn btn-default" style={{width: '100%'}}
			        onClick={() => props.fields.push({
				        type: "email"
			        })}>
				<i className="fa fa-plus">

				</i>
			</button>
		</div>
	);
}

export { FormArrayEmail };
