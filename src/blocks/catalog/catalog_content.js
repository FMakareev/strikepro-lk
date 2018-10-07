import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button} from 'reactstrap'
import {connect} from "react-redux";
import InfiniteScroll from 'react-infinite-scroller';
import {CatalogProductRow} from "./catalog_product-row";
import {getProducts} from "../../store/reducers/catalog_products/actions";

@connect(
  state => ({ // получаем данные из store
    products: state.catalog_products.products,
    links: state.catalog_products.links,
    pagination: state.catalog_products.pagination,
  }), //
  dispatch => ({
    setStore: (type, value) => {
      dispatch({type: type, payload: value})
    },
    nextPage: (link) => {
      dispatch(getProducts(link, 'next'));
    }
  })
)
export class CatalogContent extends Component {

  static propTypes = {
    products: PropTypes.array,
    links: PropTypes.object,
    pagination: PropTypes.object,
    setStore: PropTypes.func,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return {}
  }


  render() {
    const {products, nextPage, links} = this.props;
    console.log(this.props);
    return (
      <div className="panel-body">
        <table className="table table-bordered">
          <thead>
          <tr>
            <th width="100">Артикул</th>
            <th width="100">Код</th>
            <th>Изображение</th>
            <th>Название</th>    
            <th>Цена</th>
            <th width="100">Остаток</th>
            <th width="120">

            </th>
          </tr>
          </thead>
          {
            !products &&
            <tbody>
            <tr>
              <td colSpan="9">
                <h2 style={{opacity: '0.4'}} className="text-help text-md-center">Выберите
                  категорию</h2>
              </td>
            </tr>
            </tbody>
          }
          {
            products &&
            <InfiniteScroll
              element={'tbody'}
              pageStart={0}
              loadMore={() => {
                nextPage(links.next)
              }}
              hasMore={links.next}
              loader={<div className="loader" key={0}>Загрузка ...</div>}
              useWindow={false}
              threshold={'900'}

            >
              {products.map((item, index) => <CatalogProductRow
                key={index}
                product={item}
                index={index}
              />)}
            </InfiniteScroll>
          }

        </table>
      </div>
    )
  }
}
