import React, {Component} from 'react';
import {FormGroup, Input, Label} from "reactstrap";

const InputCheckbox = ({input, label, type, meta: {touched, error}}) => {
    return (
        <FormGroup>
            <Label>
                <Input type={type} {...input}/> {' '}
                {label}
            </Label>
            <p className="help-block">{touched && error && <span>{error}</span>}</p>
        </FormGroup>
    )
};


export {InputCheckbox};