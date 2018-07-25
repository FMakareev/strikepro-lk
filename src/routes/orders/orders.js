import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {PageTitle} from "../../blocks/PageTitle/PageTitle";
import {Link} from "react-router-dom";
import {Tabs} from "../../blocks/tabs/tabs";
import {ModalOrderCreate} from "../../blocks/modal/modal_order-create";

export const order = [
    {
        id: 123, // id заказа
        status: '1', // статус заказа
        date: 412412512512, // дата заказа
        order_cost: 1000, // стоимость заказа
        numberPosition: 1, // колличество видов товара
        count: 10, // общее колличество товаров
        store: 1,
    }, {
        id: 1223, // id заказа
        status: '1', // статус заказа
        date: 412412512512, // дата заказа
        order_cost: 1000, // стоимость заказа
        numberPosition: 1, // колличество видов товара
        count: 10, // общее колличество товаров
        store: 1,
    }, {
        id: 1243, // id заказа
        status: '1', // статус заказа
        date: 412412512512, // дата заказа
        order_cost: 1000, // стоимость заказа
        numberPosition: 1, // колличество видов товара
        count: 10, // общее колличество товаров
        store: 1,
    }, {
        id: 11123, // id заказа
        status: '0', // статус заказа
        date: 412412512512, // дата заказа
        order_cost: 1000, // стоимость заказа
        numberPosition: 1, // колличество видов товара
        count: 10, // общее колличество товаров
        store: 1,
    }, {
        id: 12553, // id заказа
        status: '0', // статус заказа
        date: 412412512512, // дата заказа
        order_cost: 1000, // стоимость заказа
        numberPosition: 1, // колличество видов товара
        count: 10, // общее колличество товаров
        store: 1,
    }, {
        id: 122353, // id заказа
        status: '2', // статус заказа
        date: 412412512512, // дата заказа
        order_cost: 1000, // стоимость заказа
        numberPosition: 1, // колличество видов товара
        count: 10, // общее колличество товаров
        store: 1,
    }, {
        id: 769123, // id заказа
        status: '2', // статус заказа
        date: 412412512512, // дата заказа
        order_cost: 1000, // стоимость заказа
        numberPosition: 1, // колличество видов товара
        count: 10, // общее колличество товаров
        store: 1,
    }, {
        id: 12743, // id заказа
        status: '1', // статус заказа
        date: 412412512512, // дата заказа
        order_cost: 1000, // стоимость заказа
        numberPosition: 1, // колличество видов товара
        count: 10, // общее колличество товаров
        store: 1,
    }, {
        id: 132963, // id заказа
        status: '1', // статус заказа
        date: 412412512512, // дата заказа
        order_cost: 1000, // стоимость заказа
        numberPosition: 1, // колличество видов товара
        count: 10, // общее колличество товаров
        store: 1,
    }, {
        id: 19624743, // id заказа
        status: '1', // статус заказа
        date: 412412512512, // дата заказа
        order_cost: 1000, // стоимость заказа
        numberPosition: 1, // колличество видов товара
        count: 10, // общее колличество товаров
        store: 1,
    }, {
        id: 1484243, // id заказа
        status: '0', // статус заказа
        date: 412412512512, // дата заказа
        order_cost: 1000, // стоимость заказа
        numberPosition: 1, // колличество видов товара
        count: 10, // общее колличество товаров
        store: 1,
    }, {
        id: 14824839, // id заказа
        status: '0', // статус заказа
        date: 412412512512, // дата заказа
        order_cost: 1000, // стоимость заказа
        numberPosition: 1, // колличество видов товара
        count: 10, // общее колличество товаров
        store: 1,
    }, {
        id: 1224853, // id заказа
        status: '2', // статус заказа
        date: 412412512512, // дата заказа
        order_cost: 1000, // стоимость заказа
        numberPosition: 1, // колличество видов товара
        count: 10, // общее колличество товаров
        store: 1,
    }, {
        id: 123625853, // id заказа
        status: '2', // статус заказа
        date: 412412512512, // дата заказа
        order_cost: 1000, // стоимость заказа
        numberPosition: 1, // колличество видов товара
        count: 10, // общее колличество товаров
        store: 1,
    }
];


class Orders extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.orderStatusSort = this.orderStatusSort.bind(this);
    }

    get initialState() {
        return {
            loading: true,
            error: null
        }
    }

    componentDidMount() {
        this.orderStatusSort(order);
    }

    orderStatusSort(data) {
        let statusArray = {};
        data.map((item) => {
            statusArray[item.status] = []
        });
        data.map((item) => {
            statusArray[item.status].push(item)
        });
        console.log(Object.keys(statusArray).sort());
        this.setState({data: statusArray,loading: false});
    }

    noOrder() {
        return (
            <div id="body-container" className="animsition dashboard-page">

                <PageTitle>
                    Заказыы
                    <div className="float-right" style={{
                        margin: "-4px 0 0 0",
                        float: 'right'
                    }}>
                        <ModalOrderCreate/>
                    </div>
                </PageTitle>

                <div className="row">
                    <div className="col-sm-12">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <h3>У вас нет заказов.</h3>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

    render() {

        const {data,loading,error} = this.state;
        if(loading) {
            return (<div>loading...</div>)
        }
        if(error) {
            return (<div>error</div>)
        }
        if(!data){
            return this.noOrder();
        }
        return (
            <div id="body-container" className="animsition dashboard-page">

                <PageTitle>
                    Заказы
                    <div className="float-right" style={{
                        margin: "-4px 0 0 0",
                        float: 'right'
                    }}>
                        <ModalOrderCreate/>
                    </div>
                </PageTitle>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <Tabs data={data}/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

Orders.propTypes = {};

Orders.defaultProps = {};

export {Orders};