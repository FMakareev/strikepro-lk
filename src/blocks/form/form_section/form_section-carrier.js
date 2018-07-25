// form_section-carrier

import React,{Component} from 'react';
import {InputText} from "../../Input/InputText/InputText";
import {FieldArray, FormSection} from "redux-form";
import {CardBody, Col, Row} from "reactstrap";
import Field from "redux-form/es/Field";
import {SelectAsyncAutocomplete} from "../../select/select_async-autocomplete";

import {config} from "../../../config"
import {Preloader} from "../../preloader/preloader";
import {InputCheckboxGroup} from "../../Input/InputCheckboxGroup/InputCheckboxGroup";
import {required} from "../form_register/form_registration-validate";


export class FormSectionCarrier extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }


    get initialState() {
        return {
            conditions: undefined,
        }
    }

    async componentDidMount() {
        const {data} = await this.getConditions();
        const conditions = this.initConditions(data);
        this.setState({conditions})
    }

    arrayNormalizr = (array) => {
        const newArray = [];
        if (array) {
            array.map((item, index) => {
                newArray.push({
                    id: item.id,
                    name: item.attributes.name
                })
            })
        }
        return newArray;
    };

    getConditions() {
        return fetch(config.api.baseUrl+config.api.register.getCarriersOption, {
            method: 'get'
        }).then((response) => {
            if (response.status >= 200 && response.status < 300) {
                return Promise.resolve(response);
            }
            return Promise.reject(response.status);
        }).then((response) => {
            return response.json()
        }).then((response) => {
            return response
        }).catch(error => {
            console.error(error);
            return error;
        });
    }

    initConditions(array){
        const newArray = [];
        if(array) {
            array.map((item,index) => {
                newArray.push({
                    name: item.attributes.name,
                    id: item.id,
                })
            });
            return newArray
        }
    }

    render(){

        const {conditions} = this.state;
        if(!conditions) {
            return (<Preloader/>)
        }


        return (
            <FormSection name="carrier" >
                <CardBody className="animated fadeIn card-block">
                    <Row>
                        <Col className="col-md-12">
                            <Field
                                name="carrier_id"
                                component={SelectAsyncAutocomplete}
                                label="Наименование транспортной компании"
                                type="text"
                                selectOption={
                                    {
                                        url: config.api.baseUrl+config.api.register.getCarriers,
                                        valueKey:'id',
                                        labelKey:'name',
                                        arrayNormalizr: this.arrayNormalizr // функция для преобразования обхекта с данными к формату react-select
                                    }
                                }
                            />
                        </Col>

                        <Col className="col-md-12">
                            <Field
                                name="conditions"
                                label="Условия транспортировки"
                                component={InputCheckboxGroup}
                                type="checkbox"
                                options={conditions}
                                validate={[required]}
                            />
                        </Col>

                        <Col className="col-md-12">
                            <Field
                                name="comment"
                                component={InputText}
                                label="Комментарий"
                                type="textarea"
                            />
                        </Col>

                    </Row>
                </CardBody>
            </FormSection>
        );
    };
}
