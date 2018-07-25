import React from 'react';
import {Alert, FormGroup, Input, Label} from "reactstrap";
import {InputPropTypes, MetaPropTypes} from "../../../propTypes/Forms/FormPropTypes";
import PropTypes from "prop-types";

export const InputText = ({input, label, type, meta, styleWrap, placeholder, classNameInput,disabled = false}) => {
    return (
        <FormGroup style={styleWrap}>
            <Label>{label}</Label>
            <Input disabled={disabled} placeholder={placeholder} className={classNameInput} type={type} {...input} style={{
                width: '100%'
            }}/>
            {
                meta.touched && meta.error && !disabled &&
                <Alert color="danger" className="animated fadeIn">
                    {meta.error}
                </Alert>
            }


        </FormGroup>
    )
};

InputText.propTypes = {
    input: InputPropTypes,
    label: PropTypes.string,
    type: PropTypes.oneOf(['radio','checkbox']),
    meta: MetaPropTypes,
    styleWrap: PropTypes.string,
    placeholder: PropTypes.string,
    classNameInput: PropTypes.string,
    disabled: PropTypes.bool,
};



export default InputText;