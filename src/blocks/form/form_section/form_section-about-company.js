import React from 'react';

import {CardBody, Col, Row} from "reactstrap";
import {Field, FieldArray} from "redux-form";
import {InputText} from "../../Input/InputText/InputText";
import {InputCheckbox} from "../../Input/InputCheckbox/InputCheckbox";
import {FormSectionAddress} from "./form_section-address";

import {
	required, maxLength255, isNumber, minLength9, minLength10,
	minLength13, webSite, maxLength1000
} from '../form_register/form_registration-validate';

const FROM_TYPE_LEGAL_ENTITY = 'legal_entity';
const FORM_TYPE_INDIVIDUAL_ENTREPRENEUR = 'individual_entrepreneur';
const FROM_TYPE_LEGAL_ENTITY_NOT_RF = 'legal_entity_not_rf';

const FormSectionAboutCompany = (props) => {

	const {type = FROM_TYPE_LEGAL_ENTITY} = props;
	return (

		<CardBody className="animated fadeIn card-block">
			<div className="container-fluid">

				<Row>
					<Col className="col-md-12">
						<Field
							name="name"
							component={InputText}
							label="Наименование организации"
							type="text"
							validate={[required, maxLength255]}
						/>
						{
							type === FROM_TYPE_LEGAL_ENTITY && (
								<Field
									name="nds"
									component={InputCheckbox}
									type="checkbox"
									label={"Является плательщикиком НДС"}
									disabled={true}
								/>
							)
						}
					</Col>

					<Col className="col-md-12">
						<div className="row">
							<Field
								name={"places"}
								component={FormSectionAddress}
							/>
						</div>
					</Col>
					<Col className="col-md-6">
						<Field
							name="inn"
							component={InputText}
							label="ИНН"
							type="text"
							validate={[required, maxLength255, isNumber, minLength10]}
						/>
					</Col>
					{
						type === FROM_TYPE_LEGAL_ENTITY && (
							<Col className="col-md-6">
								<Field
									name="kpp"
									component={InputText}
									label="КПП"
									type="text"
									validate={[required, maxLength255, minLength9, isNumber,]}
								/>

							</Col>)
					}
					{
						type === FROM_TYPE_LEGAL_ENTITY && (
							<Col className="col-md-6">
								<Field
									name="ogrn"
									component={InputText}
									label="ОГРН"
									type="text"
									validate={[required, maxLength255, minLength13, isNumber,]}
								/>

							</Col>)
					}
					{
						type === FROM_TYPE_LEGAL_ENTITY && (
							<Col className="col-md-6">
								<Field
									name={"okpo"}
									component={InputText}
									label={"Код по ОКПО"}
									type={"text"}
									validate={[required, maxLength255, isNumber]}
								/>
							</Col>
						)
					}
					<Col className="col-md-6">
						<Field
							name={"site"}
							component={InputText}
							label={"Адрес сайта"}
							type={"text"}
							validate={[webSite, maxLength255]}

						/>
					</Col>
					<Col className="col-md-12">
						<Field
							name={"comment"}
							component={InputText}
							label={"Комментарий"}
							type={"textarea"}
							validate={[maxLength1000]}
						/>
					</Col>
				</Row>

			</div>
		</CardBody>
	)
}

export {FormSectionAboutCompany};
