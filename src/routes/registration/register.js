import React, {Component} from 'react';
import {FormRegister} from "../../blocks/form/form_register/form_register";
import {initialValues} from "./model";

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }


    get initialState() {
       try{
           const {
               match: {
                   params
               }
           } = this.props;

           return {
               type: params.type,
               // initialValues: initialValues
           }
       } catch(err){
           console.error(err);
       }
    }



    render() {
        const {
            match: {
                params:{
                    type
                }
            }
        } = this.props;
        initialValues.form_type = type;
        if(this.state.type === 'legal_entity'){
            initialValues.company.nds = true;
        }
	    initialValues.company.contact_main = 'email[0].is_main';

	    return (
            <FormRegister
                initialValues={initialValues}
                type={this.state.type}/>
        )
    }
}

Register.propTypes = {};

Register.defaultProps = {};

export {Register};
