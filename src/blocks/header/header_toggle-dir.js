import React, {Component} from 'react';
import PropTypes from 'prop-types';

class HeaderToggleDir extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    get initialState() {
        return {}
    }

    render() {
        return (
            <li className="nav-item hidden-md-down">
                <a href="#!" id="rtlswitch" className="nav-link nav-link-3rd">
                    <span> LTR/RTL </span>
                </a>
            </li>
        )
    }
}

HeaderToggleDir.propTypes = {};

HeaderToggleDir.defaultProps = {};

export {HeaderToggleDir};