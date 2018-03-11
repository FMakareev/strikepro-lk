import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Modal, ModalHeader} from "reactstrap";
import {FormFeedback} from "../form/form_feedback/form_feedback";

export class ModalFeedback extends Component {

    static propTypes = {};

    static defaultProps = {};
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        const {icon} = this.props;

        return (
            <li className="sidebar-menu-list">
                <a onClick={this.toggle}>
                    <i className={"fa fa-"+icon}></i>
                </a>
                <ul className="nested-dropdown animated fadeIn">
                    <li>
                        <a onClick={this.toggle}>{this.props.buttonLabel}</a>
                        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                            <ModalHeader toggle={this.toggle}>Обратная связь</ModalHeader>
                            <FormFeedback
                                initialValues={{}}
                                toggleModal={this.toggle}/>
                        </Modal>
                    </li>
                </ul>

            </li>
        );
    }
}