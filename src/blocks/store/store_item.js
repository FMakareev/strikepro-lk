import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StoreEdit} from "./store_edit";
import {Table} from "reactstrap";

const daysOfTheWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

class StoreItem extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    get initialState() {
        return {}
    }

    onDelete() {

    }

    onStoreEdit() {

    }

    render() {
        console.log(this.props);
        const {id, name, address, workinghours} = this.props.data;
        return (

            <div className="col-md-6 col-lg-6">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3>{name}</h3>
                    </div>
                    <div className="row">
                        <div className="panel-body col-md-3">
                            <img src="http://strikepro.ru/upload/new.png" style={{width: '100%'}} alt=""/>
                        </div>
                        <div className="panel-body col-md-9">
                            <h4>Адрес:</h4>
                            <address>
                                {address}
                            </address>
                            <h4>Время работы:</h4>
                            <Table className="table table-hover">
                                <thead>
                                <tr>
                                    <th>Дни недели</th>
                                    <th>От</th>
                                    <th>До</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    workinghours.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    {
                                                        daysOfTheWeek[index]
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        item.from
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        item.to
                                                    }
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </Table>
                        </div>
                    </div>
                    <div className="panel-footer" style={{textAlign: "right"}}>
                        <button className="btn btn-danger" onClick={this.onDelete.bind(this)}>Удалить</button>
                        {' '}
                        <StoreEdit className="modal-lg" data={this.props.data} buttonLabel={"Редактировать"}/>

                    </div>
                </div>
            </div>
        )
    }
}

StoreItem.propTypes = {};

StoreItem.defaultProps = {};

export {StoreItem};