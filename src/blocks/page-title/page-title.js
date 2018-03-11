import React, {Component} from 'react';
import PropTypes from 'prop-types';

class PageTitle extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    get initialState() {
        return {}
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="panel">
                        <h1 className="panel-heading">
                            {this.props.children}
                        </h1>
                    </div>
                </div>
            </div>
        )
    }
}

PageTitle.propTypes = {};

PageTitle.defaultProps = {};

export {PageTitle};