import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {PageTitle} from "../../blocks/PageTitle/PageTitle";
import {order} from './orders';


class OrdersEditor extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.getProduct = this.getProduct.bind(this);
    }

    get initialState() {
        return {
            id: this.props.match.params.id,
            product: null,
            loading: true
        }
    }

    componentDidMount() {
        console.log(this.state);
        this.getProduct(this.state.id)
    }

    getProduct(id) {
        order.map((item) => {
            if (item.id === parseInt(id)) {
                this.setState({
                    loading: false,
                    product: item,
                })
            }
        })
    }

    renderRow(item, index) {
        return (
            <tr key={index}>
                <td>{item.article}</td>
                <td>{item.code}</td>
                <td>
                    <img src="{product.image.thumb_image}" alt="" width="60"
                         height="40"/>
                </td>
                <td>{item.name}</td>
                <td>{item.unit}</td>
                <td>{item.manufacturers}</td>
                <td>{item.price}</td>
                <td>{item.balance}</td>
                <td>
                    <div className="flex__quantity">
                        <button type="button" className="btn__control">
                            <i className="fa fa-minus" aria-hidden="true"></i>

                        </button>
                        <input type="text" className="inp__control" name="quantity" value="{item.count}"/>
                        <button type="button" className="btn__control">
                            <i className="fa fa-plus" aria-hidden="true"></i>
                        </button>
                    </div>
                    <span>
                        {item.count}
                    </span>
                </td>
                <td>{item.total} <i className="fa fa-rub" aria-hidden="true"></i></td>
                <td>
                    <button type="button" className="btn__control">
                        <i className="fa fa-trash" aria-hidden="true"></i>
                    </button>
                </td>
            </tr>
        )
    }

    render() {
        const {loading, product} = this.state;
        console.log(loading, product)
        return (
            <div id="body-container" className="animsition dashboard-page">

                <PageTitle>
                    Заказ №
                </PageTitle>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="panel panel-default">
                            <div className="panel-body ">
                                {
                                    loading && (
                                        <h2>Loading</h2>
                                    )
                                }
                                {
                                    !loading && (
                                        <table className="table table-bordered" style={{
                                            border: 'none'
                                        }}>
                                            <thead>
                                            <tr>
                                                <th width="100">Артикул</th>
                                                <th width="100">Код</th>
                                                <th>Изображение</th>
                                                <th>Название</th>
                                                <th width="80">Ед.</th>
                                                <th>Страна</th>
                                                <th>Цена</th>
                                                <th width="80">Остаток</th>
                                                <th width="150">Кол-во</th>
                                                <th width="140">Общая стоимость</th>
                                                <th width="50"></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                order.map((item,index) => {
                                                    return this.renderRow(item, index);
                                                })
                                            }
                                            </tbody>
                                        </table>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

OrdersEditor.propTypes = {};

OrdersEditor.defaultProps = {};

export {OrdersEditor};