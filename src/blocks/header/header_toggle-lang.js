import React, {Component} from 'react';
import PropTypes from 'prop-types';

class HeaderToggleLang extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    get initialState() {
        return {}
    }

    render() {
        return (
            <li className="nav-item hidden-md-down admin-section ">
                <div className="dropdown">
                    <a href="#!"
                       className="dropdown-toggle dropdown-caret nav-link nav-link-3rd"
                       data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                        <span>'.lang'</span></a>
                    <ul className="dropdown-menu navbar-nav lang animated fadeIn">
                        <li>
                            <a className="dropdown-item" href="#!">
                                English</a>
                        </li>
                        <li>
                            <a className="dropdown-item" href="#!">
                                Dutch</a>
                        </li>
                        <li>
                            <a className="dropdown-item" href="#!">
                                اردو
                            </a>
                        </li>
                        <li>
                            <a className="dropdown-item" href="#!">
                                हिन्दी</a>
                        </li>
                    </ul>
                </div>
            </li>
        )
    }
}

HeaderToggleLang.propTypes = {};

HeaderToggleLang.defaultProps = {};

export {HeaderToggleLang};