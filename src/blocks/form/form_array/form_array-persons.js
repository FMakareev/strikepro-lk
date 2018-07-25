import React, {Component} from 'react';
import {Field, FieldArray, formValueSelector} from 'redux-form'
import {connect} from 'react-redux'
import {InputText} from "../../Input/InputText/InputText";
import {CardBody, CardHeader, Col, Row} from "reactstrap";
import {FormArrayPersonsContacts} from "./form_array-persons-contacts";
import {Preloader} from "../../preloader/preloader";
import {config} from "../../../config";
import {maxLength255, required} from "../form_register/form_registration-validate"; // ES6
// TODO: при перерендере компонент крашется









export class FormArrayPersons extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.getRoles = this.getRoles.bind(this);
        this.renderGroupField = this.renderGroupField.bind(this);
    }

    get initialState() {

        return {
            loading: true,
            error: undefined,
            data: undefined
        }
    }


    getRoles() {
        return fetch(config.api.baseUrl+config.api.register.roles, {
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

    async componentDidMount() {
        const {data} = await this.getRoles();
        this.initFields(data);
        this.setState({data: data, loading: false})
    }

    renderGroupField(member, index, fields) {

        const {data} = this.state;
        if(!data[index]) return null;

        return ( <div key={index}>
            <Field
                name={`${member}.roles_id`}
                component="input"
                type="hidden"
            />
            <Field
                name={`${member}.role_name`}
                component="input"
                type="hidden"
            />
            <CardHeader>
                <strong>{data[index].attributes.name}</strong>
            </CardHeader>
            <CardBody className="card-block">
                <Row>
                    <Col className="col-md-12">
                        <Field
                            name={`${member}.surename`}
                            component={InputText}
                            label="surename"
                            type="text"
                            validate={[required,maxLength255]}
                        />
                    </Col>
                    <Col className="col-md-6">
                        <Field
                            name={`${member}.firstname`}
                            component={InputText}
                            label="firstname"
                            type="text"
                            validate={[required,maxLength255]}
                        />
                    </Col>
                    <Col className="col-md-6">
                        <Field
                            name={`${member}.patronymic`}
                            component={InputText}
                            label="patronymic"
                            type="text"
                            validate={[required,maxLength255]}
                        />
                    </Col>

                    <FieldArray name={`${member}.contacts`} component={FormArrayPersonsContacts}/>

                </Row>
            </CardBody>
        </div>)
    }

    initFields(data){
        const {fields} = this.props;
        const initValue = [
            {
                value: '',
                type: 'phone'
            }, {
                value: '',
                type: 'email'
            }
        ];
        if (fields.length < data.length) {
            data.map((item) => {
                fields.push({
                    roles_id: item.id,
                    role_name: item.name,
                })
            })
        }
    }


    render() {
        // company.persons[0].surename
        console.log(this);
        const {loading, error, data} = this.state;
        if (loading) {
            return (<Preloader/>)
        }
        if (error || !data) {
            return (<div>Error</div>)
        }

        const {fields} = this.props;
        return fields.map(this.renderGroupField)

        // return (
        //     <div className="animated fadeIn">
        //         {
        //             data.map((item,index) => {
        //
        //                 return ( <div key={index}>
        //                     <Field
        //                         name={`persons[${index}].roles_id`}
        //                         component="Input"
        //                         type="hidden"
        //                         onChange={()=> {
        //                             return item.id
        //                         }}
        //                         defaultValue={item.id}
        //                     />
        //                     <Field
        //                         name={`persons[${index}].role_name"`}
        //                         component="Input"
        //                         type="hidden"
        //                         defaultValue={item.attributes.name}
        //                     />
        //                     <CardHeader>
        //                         <strong>{item.attributes.name}</strong>
        //                     </CardHeader>
        //                     <CardBody className="card-block">
        //                         <Row>
        //                             <Col className="col-md-12">
        //                                 <Field
        //                                     name={`persons[${index}].surename`}
        //                                     component={InputText}
        //                                     label="surename"
        //                                     type="text"
        //                                     validate={[required,maxLength255]}
        //                                 />
        //                             </Col>
        //                             <Col className="col-md-6">
        //                                 <Field
        //                                     name={`persons[${index}].firstname`}
        //                                     component={InputText}
        //                                     label="firstname"
        //                                     type="text"
        //                                     validate={[required,maxLength255]}
        //                                 />
        //                             </Col>
        //                             <Col className="col-md-6">
        //                                 <Field
        //                                     name={`persons[${index}].patronymic`}
        //                                     component={InputText}
        //                                     label="patronymic"
        //                                     type="text"
        //                                     validate={[required,maxLength255]}
        //                                 />
        //                             </Col>
        //
        //                             <FieldArray name={`persons[${index}].contacts`} component={FormArrayPersonsContacts}/>
        //
        //                         </Row>
        //                     </CardBody>
        //                 </div>)
        //             })
        //         }
        //     </div>
        // )

    }
}
