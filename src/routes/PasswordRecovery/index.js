import React, {Component} from 'react'
import PropTypes from 'prop-types'
import FormPasswordRecovery from "../../blocks/form/form_password-recovery";
import {Link} from "react-router-dom";

export class PasswordRecovery extends Component {


	constructor(props) {
		super(props);
		this.state = this.initialState;
	}

	get initialState() {
		return {
			page: 1,
		}
	}


	render() {
		const {location: {search}} = this.props;
		const token = search.replace('?token=', '');

		return (<div className="row">
			<div className="col-md-4 col-md-offset-4">
				<div className="card">
					<div className="card-header card-primary card-title text-xs-left" style={{color: '#fff'}}>
						<Link
							style={{color: '#fff', marginRight: '1.25rem'}}
							to={{
								pathname: '/login'
							}}
						>
							<i className="fa fa-arrow-left"></i>
						</Link>
						Восстановление пароля
					</div>
					<div className="card-block">
						<FormPasswordRecovery

							initialValues={{
								token,
								email: 'email@email.com',
								password: 'password',
								password_confirmation: 'password',
							}}
						/>
					</div>
				</div>
			</div>
		</div>)
	}
}

export default PasswordRecovery;
