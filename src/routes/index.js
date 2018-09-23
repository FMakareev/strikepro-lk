import React, {Component} from 'react';
import {Router, Route, Switch} from 'react-router-dom';

import {LayoutMain} from "../containers/layout-main";
import {LayoutAuth} from "../containers/layout_auth";

import {Login} from "./login/login";
import {Register} from "./registration/register";
import {RegistrationType} from "./registration-type/registration-type";

import {Shops} from "./shops/shops";
import {PageError} from './error/page-error'
import {Orders} from "./orders/orders";
import {Catalog} from "./catalog/catalog";
import {BrowserHistory} from "../history";
import InternalServerError from "./InternalServerError/InternalServerError";
import OrderPage from "./order";

const AuthRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={matchProps => (
            <LayoutAuth>
                <Component {...matchProps} />
            </LayoutAuth>
        )}/>
    )
};

const MainRoute = ({component: Component, title, description, ...rest}) => {
    return (
        <Route {...rest} render={matchProps => (
            <LayoutMain>
                <Component title={title} description={description} {...matchProps} />
            </LayoutMain>
        )}/>
    )
};

export class RouterWrapper extends Component {
    render() {
        return (
            <Router history={BrowserHistory} basename="/">
                <Route>
                    <Switch>
                        <AuthRoute exact path="/register/type" name="Тип пользователя" component={RegistrationType}/>
                        <AuthRoute exact path="/register/:type" name="Регистрация" component={Register}/>
                        <AuthRoute exact path="/login" name="Вход" component={Login}/>

                        <MainRoute exact path="/" name="Главная" component={LayoutMain}/>
                        <MainRoute exact path="/stores" name="Магазины" component={Shops}/>

                        <MainRoute exact path="/orders" name="Заказы" component={Orders}/>
                        <MainRoute exact path="/order/:id" name="Редактор заказа" component={OrderPage}/>

                        <MainRoute exact path="/catalog" name="Каталог" component={Catalog}/>
                        <MainRoute exact path="/catalog/:id" name="Каталог" component={Catalog}/>

                        <MainRoute path="/Error" name="Ошибка" component={PageError}/>
                        <MainRoute
                            path="/500"
                            title={'500'}
                            description={'Внутренняя ошибка сервера'}
                            component={InternalServerError}
                        />
                        <MainRoute
                            path="/404"
                            title={'404'}
                            description={'Страница не найдена'}
                            component={InternalServerError}
                        />
                        <MainRoute
                            path="/404"
                            title={'404'}
                            description={'Страница не найдена'}
                            component={InternalServerError}
                        />
                        <MainRoute
                            path="/*"
                            title={'404'}
                            description={'Страница не найдена'}
                            component={InternalServerError}
                        />


                    </Switch>
                </Route>
            </Router>
        );
    }
}


