import React, {Component} from 'react';
import PropTypes from 'prop-types';

class HeaderSearch extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    get initialState() {
        return {}
    }

    render() {
        return (
            <li className="nav-item active nav-item-topnav hidden-md-down">
                <form className="nav-item navbar-form navbar-left form-inline" role="search">
                    <i className="fa fa-search"></i>
                    <input type="text" className="form-control form-control-topnav" placeholder=""/>
                </form>
            </li>
        )
    }
}

HeaderSearch.propTypes = {};

HeaderSearch.defaultProps = {};

export {HeaderSearch};