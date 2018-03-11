import React, {Component} from 'react';
import PropTypes from 'prop-types';

class HeaderToggleTheme extends Component {

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
                <div className="dropdown color-picker">
                    <a href="" className="dropdown-toggle nav-link" data-toggle="dropdown"
                       role="button" aria-haspopup="true" aria-expanded="false">
                                    <span>
                                        <i className="fa fa-circle"></i>
                                    </span>
                    </a>
                    <div className="dropdown-menu animated fadeIn">
                        <div className="padder-h-xs">
                            <table className="table color-swatches-table text-xs-center no-m-b">
                                <tr>
                                    <td className="text-xs-center colorr">
                                        <a href="#!" data-theme="blue"
                                           className="theme-picker">
                                            <i className="fa fa-circle blue-base"></i>
                                        </a>
                                    </td>
                                    <td className="text-xs-center colorr">
                                        <a href="#!" data-theme="green"
                                           className="theme-picker">
                                            <i className="fa fa-circle green-base"></i>
                                        </a>
                                    </td>
                                    <td className="text-xs-center colorr">
                                        <a href="#!" data-theme="red"
                                           className="theme-picker">
                                            <i className="fa fa-circle red-base"></i>
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-xs-center colorr">
                                        <a href="#!" data-theme="purple"
                                           className="theme-picker">
                                            <i className="fa fa-circle purple-base"></i>
                                        </a>
                                    </td>
                                    <td className="text-xs-center colorr">
                                        <a href="#!" data-theme="midnight-blue"
                                           className="theme-picker">
                                            <i className="fa fa-circle midnight-blue-base"></i>
                                        </a>
                                    </td>
                                    <td className="text-xs-center colorr">
                                        <a href="#!" data-theme="lynch"
                                           className="theme-picker">
                                            <i className="fa fa-circle lynch-base"></i>
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </li>
        )
    }
}

HeaderToggleTheme.propTypes = {};

HeaderToggleTheme.defaultProps = {};

export {HeaderToggleTheme};