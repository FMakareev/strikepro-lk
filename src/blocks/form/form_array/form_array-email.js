import React, {Component} from 'react';
import {Field} from 'redux-form'
import {InputText} from "../../input/input_text/input_text";
import {InputCheckbox} from "../../input/input_checkbox/input_checkbox";
import {isEmail, maxLength255, required} from "../form_register/form_registration-validate"; // ES6

// TODO: отрефакторить CSS
// TODO: Сделать универсальный компонент, такой же компонент FormArrayPhone

const renderSubFields = (member, index, fields) => {

    return (
        <div key={index}>
            <div className="form-inline">
                <Field
                    name={`${member}.value`}
                    type="text"
                    component={InputText}
                    label={'Email'}
                    validate={[required,maxLength255,isEmail]}
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
                    <i className="fa fa-trash-o"></i>
                </button>
            </div>
            <Field
                name={`${member}.type`}
                type="hidden"
                component="input"
                value={'email'}/>
            <div className="form-inline">
                <div className="form-group">
                    <Field
                        name={`${member}.subscription`}
                        component={InputCheckbox}
                        type="checkbox"
                        label="Отправлять рассылку?"
                    />
                </div>
                <Field
                    name={`${member}.is_main`}
                    component={InputCheckbox}
                    type="checkbox"
                    label="Желаемый вид связи"
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