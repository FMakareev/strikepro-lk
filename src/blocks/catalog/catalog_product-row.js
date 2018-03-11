import React, {Component} from 'react';
import {connect} from "react-redux";
import {ActionChangeProduct} from "../../store/reducers/order/actions";
import {bindActionCreators} from "redux";
import ReactImageMagnify from 'react-image-magnify';

import ImageZoom from 'react-medium-image-zoom'

function mapStateToProps(state) {
    return {
        products: state.catalog_products.products,
        order: state.order,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ActionChangeProduct: bindActionCreators(ActionChangeProduct, dispatch),
    }
}

function mergeProps({products, order}, dispatchProps, ownProps) {
    return Object.assign({}, ownProps, {
        products, order,
        ActionChangeProduct: (product, count) => dispatchProps.ActionChangeProduct({products, order}, product, count),
    });
}

@connect(mapStateToProps, mapDispatchToProps, mergeProps)
export class CatalogProductRow extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.addProduct = this.addProduct.bind(this);
        this.removeProduct = this.removeProduct.bind(this);
        this.updateProduct = this.updateProduct.bind(this);
    }

    get initialState() {
        return {
            count: 0
        }
    }

    removeProduct() {
        let count = this.state.count > 0 ? this.state.count - 1 : 0;
        this.setState({count});
        if (count > 0) {
            this.props.ActionChangeProduct(this.props.product, count)
        }
    }

    addProduct() {
        let count = this.state.count + 1;
        this.setState({count});
        if (count > 0) {
            this.props.ActionChangeProduct(this.props.product, count)
        }
    }

    updateProduct(event) {
        if (!this.isNumber(event.target.value)) {
            let count = event.target.value;
            this.setState({count});
            if (count > 0) {
                this.props.ActionChangeProduct(this.props.product, count)
            }
        }
    }

    isNumber = value => value && isNaN(Number(value));

    shouldComponentUpdate(nextProps, nextState) {
        // console.log('shouldComponentUpdate',nextProps);
        // console.log('shouldComponentUpdate',nextState);
        if (nextState.count !== this.state.count) {
            return true
        }
        if (nextProps.product.id !== this.props.product.id) {

            let searchResult = 0;
            this.props.order.products.map((item) => {
                if (item.id === nextProps.product.id) {
                    searchResult = 1;
                    this.setState({count: item.count})
                }
            });
            if (!searchResult) {
                this.setState({count: 0})
            }
            return true
        }
        return false
    }

    render() {
        const {product} = this.props;
        const {count} = this.state;
        // console.log(product);
        return (
            <tr>
                <td width="100">{product.id}</td>
                <td>{product.code}</td>
                <td>

                    <ImageZoom
                        image={{
                            src: 'https://picsum.photos/200',
                            alt: 'Golden Gate Bridge',
                            className: 'img',
                            style: { width: '5em' }
                        }}
                        zoomImage={{
                            src: 'https://picsum.photos/600',
                            alt: 'Golden Gate Bridge'
                        }}
                    />

                </td>
                <td>{product.name}</td>
                <td>{product.unit}</td>
                <td>{product.manufacturers}</td>
                <td>{product.price.price}
                </td>
                <td>{product.balance}</td>
                <td>
                    <div className="product-quantity_wrapper">
                        <div className="product-quantity_btn">
                            <button type="button" className="btn__control" onClick={this.removeProduct}>
                                <i className={"fa fa-minus"}></i>
                            </button>
                        </div>
                        <div className="product-quantity_input">
                            <input type="text" className="inp__control" name="quantity"
                                   value={count ? count : 0} onChange={this.updateProduct}/>
                        </div>
                        <div className="product-quantity_btn">
                            <button type="button" className="btn__control" onClick={this.addProduct}>
                                <i className={"fa fa-plus"}></i>
                            </button>
                        </div>
                    </div>
                </td>

            </tr>
        );
    }
}
