import React, {Component} from 'react';
import {Link} from "react-router-dom";

class RegistrationType extends Component {

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
                <div className="col-md-4 col-lg-4 col-md-offset-4 col-lg-offset-4">

                    <h1>Тип пользователя</h1>
                    <div className="login-page-buttons">

                        <ul className="form-content">
                            <li className="form-group">
                                <Link
                                    className="btn btn-rounded btn-white p1025" to={{
                                    pathname: '/register/individual_entrepreneur'
                                }}>
                                    Индивидуальный предприниматель
                                </Link>
                            </li>
                            <li className="form-group">
                                <Link
                                    className="btn btn-rounded btn-white p1025" to={{
                                    pathname: '/register/legal_entity_not_rf'
                                }}>
                                    Юр. лицо, за пределами РФ
                                </Link>
                            </li>
                            <li className="form-group">
                                <Link
                                    className="btn btn-rounded btn-white p1025" to={{
                                    pathname: '/register/legal_entity'
                                }}>
                                    Юридическое лицо
                                </Link>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        )
    }
}

RegistrationType.propTypes = {};

RegistrationType.defaultProps = {};

export {RegistrationType};