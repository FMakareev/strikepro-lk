import React, {Component} from 'react';
import {TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col} from 'reactstrap';
import classnames from 'classnames';
import {Link} from "react-router-dom";

const statusOrder = ['Сохранен','Активный','Завершен'];
export class Tabs extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: 0
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    deleteOrder(id) {
        // const result = confirm("Вы уверенны?");
        // if(result){
        //     console.log('Удолить заказ')
        // } else {
        //     console.log('не Удолить заказ')
        // }
    }

    renderRow(data, index) {
        return (
            <tr key={index}>
                <td>{data.date}</td>
                <td>{data.id}</td>
                <td>{data.store.name}</td>
                <td>{statusOrder[data.status]}</td>
                <td>{data.order_cost} {' '}
                    <i className="fa fa-rub" aria-hidden="true"></i>
                </td>
                <td>{data.numberPosition + '/' + data.count}</td>
                <td align="center">
                    <Link to={{
                        pathname: '/order/'+data.id
                    }}>
                        Подробнее
                    </Link>
                </td>
                <td>
                    <button onClick={() => this.deleteOrder(data.id) }>
                        <i className="fa fa-trash" aria-hidden="true"></i>
                    </button>
                </td>
            </tr>
        )
    }

    renderNavLink(item, index) {
        return (
            <NavItem key={index}>
                <NavLink
                    className={classnames({active: this.state.activeTab === index})}
                    onClick={() => {
                        this.toggle(index);
                    }}
                >
                    {statusOrder[item]}
                </NavLink>
            </NavItem>
        )
    }

    render() {
        const {data} = this.props;
        const tabsType = Object.keys(data);
        return (
            <div>

                <Nav tabs>
                    {
                        tabsType.map((item, index) => {
                            console.log(item);
                            return this.renderNavLink(item, index);
                        })
                    }
                </Nav>

                <TabContent activeTab={this.state.activeTab}>

                    {
                        tabsType.map((item, index) => {
                            return (
                                <TabPane key={index} tabId={index}>
                                    <Row>
                                        <Col sm="12">
                                            <table className="table table-bordered">
                                                <thead>
                                                <tr>
                                                    <th>Дата создания</th>
                                                    <th>Номер заказа</th>
                                                    <th>Магазин</th>
                                                    <th>Статус заказа</th>
                                                    <th>Сумма заказа</th>
                                                    <th>Кол-во позиций/Общее кол-во</th>
                                                    <th>Подробности</th>
                                                    <th></th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    data[item].map((item, index) => {
                                                        return this.renderRow(item,index)
                                                    })
                                                }
                                                </tbody>
                                            </table>
                                        </Col>
                                    </Row>
                                </TabPane>
                            )
                        })
                    }

                </TabContent>
            </div>
        );
    }
}