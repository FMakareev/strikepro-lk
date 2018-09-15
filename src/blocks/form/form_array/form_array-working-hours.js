import React, { Component } from 'react'
import 'react-select/dist/react-select.css'
import 'react-widgets/dist/css/react-widgets.css'
import { Alert, FormGroup, Label } from 'reactstrap'
import { Field, getFormValues } from 'redux-form'
import { required } from '../form_register/form_registration-validate'
import TimePicker from 'react-times'
import 'react-times/css/classic/default.css'
import { InputCheckbox } from '../../Input/InputCheckbox/InputCheckbox'
import { connect } from 'react-redux'

const daysOfTheWeek = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье'
]

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
]

class WorkingHours extends Component {
  constructor (props) {
    super(props)
    this.state = this.initialState
  }

  get initialState () {
    let options = []
    timeInterval.map(item => {
      options.push({
        value: item,
        label: item
      })
    })
    return {
      value: null,
      options
    }
  }

  render () {
    const {
      input: { value, onChange },
      label,
      type,
      defaultTime,
      disabled,
      meta: { touched, error }
    } = this.props

    return (
      <FormGroup>
        <TimePicker
          // данные поля
          time={value}
          // обратный вызов после изменения данных
          onTimeChange={({ hour, meridiem, minute }) => {
            onChange(hour + ':' + minute)
          }}
          theme='classic'
          defaultTime={defaultTime}
          disabled={disabled}
          timeConfig={{
            from: '00:00',
            to: '00:00',
            step: 1,
            unit: 'hour'
          }}
        />
        {touched &&
          error &&
          <Alert color='danger' className='animated fadeIn'>
            {error}
          </Alert>}
      </FormGroup>
    )
  }
}

// const WorkingHoursRow = (member, index, fields) => {

//   return (
//     <div className='row' key={index}>
//       <div className='col-md-12'>
//         <label>
//           {daysOfTheWeek[index]}
//         </label>
//       </div>
//       <div className='col-md-6'>
//         <Field
//           name={`${member}.from`}
//           component={WorkingHours}
//           label='От'
//           type='text'
//           validate={[required]}
//         />
//       </div>
//       <div className='col-md-6'>
//         <Field
//           name={`${member}.to`}
//           component={WorkingHours}
//           label='До'
//           validate={[required]}
//         />
//       </div>
//       <div className='col-md-6'>
//         <Field
//           name={`${member}.day_off`}
//           component={InputCheckbox}
//           label='Выходной'
//           type={'checkbox'}
//         />

//       </div>
//     </div>
//   )
// }
@connect((state, ownProps) => ({
  values: getFormValues('FormStoreEdit')(state)
}))
class WorkingHoursRow extends Component {
  render () {
    const { member, index, fields, values } = this.props
    const { workinghours } = values;
    return (
      <div className='row' key={index}>
        <div className='col-md-12'>
          <label>
            {daysOfTheWeek[index]}
          </label>
        </div>
        {!workinghours[index].day_off &&
          <div>
            <div className='col-md-6'>
              <Field
                defaultTime='00:00'
                name={`${member}.from`}
                component={WorkingHours}
                label='От'
                type='text'
                validate={[required]}
                disabled={workinghours[index].day_off}
              />
            </div>
            <div className='col-md-6'>
              <Field
                defaultTime='00:00'
                name={`${member}.to`}
                component={WorkingHours}
                label='До'
                validate={[required]}
                disabled={workinghours[index].day_off}
              />
            </div>
          </div>}

        <div className='col-md-6'>
          <Field
            name={`${member}.day_off`}
            component={InputCheckbox}
            label='Выходной'
            type={'checkbox'}
          />

        </div>
      </div>
    )
  }
}

export const WorkingHoursItem = ({ fields, data }) => {
  if (fields.length < 7) {
    data.map((item, index) => {
      fields.push(item)
    })
  }
  return fields.map((member, index, fields) => (
    <WorkingHoursRow member={member} index={index} fields={fields} />
  ))
}
