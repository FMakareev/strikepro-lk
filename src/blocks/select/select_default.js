import React, {Component} from 'react';
import Select from 'react-select';
import style from 'react-select/dist/react-select.css';
import {Alert, FormGroup, Label} from "reactstrap";

export class SelectDefault extends Component {
    static propTypes = {};

    static defaultProps = {};


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
                        labelKey="name"
                        valueKey="id"
                        onChange={(e) => {
                            return input.onChange(e ? e.id : null);
                        }}
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

