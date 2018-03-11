import React, {Component} from 'react';
import {Alert, FormGroup, Input, Label} from "reactstrap";

const DeleteSubStringCompany = (str) => {
    let target = "company."; // цель поиска

    let count = [];

    let pos = -1;
    while ((pos = str.indexOf(target, pos + 1)) != -1) {
        count.push(pos);
    }
    return str.substring(count[count.length - 1])
};

const InputText = ({input, label, type, meta, styleWrap,placeholder, classNameInput,disabled = false}) => {
    return (
        <FormGroup style={styleWrap}>
            <Label>{label}</Label>
            <Input disabled={disabled} placeholder={placeholder} className={classNameInput} type={type} {...input} style={{
                width: '100%'
            }}/>
            {
                meta.touched && meta.error && !disabled &&
                <Alert color="danger" className="animated fadeIn">
                    {meta.error}
                </Alert>
            }


        </FormGroup>
    )
};


export {InputText};