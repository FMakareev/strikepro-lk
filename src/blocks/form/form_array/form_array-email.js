import
	React, {Component} from 'react';
import {Field, getFormValues} from 'redux-form'
import {InputText} from "../../Input/InputText/InputText";
// import {InputCheckbox} from "../../Input/InputCheckbox/InputCheckbox";
import {isEmail, maxLength255, required} from "../form_register/form_registration-validate";
import {FormGroup, Input, Label} from "reactstrap";
import {connect} from "react-redux"; // ES6

function mapStateToProps(state) {
	return {
		values: getFormValues('FormRegister')(state),
	}
}

// @connect(mapStateToProps)
export let InputCheckbox = function({input, label, type,disabled, meta: {touched, error},values, ...rest}){
	// console.log('InputCheckbox: ',values.company.email);
	// console.log('InputCheckbox: ',input.name);
	// let name = input.name.substring(input.name.indexOf('['), input.name.length);
	// console.log('InputCheckbox: ', name);
	// values.company.email.map((item, index) => {
	// 	if(name.indexOf('['+index+']') === 0){
	// 		console.log(item);
	// 	}
	// });
	// values.company.email
	return (
		<FormGroup>
			<Label>
				<Input type={type} {...input} disabled={disabled}/> {' '}
				{label}
			</Label>
			<p className="help-block">{touched && error && <span>{error}</span>}</p>
		</FormGroup>
	)
};
InputCheckbox =connect(mapStateToProps)(InputCheckbox);
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
					name={`${member}.is_main`}
					component={InputCheckbox}
					type={"checkbox"}
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

export {FormArrayEmail};
