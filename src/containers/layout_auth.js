import React, {Component} from 'react';

class LayoutAuth extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    get initialState() {
        return {}
    }

    render() {
        return (
            <div className="login-page animated fadeIn">
                {this.props.children}
            </div>
        )
    }
}

LayoutAuth.propTypes = {};

LayoutAuth.defaultProps = {};

export {LayoutAuth};