import React, {Component} from 'react';
import {Button, Modal, ModalHeader} from "reactstrap";
import {FormOrderCreate} from "../form/form_order-create/form_order-create";

export class ModalOrderCreate extends Component {

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
        return (
            <div>
                <button className="btn btn-success" onClick={this.toggle}>Создать новый заказ</button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Создание заказа</ModalHeader>
                    <FormOrderCreate closeForm={this.toggle}/>
                </Modal>
            </div>
        );
    }
}
