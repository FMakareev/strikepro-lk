import React from 'react';

import {Col, Row} from "reactstrap";
import {FieldArray} from "redux-form";
import {FormArrayPhone} from "../form_array/form_array-phone";
import {FormArrayEmail} from "../form_array/form_array-email";

const FormSectionEmail = () => (
    <fieldset className="animated fadeIn card-block">
        <Row>
            <Col className="col-md-12">
                <FieldArray name="email" component={FormArrayEmail}/>
            </Col>
        </Row>
    </fieldset>
);

const FormSectionPhone= () => (
    <fieldset className="animated fadeIn card-block">
        <Row>
            <Col className="col-md-12">
                <FieldArray name="phone" component={FormArrayPhone}/>
            </Col>
        </Row>
    </fieldset>
);

export {FormSectionEmail, FormSectionPhone};