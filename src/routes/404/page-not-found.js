import React, {Component} from 'react';

class PageNotFound extends Component {

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
                PageNotFound
            </div>
        )
    }
}

PageNotFound.propTypes = {};

PageNotFound.defaultProps = {};

export {PageNotFound};