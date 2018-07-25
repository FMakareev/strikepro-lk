import React,{Component} from 'react';

import {CardBody, Col, Row} from "reactstrap";
import {InputCheckboxGroup} from "../../Input/InputCheckboxGroup/InputCheckboxGroup";
import {config} from "../../../config";
import {Preloader} from "../../preloader/preloader";
import {Field} from "redux-form";
import {required} from "../form_register/form_registration-validate";



export class FormSectionActivities extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }


    get initialState() {
        return {
            activities: undefined,
        }
    }

    async componentDidMount() {
        const {data} = await this.getActivities();
        const activities = this.initActivities(data);
        this.setState({activities})
    }

    getActivities() {
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

    initActivities(array){
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

        const {activities} = this.state;
        if(!activities) {
            return (<Preloader/>)
        }

        return(
            <CardBody className="animated fadeIn card-block">
                <Row>
                    <Col className="col-md-6">
                        <Field
                            name="activities"
                            component={InputCheckboxGroup}
                            type="checkbox"
                            options={activities}
                            validate={[required]}
                        />
                    </Col>
                </Row>
            </CardBody>
        )
    }
}
