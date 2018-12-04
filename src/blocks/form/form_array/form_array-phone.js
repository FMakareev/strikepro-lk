import React from 'react';
import { Field, getFormValues } from 'redux-form'
import {InputText} from "../../Input/InputText/InputText";
import {InputCheckbox} from "../../Input/InputCheckbox/InputCheckbox";
import {isNumber, maxLength255, required} from "../form_register/form_registration-validate";
import { connect } from "react-redux";
import { FormGroup, Input, Label } from "reactstrap"; // ES6

// TODO: отрефакторить CSS
// TODO: Сделать универсальный компонент, такой же компонент FormArrayEmail



export let InputRadioCheckbox = function ({input, label, type, disabled, meta: {touched, error}, currentValue, values, ...rest}) {
	console.log('InputRadioCheckbox input: ', input);
	console.log('InputRadioCheckbox currentValue:', currentValue);
	console.log('InputRadioCheckbox values:', values);

	return (
		<FormGroup>
			<Label>
				<Input type={'radio'} {...input} onChange={() => {
					if (values.company.contact_main !== currentValue) {
						input.onChange(currentValue);
					}
				}}
				       disabled={disabled}
				       checked={values.company.contact_main === currentValue}

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
                    label={'Телефон'}
                    validate={[required,maxLength255,isNumber]}
                    styleWrap={{
                        width: 'calc(100% - 56px)'
                    }}
                />
                <button
                    type="button"
                    title="Удолить телефон"
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
                type="hidden"
                component="input"
                value={'phone'}
            />

            <div className="form-inline">
	            <Field
		            name={`contact_main`}
		            component={InputRadioCheckbox}
		            type={"checkbox"}
		            currentValue={`${member}.is_main`}
		            label={'Желаемый вид связи'}
	            />
            </div>
        </div>
    )
};

const FormArrayPhone = (props) => {
    return (
        <div>
            {props.fields.map((member, index, fields) => renderSubFields(member, index, fields))}
            <br/>
            <button type="button"  title="Добвить телефон" className="btn btn-default" style={{width: '100%'}} onClick={() => props.fields.push({
                type: 'phone',
            })}>
                <i className="fa fa-plus">

                </i>
            </button>
        </div>
    );
}

export {FormArrayPhone};
