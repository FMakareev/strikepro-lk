import React, {Component} from 'react';

class PageError extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    get initialState() {
        return {}
    }

    render() {
        return (
            <div>
                PageError
            </div>
        )
    }
}

PageError.propTypes = {};

PageError.defaultProps = {};

export {PageError};