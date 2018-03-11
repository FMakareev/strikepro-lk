import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './store_edit.css';
import {FormStoreEdit} from "../form/form_store-edit";
class StoreEdit extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.toggle = this.toggle.bind(this);
    }

    get initialState() {
        return {
            modal: false,
            // backdrop: 'static'
        };
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        console.log(this.props);
        return (
            <div style={{display: "inline-block"}}>
                <Button color="warning" onClick={this.toggle}>{this.props.buttonLabel}</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>

                        <FormStoreEdit
                            initialValues={this.props.data ? this.props.data: {}}
                            toggleModal={this.toggle}/>
                </Modal>
            </div>
        );
    }
}

StoreEdit.propTypes = {};

StoreEdit.defaultProps = {};

export {StoreEdit};