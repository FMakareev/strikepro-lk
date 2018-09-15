import React, {PureComponent} from 'react';
import './style.css';
export class InternalServerError  extends PureComponent {

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    get initialState() {
        return {}
    }

    render() {
        console.log(this.props);
        const {title, description} = this.props;
        return (
            <div id="body-container" className="animsition dashboard-page">
            <div className="error-page">
                <div>
                    <h1 data-h1={title}>{title}</h1>
                    <p data-p={description}>{description}</p>
                </div>
            </div>
            </div>
        )
    }
}

// Index.propTypes = {};
//
// Index.defaultProps = {};

export default InternalServerError;