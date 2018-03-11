import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class CatalogFilter extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    get initialState() {
        return {}
    }

    render() {
        return (
            <div className="panel-heading">
                <div className="row">
                    <div className="form-group col-sm-2">
                        <label className="control-label">По цене</label>
                        <select className="form-control">
                            <option>По возрастанию</option>
                            <option>По убыванию</option>
                        </select>
                    </div>
                    <div className="form-group col-sm-2">
                        <label className="control-label">Страна</label>
                        <select className="form-control">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                </div>
            </div>
        )
    }
}

CatalogFilter.propTypes = {};

CatalogFilter.defaultProps = {};
