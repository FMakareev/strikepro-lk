import React, {Component} from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import 'react-widgets/dist/css/react-widgets.css'
import {Alert, FormGroup, Label} from "reactstrap";
import {Field} from "redux-form";
import {required} from "../form_register/form_registration-validate";



const daysOfTheWeek = ['Понедельник','Вторник','Среда','Четверг','Пятница','Суббота', 'Воскресенье'];

const timeInterval = [
    '00:00',
    '00:30',
    '01:00',
    '01:30',
    '02:00',
    '02:30',
    '03:00',
    '03:30',
    '04:00',
    '04:30',
    '05:00',
    '05:30',
    '06:00',
    '06:30',
    '07:00',
    '07:30',
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00',
    '19:30',
    '20:00',
    '20:30',
    '21:00',
    '21:30',
    '22:00',
    '22:30',
    '23:00',
    '23:30'
];

class WorkingHours extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    get initialState() {
        let options = [];
        timeInterval.map((item) => {
            options.push({
                value: item,
                label: item
            })
        });
        return {
            value: null,
            options
        }
    }

    render() {
        const {input, label, type, meta: {touched, error}} = this.props;
        const {value, options} = this.state;
        return (
            <FormGroup>
                <Select
                    placeholder={label}
                    name={input.name}
                    value={input.value}
                    onChange={(value) =>{
                        input.onChange(value.value);
                        this.setState({value})
                    }}
                    options={options}
                />
                {
                    touched && error &&
                    <Alert color="danger" className="animated fadeIn">
                        {error}
                    </Alert>
                }
            </FormGroup>
        )
    }
}

const WorkingHoursRow = (member, index, fields) => {
    return (
        <div className="row" key={index}>
            <div className="col-md-12">
                <label>
                    {daysOfTheWeek[index]}
                </label>
            </div>
            <div className="col-md-6">
                <Field
                    name={`${member}.from`}
                    component={WorkingHours}
                    label="От"
                    type="text"
                    validate={[required]}
                />
            </div>
            <div className="col-md-6">
                <Field
                    name={`${member}.to`}
                    component={WorkingHours}
                    label="До"
                    validate={[required]}
                />
            </div>
        </div>
    )
}


export const WorkingHoursItem = ({fields, data}) => {
    if (fields.length < 7) {
        data.map((item, index) => {
            fields.push(item)
        })
    }
    return fields.map((member, index, fields) => WorkingHoursRow(member, index, fields))
}