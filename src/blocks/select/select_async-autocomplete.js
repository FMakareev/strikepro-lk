import React, {Component} from 'react';
import {Async} from 'react-select';
import 'react-select/dist/react-select.css';
import './select.css';
import {Alert, FormGroup, Input, Label} from "reactstrap";

export class SelectAsyncAutocomplete extends Component {
    static propTypes = {};

    static defaultProps = {};


    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.search = this.search.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    get initialState() {
        return {
            options: {},
            value: '',
            subString: '',
            disabled: false
        }
    }


    search(subString) {
        console.log(subString);

        const {arrayNormalizr, url} = this.props.selectOption;

        // if (subString.length < 3 && subString === this.state.subString) {
        //     return new Promise((resolve, reject) => {
        //         resolve({
        //             options: this.state.options
        //         });
        //     })
        // } else {
            this.setState({
                subString: subString
            });
            return fetch(`${url}?search=${subString}&searchFields=address:like`, {
                method: 'GET'
            }).then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return Promise.resolve(response);
                }
                return Promise.reject(response.status);
            }).then((response) => {
                return response.json()
            }).then((response) => {
                console.log(response);
                const data = arrayNormalizr(response.data);
                this.setState({
                    options: data
                })
                return {
                    options: data
                }
            }).catch(error => {
                console.error(error);
                return error;
            });
        // }

    }

    handleChange(value) {
        console.log('handleChange:', value);
        if (!value) return;
        const {input: {onChange}} = this.props;
        this.setState({value: value.id});
        onChange(value.id)
    }

    render() {
        const {
            input,
            label,
            type,
            disabledToggle,
            disabledText,
            meta: {
                touched,
                error
            },
            selectOption: {labelKey, valueKey}
        } = this.props;

        const {value, disabled} = this.state;
        return (
            <FormGroup>
                <Label>{label}</Label>
                <div>
                    <Async
                        disabled={disabled}
                        name={input.name}
                        autoload={false}
                        labelKey={labelKey}
                        valueKey={valueKey}
                        value={value}
                        onChange={this.handleChange}
                        loadOptions={this.search}
                    />
                </div>
                {
                    touched && error &&
                    <Alert color="danger" className="animated fadeIn">
                        {error}
                    </Alert>
                }
                {
                    disabledToggle &&
                    <Label>
                        <Input type='checkbox' onChange={() => {
                            try {
                                const dis = !this.state.disabled;
                                console.log(dis);
                                this.setState({disabled: dis})
                            } catch (err) {
                                console.log(err);
                            }
                        }}/> {' '}
                        {disabledText}
                    </Label>
                }
            </FormGroup>
        )
    }
}

