import React, {Component} from 'react';
import {NavSidebar} from "../blocks/NavSidebar/NavSidebar";
import {Header} from "../blocks/header/header";

class LayoutMain extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    get initialState() {
        return {}
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Header/>
                <NavSidebar/>
                {this.props.children}
            </div>
        )
    }
}

LayoutMain.propTypes = {};

LayoutMain.defaultProps = {};

export {LayoutMain};