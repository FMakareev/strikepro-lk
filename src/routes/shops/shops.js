import React, {Component} from 'react';

import {StoreItem} from "../../blocks/store/store_item";
import {PageTitle} from "../../blocks/page-title/page-title";
import {StoreEdit} from "../../blocks/store/store_edit";

const store = [
    {
        id: "23121",
        name: "Магазин 1",
        address: "187050, Ленинградская обл, Тосненский р-н, Любань г, Ленина ул, дом № 17",
        workinghours: [
            {
                type: 'monday',
                from: '00:30',
                to: '02:00'
            },
            {
                type: 'tuesday',
                from: '00:00',
                to: '06:30'
            },
            {
                type: 'wednesday',
                from: '00:00',
                to: '09:30'
            },
            {
                type: 'thursday',
                from: '00:30',
                to: '04:00'
            },
            {
                type: 'friday',
                from: '00:30',
                to: '06:30'
            },
            {
                type: 'saturday',
                from: '00:30',
                to: '06:00'
            },
            {
                type: 'sunday',
                from: '00:00',
                to: '06:30'
            }
        ],
    }, {
        id: "23121",
        name: "Магазин 1",
        address: "187050, Ленинградская обл, Тосненский р-н, Любань г, Ленина ул, дом № 17",
        workinghours: [
            {
                type: 'monday',
                from: '00:30',
                to: '02:00'
            },
            {
                type: 'tuesday',
                from: '00:00',
                to: '06:30'
            },
            {
                type: 'wednesday',
                from: '00:00',
                to: '09:30'
            },
            {
                type: 'thursday',
                from: '00:30',
                to: '04:00'
            },
            {
                type: 'friday',
                from: '00:30',
                to: '06:30'
            },
            {
                type: 'saturday',
                from: '00:30',
                to: '06:00'
            },
            {
                type: 'sunday',
                from: '00:00',
                to: '06:30'
            }
        ],
    }, {
        id: "23121",
        name: "Магазин 1",
        address: "187050, Ленинградская обл, Тосненский р-н, Любань г, Ленина ул, дом № 17",
        workinghours: [
            {
                type: 'monday',
                from: '00:30',
                to: '02:00'
            },
            {
                type: 'tuesday',
                from: '00:00',
                to: '06:30'
            },
            {
                type: 'wednesday',
                from: '00:00',
                to: '09:30'
            },
            {
                type: 'thursday',
                from: '00:30',
                to: '04:00'
            },
            {
                type: 'friday',
                from: '00:30',
                to: '06:30'
            },
            {
                type: 'saturday',
                from: '00:30',
                to: '06:00'
            },
            {
                type: 'sunday',
                from: '00:00',
                to: '06:30'
            }
        ],
    }
];

class Shops extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    get initialState() {
        return {}
    }

    render() {
        return (
            <div id="body-container" className="animsition dashboard-page">

                <PageTitle>
                    Магазины
                    <div className="float-right" style={{
                        margin: "-4px 0 0 0",
                        float: 'right'
                    }}>
                        <StoreEdit className="modal-lg" buttonLabel={"Добавить магазин"}/>
                    </div>
                </PageTitle>

                <div className="row">
                    {store.map((item, index) => <StoreItem key={index} data={item}/>)}
                </div>


            </div>
        )
    }
}

Shops.propTypes = {};

Shops.defaultProps = {};

export {Shops};