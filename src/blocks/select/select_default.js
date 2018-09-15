import React, {Component} from 'react';
import PropTypes from 'prop-types'
import Select from 'react-select';
import style from 'react-select/dist/react-select.css';
import {Alert, FormGroup, Label} from "reactstrap";

export class SelectDefault extends Component {
    static propTypes = {
        labelKey:PropTypes.string,
        valueKey: PropTypes.string,
    };

    static defaultProps = {
        labelKey:'name',
        valueKey: 'value'
    };


    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    get initialState() {
        return {}
    }

    render() {
        const {
            input,
            label,
            options,
            labelKey,
            valueKey,
            isLoading,
            disabled,
            meta: {
                touched,
                error
            }
        } = this.props;
        return (
            <div>
                <FormGroup>
                    <Label>{label}</Label>
                    <Select
                        name={input.name}
                        value={input.value}
                        options={options}
                        labelKey={labelKey}
                        valueKey={valueKey}
                        isLoading={isLoading}
                        disabled={disabled}
                        onChange={e => input.onChange(e ? e[valueKey] : null)}

                    />
                    {
                        touched && error &&
                        <Alert color="danger" className="animated fadeIn">
                            {error}
                        </Alert>
                    }
                </FormGroup>
            </div>
        )
    }
}

