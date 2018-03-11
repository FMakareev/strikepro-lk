import React, {Component} from 'react';
import {Field} from 'redux-form'
import {InputText} from "../../input/input_text/input_text";
import {InputCheckbox} from "../../input/input_checkbox/input_checkbox";
import {Col} from "reactstrap";
import {isEmail, isNumber, maxLength255, required} from "../form_register/form_registration-validate"; // ES6

const renderSubFields = (member, index, fields) => {

    const data = [{
        type: 'phone',
        label: 'Телефон',
        validate: isNumber,
    }, {
        type: 'email',
        label: 'Email',
        validate: isEmail,
    }];

    return (
        <div className="col-md-6" key={index}>
            {
                data[index].type === 'phone' &&
                <Field
                    name={`${member}.value`}
                    type={data[index].type}
                    component={InputText}
                    validate={[required, maxLength255, isNumber]}
                    label={data[index].label}/>
            }
            {
                data[index].type === 'email' &&
                <Field
                    name={`${member}.value`}
                    type={data[index].type}
                    component={InputText}
                    validate={[required, maxLength255, isEmail]}
                    label={data[index].label}/>
            }
            {
                data[index].type === 'email' &&
                <Field
                    name={`${member}.subscription`}
                    component={InputCheckbox}
                    type="checkbox"
                    label="Отправлять рассылку?"
                />
            }
            <Field
                name={`${member}.type`}
                type="hidden"
                component="input"
                // value={input[index].type}
            />
        </div>
    )
};

export class FormArrayPersonsContacts extends Component {

    componentDidMount() {
        const {fields} = this.props;
        const initValue = [
            {
                value: '',
                type: 'phone'
            }, {
                value: '',
                type: 'email'
            }
        ];
        if (fields.length < 2) {
            initValue.map((item) => {
                fields.push(item)
            })
        }


    }

    render() {
        const {fields} = this.props;
        return fields.map(renderSubFields)
    }
}

