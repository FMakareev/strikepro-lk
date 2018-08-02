import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Treebeard} from 'react-treebeard';
import style from './catalog_tree-menu-style';
import {connect} from "react-redux";
import {getCategory, initCategory, onToggle} from "../../store/reducers/catalog_category/actions";
import {Store} from "../../store/store";
const data = {
    name: 'root',
    toggled: true,
    children: [
        {
            name: 'parent',
            children: [
                {name: 'child1'},
                {name: 'child2'}
            ]
        },
        {
            name: 'loading parent',
            loading: true,
            children: []
        },
        {
            name: 'parent',
            children: [
                {
                    name: 'nested parent',
                    children: [
                        {name: 'nested child 1'},
                        {name: 'nested child 2'}
                    ]
                }
            ]
        }
    ]
};


@connect(
    state => ({ // получаем данные из store
        tree: state.catalog_category.tree
    }), //
    dispatch => ({
        getCategory: (id) => {
            dispatch(getCategory(Store.getState(), id))
        },
        onToggle: (node, toggled) => {
            dispatch(onToggle(node, toggled))
        },
        initCategory: () => {
            dispatch(initCategory(Store.getState()))
        },
        setStore: (type, value) => {
            dispatch({type: type, payload: value})
        }
    })
)
export class CatalogSidebar extends Component {

    static propTypes = {
        onToggle: PropTypes.func.isRequired,
        initCategory: PropTypes.func.isRequired,
        tree: PropTypes.object.isRequired,
    };
    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    get initialState() {
        return {

        }
    }

    componentDidMount() {
        try{
            if(!this.props.tree.children.length){
                this.props.initCategory();
            }
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        const {tree,onToggle} = this.props;
        return (
            <div className="catalog_sidebar panel panel-default">
                <Treebeard
                    data={tree}
                    onToggle={onToggle}
                    style={style}
                />
            </div>
        )
    }
}
