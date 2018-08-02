import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {CatalogProductRow} from "./catalog_product-row";

@connect(
    state => ({ // получаем данные из store
        products: state.catalog_products.products
    }), //
    dispatch => ({
        setStore: (type, value) => {
            dispatch({type: type, payload: value})
        }
    })
)
export class CatalogContent extends Component {

    static propTypes = {
        products: PropTypes.array,
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
        const {products} = this.props;

        return (
            <div className="panel-body">
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th width="100">Артикул</th>
                        <th width="100">Код</th>
                        <th>Изображение</th>
                        <th>Название</th>
                        <th width="100">Ед.</th>
                        <th>Страна</th>
                        <th>Цена</th>
                        <th width="100">Остаток</th>
                        <th width="120"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        !products &&
                        <tr>
                            <td colSpan="9">
                                <h2 style={{opacity: '0.4'}} className="text-help text-md-center">Выберите
                                    категорию</h2>
                            </td>
                        </tr>
                    }
                    {
                        products && products.map((item, index) =>  <CatalogProductRow
                            key={index}
                            product={item}
                        />)
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}