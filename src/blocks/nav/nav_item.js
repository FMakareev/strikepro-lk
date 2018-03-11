import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

class NavItem extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    get initialState() {
        return {}
    }

    render() {
        const {icon, link,children, onClick} = this.props;
        return (
            <li className="sidebar-menu-list">
                {
                    link &&
                    <Link className="sidebar-menu-options" to={{
                        pathname: link
                    }}>
                        <i className={"fa fa-"+icon}></i>
                    </Link>
                }
                {
                    onClick && <a onClick={onClick}>
                        <i className={"fa fa-"+icon}></i>
                    </a>
                }

                <ul className="nested-dropdown animated fadeIn">
                    {children}
                </ul>

            </li>
        )
    }
}

NavItem.propTypes = {};

NavItem.defaultProps = {};

export {NavItem};