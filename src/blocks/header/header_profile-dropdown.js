import React, {Component} from 'react';
import PropTypes from 'prop-types';

class HeaderProfileDropDown extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    get initialState() {
        return {}
    }

    render() {
        return (
            <li className="nav-item admin-section">
                <div className="dropdown admin-dropdown">
                    <a href className="dropdown-toggle dropdown-caret nav-link nav-link-3rd"
                       data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                        <img src="images/flat-avatar.png" className="topnav-img" alt=""/><span
                        className="hidden-md-down clearfix">Ani Pascal</span>
                    </a>
                    <ul className="dropdown-menu navbar-nav animated fadeIn">
                        <li>
                            <a className="dropdown-item text-xs-left" href="profile">'.profile'</a>
                        </li>
                        <li>
                            <a className="dropdown-item text-xs-left" href="login">'.logout'</a>
                        </li>
                    </ul>
                </div>
            </li>
        )
    }
}

HeaderProfileDropDown.propTypes = {};

HeaderProfileDropDown.defaultProps = {};

export {HeaderProfileDropDown};