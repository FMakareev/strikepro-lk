import React from 'react';
import {FormGroup, Label, Alert} from 'reactstrap';
import {InputPropTypes, MetaPropTypes} from "../../../propTypes/Forms/FormPropTypes";
import PropTypes from "prop-types";


export const InputCheckboxGroup = ({label, required, name, options, input, meta: {touched, error}}) => (
    <FormGroup >
        <Label>{label} {required && <Label bsStyle="info">required</Label>}</Label>
        {options.map((option, index) => (
            <div className="checkbox" key={index}>
                <label>
                    <input type="checkbox"
                           name={`${name}[${index}]`}
                           value={option.id}
                           checked={input.value.indexOf(option.id) !== -1}
                           onChange={event => {
                               const newValue = [...input.value];
                               if (event.target.checked) {
                                   newValue.push(option.id);
                               } else {
                                   newValue.splice(newValue.indexOf(option.id), 1);
                               }

                               return input.onChange(newValue);
                           }}/>
                    {option.name}
                </label>
            </div>))
        }
        {
            touched && error && <Alert color="danger" className="animated fadeIn">{error}</Alert >
        }
    </FormGroup>
);

InputCheckboxGroup.propTypes = {
    input: InputPropTypes,
    label: PropTypes.string,
    name: PropTypes.string,
    required: PropTypes.bool,
    meta: MetaPropTypes,
    options:  PropTypes.array(PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.any,
    })),
};


export default InputCheckboxGroup;