import React, {Component} from 'react';
import {connect} from "react-redux";
import {updateProduct} from "../../store/reducers/shopping_cart/actions";
import ReactImageMagnify from 'react-image-magnify';
import {Store} from '../../store/store';
import ImageZoom from 'react-medium-image-zoom'


@connect(
    state => ({ // получаем данные из store
        products: state.catalog_products.products
    }), //
    dispatch => ({
        updateProduct: (product, count) => {
            dispatch(updateProduct(Store.getState(), product, count))
        },
        setStore: (type, value) => {
            dispatch({type: type, payload: value})
        }
    })
)
export class CatalogProductRow extends Component {

    isNumber = value => value && isNaN(Number(value));

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.addProduct = this.addProduct.bind(this);
        this.removeProduct = this.removeProduct.bind(this);
        this.updateProduct = this.updateProduct.bind(this);
    }

    get initialState() {
        return {}
    }


    updateProduct(event) {
        if (!this.isNumber(event.target.value)) {
            let count = event.target.value;
            this.setState({count});
            if (count >= 0) {
                let newItem = JSON.parse(JSON.stringify(this.props.product));
                this.props.updateProduct(newItem, count);
            }
        }
    }


    removeProduct() {
        let newItem = JSON.parse(JSON.stringify(this.props.product));
        let count = newItem.count > 0 ? newItem.count - 1 : 0;
        this.props.updateProduct(newItem, count);
    }


    addProduct() {
        let newItem = Object.assign({},{},this.props.product);
        let count = newItem.count + 1;
        this.props.updateProduct(newItem, count);
    }

    render() {
        const {product} = this.props;

        return (<tr>
            <td width="100">{product.id}</td>
            <td>{product.code}</td>
            <td>

                <ImageZoom
                    image={{
                        src: 'https://picsum.photos/200',
                        alt: 'Golden Gate Bridge',
                        className: 'img',
                        style: {width: '5em'}
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
                        <input
                            type="number"
                            className="inp__control"
                            name="quantity"
                            value={product.count ? product.count : 0}
                            onChange={this.updateProduct}
                        />
                    </div>
                    <div className="product-quantity_btn">
                        <button type="button" className="btn__control" onClick={this.addProduct}>
                            <i className={"fa fa-plus"}></i>
                        </button>
                    </div>
                </div>
            </td>

        </tr>)
    }
}