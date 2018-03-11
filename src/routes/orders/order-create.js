import React, {Component} from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

@withStyles()
export class OrderCreate extends Component {
    static propTypes = {}

    static defaultProps = {}


    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    get initialState() {
        return {}
    }

    render() {
        return (
           <div></div>
        )
    }
}

