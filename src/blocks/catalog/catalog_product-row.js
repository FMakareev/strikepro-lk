import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {updateProduct} from "../../store/reducers/shopping_cart/actions";
import {Store} from '../../store/store';
import ReactImageMagnify from 'react-image-magnify';
import {imageMock} from "./imageMock";




@connect(
  state => ({ // получаем данные из store
    products: state.catalog_products.products,
    shopping_cart: state.shopping_cart,

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

  static propTypes = {
    products: PropTypes.array,
    updateProduct: PropTypes.func,
    setStore: PropTypes.func,
  }


  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.addProduct = this.addProduct.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.updateHeightImage = this.updateHeightImage.bind(this)

  }


  get initialState() {
    return {
      smallImageHeight: "auto",
      smallImageWidth: "auto",

    };
  }

  updateHeightImage(){
    const { product } = this.props;
    const $this = this;
    const img = document.getElementsByClassName('imageClassName' + product.id)[0];

    img.addEventListener('load', function(){
      const Height = this.clientHeight;
      const Width = this.clientWidth;

      $this.setState({
        smallImageWidth: 100,
        smallImageHeight: Height / (Width / 100),
      });
    })

  }
  componentDidMount() {
    this.updateHeightImage();
  }
  isNumber = value => value && isNaN(Number(value));

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
    let newItem = Object.assign({}, {}, this.props.product);
    let count = newItem.count + 1;
    this.props.updateProduct(newItem, count);
  }

  render() {
    const { product, shopping_cart: { order, load, error, success }, index} = this.props;
    console.log(this.state);
    return (<tr>
      <td width="100">{product.id}</td>
      <td>{product.code}</td>
      <td>
        <ReactImageMagnify
          imageClassName={"imageClassName" + product.id}
		      enlargedImageContainerDimensions={{width: '300%', height: '300%'}}
		      {...{
			      smallImage: {
				      alt: 'Wristwatch by Ted Baker London',
				      isFluidWidth: false,
              src: imageMock[index].small,
              width: this.state.smallImageWidth,
              height: this.state.smallImageHeight,
			      },
			      largeImage: {
				      alt: '',
              src: imageMock[index].big,
				      width: 1200,
				      height: 1800
			      },
			      isHintEnabled: false
		      }}/>

      </td>
      <td>{product.name}</td>
      <td>{product.price.price}
      </td>
      <td>{product.balance}</td>
      <td>{
        order &&
        <div className="product-quantity_wrapper">
          <div className="product-quantity_btn">
            <button type="button" className="btn__control" onClick={this.removeProduct}>
              <i className={"fa fa-minus"}/>
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
              <i className={"fa fa-plus"}/>
            </button>
          </div>
        </div>
      }
      </td>


    </tr>)
  }
}
