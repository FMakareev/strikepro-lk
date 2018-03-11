import React from 'react';

import {Field, FieldArray} from "redux-form";
import {FormArrayPersons} from "../form_array/form_array-persons";

export const FormSectionPersons = () => <FieldArray name="persons" component={FormArrayPersons}/>;