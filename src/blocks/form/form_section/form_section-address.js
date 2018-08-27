import React, {Component} from 'react';
import {Field} from 'redux-form'
import {InputText} from "../../Input/InputText/InputText";
import {FormGroup, Input, Label, Alert} from "reactstrap";
import {maxLength255, required} from "../form_register/form_registration-validate"; // ES6


const types = [{
    label: 'Юридический адрес (ФИАС)',
    type: 'LEGAL'
}, {
    label: 'Фактический адрес (ФИАС)',
    type: 'POSTAL'
},];




export class FormSectionAddress extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    get initialState() {
        return {
            disabledCheckbox: false
        }
    }

    render() {
        const {label, name, input, meta} = this.props;
        const {disabledCheckbox} = this.state;
        return (
            <FormGroup>
                {types.map((option, index) => (
                    <div className="col-md-6" key={index}>
                        {
                            index !== 1 &&
                            <Field
                                name={`places[${index}].address`}
                                type="text"
                                component={InputText}
                                label={types[index].label}
                                validate={[required, maxLength255,]}
                                disabled={index === 1 ? disabledCheckbox : false}
                            />
                        }
                        {
                            index === 1 && !disabledCheckbox &&
                            <Field
                                name={`places[${index}].address`}
                                type="text"
                                component={InputText}
                                label={types[index].label}
                                validate={[required, maxLength255,]}
                                disabled={index === 1 ? disabledCheckbox : false}
                            />
                        }
                        {
                            index === 1 && disabledCheckbox &&
                            <Field
                                name={`places[${index}].address`}
                                type="text"
                                component={InputText}
                                label={types[index].label}
                                disabled={index === 1 ? disabledCheckbox : false}
                            />
                        }

                        <Field
                            name={`places[${index}].type`}
                            type="hidden"
                            component="input"
                            value={types[index].type}/>
                        {
                            index === 1 &&
                            <Label>
                                <Field
                                    checked={disabledCheckbox}
                                    name={`places[${index}].isActive`}
                                    type={'checkbox'}
                                    component={'input'}
                                    onChange={() => { this.setState({
                                        disabledCheckbox: !this.state.disabledCheckbox
                                    })}}
                                />
                                {/*<Input checked={disabledCheckbox} type='checkbox' onChange={() => { this.setState({*/}
                                    {/*disabledCheckbox: !this.state.disabledCheckbox*/}
                                {/*})}}/> */}
                                {' '}
                                Cовпадает с Юр. Адресом
                            </Label>
                        }

                    </div>
                ))
                }
            </FormGroup>
        );

    }
}