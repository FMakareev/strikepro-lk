import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StoreEdit } from './store_edit'
import { Table } from 'reactstrap'

const daysOfTheWeek = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье'
]

class StoreItem extends Component {
  static propTypes = {
    onDelete: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired
  }

  constructor (props) {
    super(props)
    this.state = this.initialState
  }

  get initialState () {
    return {}
  }

  shouldComponentUpdate (nextProps, nextState) {
    console.log('nextProps', nextProps)
    return true
  }

  render () {
    const { data, onDelete } = this.props
    const {
      id,
      attributes,
      name,
      address,
      workinghours,
      workdays,
      createdAt,
      updatedAt
    } = data

    return (
      <div className='col-md-6 col-lg-6'>
        <div className='panel panel-default'>
          <div className='panel-heading'>
            <h3>{name}</h3>
          </div>
          <div className='row'>
            <div className='panel-body'>
              <h4>Адрес:</h4>
              <address>
                {address}
              </address>
              <h4>Время работы:</h4>
              <Table className='table table-hover'>
                <thead>
                  <tr>
                    <th>Дни недели</th>
                    <th>От</th>
                    <th>До</th>
                  </tr>
                </thead>
                <tbody>
                  {workinghours &&
                    workinghours.map(({ from, to, day_off }, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            {daysOfTheWeek[index]}
                          </td>
                          {!day_off &&
                            <td>
                              {from}
                            </td>}
                          {!day_off &&
                            <td>
                              {to}
                            </td>}
                          {day_off &&
                            <td colSpan='2'>
                              Выходной
                            </td>}

                        </tr>
                      )
                    })}
                </tbody>
              </Table>
            </div>
          </div>
          <div className='panel-footer' style={{ textAlign: 'right' }}>
            <button className='btn btn-danger' onClick={onDelete}>
              Удалить
            </button>
            {' '}
            <StoreEdit
              className='modal-lg'
              data={data}
              buttonLabel={'Редактировать'}
            />

          </div>
        </div>
      </div>
    )
  }
}

StoreItem.propTypes = {}

StoreItem.defaultProps = {}

export { StoreItem }
