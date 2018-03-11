import React, {Component} from 'react';
import PropTypes from 'prop-types';

class HeaderNotification extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    get initialState() {
        return {}
    }

    render() {
        return (
            <li className="nav-item hidden-md-down text-xs-left">
                <div className="dropdown">
                    <a href="#!" className="dropdown-toggle dropdown-caret nav-link nav-link-3rd"
                       data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                        <i className="fa fa-envelope"></i>
                        <span className="label label-success">5</span>
                    </a>
                    <div className="dropdown-menu animated fadeIn" style={{
                        left: 0,
                        right: 'auto'
                    }}>

                        <div className="messages-top">
                            <a className="dropdown-item text-xs-left" href="#!">
                                '.topnav1'
                            </a>
                        </div>
                        <div className="dropdown-messages">
                            <a className="dropdown-item" href="#!">
                                <div className="message-sender">
                                    '.lucy'
                                </div>
                                <div className="message-header">
                                    '.topnavheader1'
                                </div>
                            </a>
                        </div>
                        <div className="dropdown-messages">
                            <a className="dropdown-item" href="#!">
                                <div className="message-sender">
                                    '.diptesh'
                                </div>
                                <div className="message-header">
                                    '.topnavheader2'
                                </div>
                            </a>
                        </div>
                        <div className="dropdown-messages">
                            <a className="dropdown-item" href="#!">
                                <div className="message-sender">
                                    '.weng'
                                </div>
                                <div className="message-header">
                                    .topnavheader3'
                                </div>
                            </a>
                        </div>
                        <div className="dropdown-messages">
                            <a className="dropdown-item" href="#!">
                                <div className="message-sender">
                                    .jade'
                                </div>
                                <div className="message-header">
                                    '.topnavheader4'
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </li>
        )
    }
}

HeaderNotification.propTypes = {};

HeaderNotification.defaultProps = {};

export {HeaderNotification};