import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect as connectRestEasy} from "@brigad/redux-rest-easy";

import {StoreItem} from "../../blocks/store/store_item";
import {PageTitle} from "../../blocks/PageTitle/PageTitle";
import {StoreEdit} from "../../blocks/store/store_edit";
import {
    GetStoreAction,
    CreateStoreAction,
    UpdateStoreAction,
    DeleteStoreAction,
    getStore,
    isGetStore,
    isCreateStore,
    isUpdateStore,
    isDeleteStore,
}from "../../store/reduxRestEasy/store";

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


@connectRestEasy(
    (state, ownProps) => ({
        store: getStore(state),
        isGetStore:isGetStore(state, ownProps),
        isCreateStore: isCreateStore(state, ownProps),
        isUpdateStore: isUpdateStore(state, ownProps),
        isDeleteStore: isDeleteStore(state, ownProps),
    }),
    dispatch => ({
        CreateStoreAction: body => dispatch(CreateStoreAction({body})),
        UpdateStoreAction: (body,urlParams) => dispatch(UpdateStoreAction({urlParams,body})),
        DeleteStoreAction: (urlParams) => dispatch(DeleteStoreAction({urlParams})),
        GetStoreAction: () => dispatch(GetStoreAction()),
    })
)
class Shops extends Component {

    static propTypes = {
        GetStoreAction: PropTypes.func.isRequired,
        CreateStoreAction: PropTypes.func.isRequired,
        UpdateStoreAction: PropTypes.func.isRequired,
        DeleteStoreAction: PropTypes.func.isRequired,
        store: PropTypes.array,
        isGetStore: PropTypes.bool.isRequired,
        isCreateStore: PropTypes.bool.isRequired,
        isUpdateStore: PropTypes.bool.isRequired,
        isDeleteStore: PropTypes.bool.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    get initialState() {
        return {}
    }
    componentDidMount(){
        this.props.GetStoreAction();
    }

    render() {
        console.log(this.props);
        const {store} = this.props;
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
                    {store && store.map((item, index) => <StoreItem key={index} data={item}/>)}
                </div>


            </div>
        )
    }
}

Shops.propTypes = {};

Shops.defaultProps = {};

export {Shops};