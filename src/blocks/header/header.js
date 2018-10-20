import React, {Component} from 'react';
// import {HeaderSearch} from "./header_search";
// import {HeaderNotification} from "./header_notification";
// import {HeaderToggleTheme} from "./header_toggle-theme";
// import {HeaderToggleDir} from "./header_toggle-dir";
// import {HeaderToggleLang} from "./header_toggle-lang";
// import {HeaderProfileDropDown} from "./header_profile-dropdown";
// import {HeaderProfileDropDown} from "./header_profile-dropdown";
import {Link} from "react-router-dom";

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    get initialState() {
        return {}
    }

    render() {
        return (
            <nav className="navbar navbar-light navbar-theme topnav-navbar bg-white text-xs-center navbar-fixed-top"
                 style={{
                     padding:'0 6px'
                 }}>
                <button className="navbar-toggler sidebar-push hidden-md-up pull-xs-left" type="button"
                        data-target="#bs-example-navbar-collapse-1">
                    &#9776;
                </button>

                <Link className="navbar-brand" to="/">StrikePro: Partner</Link>

                <div className="collapse navbar-toggleable-xs text-xs-left" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav pull-xs-right" style={{
                        display: 'inline-block'
                    }}>

                        {/*<HeaderToggleTheme/>*/}

                        {/*<HeaderToggleDir/>*/}

                        {/*<HeaderToggleLang/>*/}

                        {/*<HeaderProfileDropDown/>*/}


                    </ul>

                    <ul className="nav navbar-nav" style={{
                        display: 'inline-block'
                    }}>

                        {/*<HeaderSearch/>*/}

                        {/*<HeaderNotification/>*/}

                    </ul>
                </div>
            </nav>
        )
    }
}



export {Header};
