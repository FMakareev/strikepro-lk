import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

export class PageTitle extends PureComponent {

    static propTypes = {
        children: PropTypes.element,
    }

    static defaultProps = {}

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

export default PageTitle;