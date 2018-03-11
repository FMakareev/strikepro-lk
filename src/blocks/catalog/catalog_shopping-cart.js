import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {Store} from '../../store/store';
// import {CatalogProductRow} from "./catalog_product-row";

// function mapStateToProps(store) {
//     return {
//         products: store.order.products,
//         store
//     }
// }
//
// @connect(
//     state => ({ // получаем данные из store
//         order: state.order,
//         products: state.order.products,
//     }), //
//     dispatch => ({
//         setStore: (type, value) => {
//             dispatch({type: type, payload: value})
//         }
//     })
// )
export class CatalogShoppingCart extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        // this.shoppingCartUpdate = this.shoppingCartUpdate.bind(this);
        // this.onOpenBasket       = this.onOpenBasket.bind(this);
    }

    get initialState() {
        return {
            sum: 0,
            count: 0,
            isOpenBasket: false
        }
    }

    componentDidMount() {
        // Store.subscribe(() => {
        //     this.shoppingCartUpdate();
        // })
    }

    shoppingCartUpdate() {
        const {products} = this.props;
        let sum = 0;
        let count = 0;
        products && products.map(item => {
            sum = (parseFloat(sum) + parseFloat(item.sum)).toFixed(2);
            count = parseInt(count) + parseInt(item.count);
        });
        this.setState({sum, count});
    }

    onOpenBasket() {

    }

    render() {
        const {count, sum,isOpenBasket} = this.state;
        const {products} = this.props;
        console.log(this.props);
        return (<div className="panel shopping-cart__wrap">
            <a title="Перейти в корзину" className="shopping-cart__desc">
                <strong>Корзина:</strong>
                {count} / {sum}
            </a>
        </div>)
        // return (
        //     <Fragment>
        //         {
        //             isOpenBasket &&  <div style={{
        //                 position: 'fixed',
        //                 width: 'calc(100% - 80px)',
        //                 bottom: '42px',
        //                 left: '54px',
        //             }}>
        //                 <div className="panel panel-default">
        //                     <h2 className="panel-heading">Корзина</h2>
        //                     <div className="panel-body">
        //                         <table className="table table-bordered">
        //                             <thead>
        //                             <tr>
        //                                 <th width="100">Артикул</th>
        //                                 <th width="100">Код</th>
        //                                 <th>Изображение</th>
        //                                 <th>Название</th>
        //                                 <th width="100">Ед.</th>
        //                                 <th>Страна</th>
        //                                 <th>Цена</th>
        //                                 <th width="100">Остаток</th>
        //                                 <th width="120"></th>
        //                             </tr>
        //                             </thead>
        //                             <tbody>
        //                             {
        //                                 !products &&  <tr>
        //                                     <td colSpan="9">
        //                                         <h2 style={{opacity: '0.4'}} className="text-help text-md-center">
        //                                             Корзина пуста
        //                                         </h2>
        //                                     </td>
        //                                 </tr>
        //                             }
        //                             {
        //                                 products && products.map(({data}, index) => {
        //                                     return <CatalogProductRow key={index} product={data}/>
        //                                 })
        //                             }
        //
        //
        //                             </tbody>
        //                         </table>
        //                     </div>
        //                 </div>
        //             </div>
        //         }
        //
        //         <div className="panel shopping-cart__wrap">
        //             <a title="Перейти в корзину" className="shopping-cart__desc">
        //                 <strong>Корзина:</strong>
        //                 {count} / {sum}
        //             </a>
        //         </div>
        //     </Fragment>
        // )
    }
}