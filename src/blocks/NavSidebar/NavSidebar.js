import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {NavItem} from "../NavItem/NavItem";
import {Link, Redirect} from "react-router-dom";
import {ModalFeedback} from "../modal/modal_feedback";
import {BrowserHistory} from "../../history";

export class NavSidebar extends Component {

    static propTypes = {};
    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.onLogout = this.onLogout.bind(this);
        this.onSupport = this.onSupport.bind(this);
    }

    get initialState() {
        return {}
    }
    onLogout(event) {
        event.preventDefault();
        console.log('Logout');
        BrowserHistory.push ('/login')

    }

    onSupport(event) {
        event.preventDefault();
        console.log('Support');
    }

    render() {

        return (
            <aside id="sidebar">
                <div className="sidenav-outer">
                    <div className="side-menu">
                        <div className="menu-body">
                            <ul className="nav nav-pills nav-stacked sidenav">
                                <NavItem icon={"home"} link={'/'}>
                                    <li>
                                        <Link to={{
                                            pathname: '/'
                                        }}>
                                            Главная
                                        </Link>
                                    </li>
                                </NavItem>
                                <NavItem icon={"list"} link={'/catalog'}>
                                    <li>
                                        <Link to={{
                                            pathname: '/catalog'
                                        }}>
                                            Каталог
                                        </Link>
                                    </li>
                                </NavItem>
                                <NavItem icon={"shopping-cart"}  link={'/orders'} >
                                    <li>
                                        <Link to={{
                                            pathname: '/orders'
                                        }}>
                                            Заказы
                                        </Link>
                                    </li>
                                </NavItem>

                                <NavItem icon={"group"} link={'/stores'}>
                                    <li>
                                        <Link to={{
                                            pathname: '/stores'
                                        }}>
                                            Магазины
                                        </Link>

                                    </li>
                                </NavItem>

                                <NavItem icon={"user"} link={'/Profile'}>
                                    <li>
                                        <Link to={{
                                            pathname: '/Profile'
                                        }}>
                                            Профиль
                                        </Link>

                                    </li>
                                </NavItem>

                                <ModalFeedback icon={"support"} buttonLabel={'Тех. поддержка'}/>

                                {/*<NavItem icon={"support"} onClick={this.onSupport}>*/}
                                    {/*<li>*/}
                                        {/*<ModalFeedback buttonLabel={'Тех. поддержка'}/>*/}
                                    {/*</li>*/}
                                {/*</NavItem>*/}

                                <NavItem icon={"sign-out"} onClick={this.onLogout}>
                                    <li>
                                        <a onClick={this.onLogout}>Выход</a>
                                    </li>
                                </NavItem>
                            </ul>
                        </div>
                    </div>
                </div>
            </aside>
        )
    }
}


export default NavSidebar;
