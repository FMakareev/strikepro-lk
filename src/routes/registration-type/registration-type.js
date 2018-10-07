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
					<div className="card">
						<div className="card-header card-primary card-title text-xs-left" style={{color: '#fff'}}>
							<Link
								style={{color: '#fff', marginRight:'1.25rem'}}
								to={{
									pathname: '/login'
								}}
							>
								<i className="fa fa-arrow-left"></i>
							</Link>
							Тип пользователя
						</div>
						<div className="card-block">
							<ul className="form-content padding-none margin-none">
								<li className="form-group">
									<Link
										className="btn btn-rounded btn-block btn-white p1025" to={{
										pathname: '/register/individual_entrepreneur'
									}}>
										Индивидуальный предприниматель
									</Link>
								</li>
								<li className="form-group">
									<Link
										className="btn btn-rounded btn-block btn-white p1025" to={{
										pathname: '/register/legal_entity_not_rf'
									}}>
										Юр. лицо, за пределами РФ
									</Link>
								</li>
								<li className="form-group">
									<Link
										className="btn btn-rounded btn-block btn-white p1025" to={{
										pathname: '/register/legal_entity'
									}}>
										Юридическое лицо
									</Link>
								</li>
							</ul>
						</div>
					</div>

				</div>
			</div>
		)
	}
}

RegistrationType.propTypes = {};

RegistrationType.defaultProps = {};

export {RegistrationType};
