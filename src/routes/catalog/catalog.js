import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {PageTitle} from "../../blocks/page-title/page-title";
import './catalog.css';
// import {CatalogFilter} from "../../blocks/catalog/catalog_filter";
import {CatalogSidebar} from "../../blocks/catalog/catalog_sidebar";
import {CatalogContent} from "../../blocks/catalog/catalog_content";
import {CatalogShoppingCart} from "../../blocks/catalog/catalog_shopping-cart";
import {connect} from "react-redux";
import {Store} from '../../store/store';
import {initShoppingCart} from "../../store/reducers/shopping_cart/actions";

export class Catalog extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    get initialState() {
        return { }
    }
    componentWillMount(){

    }
    componentDidMount(){

        Store.dispatch(initShoppingCart());
    }

    render() {
        const {sum, count} = this.state;
        console.log(this);
        return (
            <div id="body-container" className="animsition dashboard-page">
                <PageTitle>
                    Каталог
                </PageTitle>
                <div className="catalog_wrapper clearfix">
                    <CatalogSidebar/>
                    <div className="catalog_content">
                        <div className="panel panel-default">
                            <CatalogContent/>
                            <CatalogShoppingCart/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}