import React, {Component} from 'react';
import FormPasswordReset from "../../blocks/form/form_password-reset";
import {Link} from "react-router-dom";
import {isEmail, maxLength255, required} from "../../blocks/form/form_register/form_registration-validate";
import {InputText} from "../../blocks/Input/InputText/InputText";
import {Button, Col, Row} from "reactstrap";

export class PasswordReset extends Component {

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
		const {page} = this.state;
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
							<i className="fa fa-arrow-left"/>
						</Link>
						Восстановление пароля
					</div>
					<div className="card-block">
						{
							page === 1 && <FormPasswordReset
								callBack={
									() => this.setState(() => ({
										page: 2,
									}))
								}
							/>
						}
						{
							page === 2 && <div className={'login-page-buttons'}>
								<div className='form-content'>
									<h1 style={{    margin: '30px 0'}}>
										Письмо отправлено
									</h1>
									<p>
										Инструкции по восстановлению пароля отправлены на указанный адрес электронной почты.
									</p>
								</div>
								<Row>
									<Col>
										<Link
											to={{
												pathname: '/login'
											}}
										>
											<Button
												type={'submit'}
												className={'btn btn-rounded btn-white border-none box-shadow-none '}
												outline
												color={'secondary'}
												style={{
													padding: '10px 60px'
												}}
											>
												Назад
											</Button>
										</Link>

									</Col>
								</Row>
							</div>

						}
					</div>
				</div>


			</div>
		</div>)
	}
}

export default PasswordReset;
