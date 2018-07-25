import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";


/** Блок */
export class NavItem extends Component {

    static propTypes = {
        /** Font font awesome css class*/
        icon: PropTypes.string,
        /** Router link*/
        link: PropTypes.string,
        /** React element */
        children: PropTypes.element,
        /** on click event function */
        onClick: PropTypes.func,
    };

    static defaultProps = {};

    render() {
        const {icon, link, children, onClick} = this.props;
        return (
            <li className="sidebar-menu-list">
                {
                    link &&
                    <Link className="sidebar-menu-options" to={{
                        pathname: link
                    }}>
                        <i className={"fa fa-"+icon}/>
                    </Link>
                }
                {
                    onClick && <a onClick={onClick}>
                        <i className={"fa fa-"+icon}/>
                    </a>
                }

                {
                    children &&
                    <ul className="nested-dropdown animated fadeIn">
                        {children}
                    </ul>
                }

            </li>
        )
    }
}


export default NavItem;