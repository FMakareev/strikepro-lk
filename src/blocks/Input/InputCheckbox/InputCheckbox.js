import React from 'react';
import PropTypes from 'prop-types';
import {FormGroup, Input, Label} from "reactstrap";
import {InputPropTypes, MetaPropTypes} from "../../../propTypes/Forms/FormPropTypes";

export const InputCheckbox = ({input, label, type,disabled, meta: {touched, error}}) => {
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

InputCheckbox.propTypes = {
    input: InputPropTypes,
    label: PropTypes.string,
    type: PropTypes.oneOf(['radio','checkbox']),
    meta: MetaPropTypes,
    disabled: PropTypes.bool,
};


export default InputCheckbox;