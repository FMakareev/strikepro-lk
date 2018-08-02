import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect as connectRestEasy} from "@brigad/redux-rest-easy";
import {Field} from "redux-form";
import {CardBody, Col, Row} from "reactstrap";
import {InputCheckboxGroup} from "../../Input/InputCheckboxGroup/InputCheckboxGroup";
import {config} from "../../../config";
import {Preloader} from "../../preloader/preloader";
import {required} from "../form_register/form_registration-validate";

import {CarrierOptionsAction, getCarrierOptions, isCarrierOptions} from '../../../store/reduxRestEasy/Carrier';

@connectRestEasy(
    (state, ownProps) => ({
        isOptions: isCarrierOptions(state, ownProps),
        options: getCarrierOptions(state),
    }),
    dispatch => ({
        CarrierOptionsAction: () => dispatch(CarrierOptionsAction()),
    })
)
export class FormSectionActivities extends Component {

    static propTypes = {
        CarrierOptionsAction: PropTypes.func.isRequired,
        options: PropTypes.array.isRequired,
        isOptions: PropTypes.bool.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }


    get initialState() {
        return {
            // activities: undefined,
        }
    }

    componentDidMount() {
        this.props.CarrierOptionsAction();
    }

    render() {

        const {isOptions,options} = this.props;
        console.log(this.props);
        if (isOptions) {
            return (<Preloader/>)
        }
        if(!options.length){
            return null;
        }
        return (
            <CardBody className="animated fadeIn card-block">
                <Row>
                    <Col className="col-md-6">
                        <Field
                            name="activities"
                            component={InputCheckboxGroup}
                            type="checkbox"
                            options={options}
                            validate={[required]}
                        />
                    </Col>
                </Row>
            </CardBody>
        )
    }
}
