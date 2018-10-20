import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import { LayoutMain } from '../containers/layout-main';
import { LayoutAuth } from '../containers/layout_auth';

import { Login } from './login/login';
import { Logout } from './Logout/Logout';
import { Register } from './registration/register';
import { RegistrationType } from './registration-type/registration-type';

import { Shops } from './shops/shops';
import { PageError } from './error/page-error';
import { Orders } from './orders/orders';
import { Catalog } from './catalog/catalog';
import { BrowserHistory } from '../history';
import InternalServerError from './InternalServerError/InternalServerError';
import OrderPage from './order';
import RegistrationSuccess from './registrationSuccess';
import PasswordRecovery from "./PasswordRecovery";
import PasswordReset from "./PasswordReset";

const AuthRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <LayoutAuth>
          <Component {...matchProps} />
        </LayoutAuth>
      )}
    />
  )
};

const MainRoute = ({ component: Component, title, description, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <LayoutMain>
          <Component title={title} description={description} {...matchProps} />
        </LayoutMain>
      )}
    />
  )
};

export class RouterWrapper extends Component {
  render () {
    return (
      <Router history={BrowserHistory} basename='/'>
        <Route>
          <Switch>
            <AuthRoute
              exact
              path={'/register/type'}
              name={'Тип пользователя'}
              component={RegistrationType}
            />
            <AuthRoute
              path={'/register/:type'}
              name={'Регистрация'}
              component={Register}
            />
            <AuthRoute
              exact
              path={'/register-success'}
              name={'Регистрация'}
              component={RegistrationSuccess}
            />
            <AuthRoute exact path={'/password-reset'} name={'Сброс пароля'} component={PasswordReset} />
            <AuthRoute exact path={'/password_recovery'} name={'Восстановление пароля'} component={PasswordRecovery} />
            <AuthRoute exact path='/login' name={'Вход'} component={Login} />
            <AuthRoute exact path='/logout' name={'Выход'} component={Logout} />

            <MainRoute exact path='/' name={'Магазины'} component={Shops} />
            <MainRoute
              exact
              path='/stores'
              name={'Магазины'}
              component={Shops}
            />

            <MainRoute
              exact
              path='/orders'
              name={'Заказы'}
              component={Orders}
            />
            <MainRoute
              path='/order/:id'
              name={'Редактор заказа'}
              component={OrderPage}
            />

            <MainRoute
              exact
              path='/catalog'
              name={'Каталог'}
              component={Catalog}
            />
            <MainRoute
              path='/catalog/:id'
              name={'Каталог'}
              component={Catalog}
            />

            <MainRoute path='/Error' name={'Ошибка'} component={PageError} />
            <MainRoute
              path='/500'
              title={'500'}
              description={'Внутренняя ошибка сервера'}
              component={InternalServerError}
            />
            <MainRoute
              path='/404'
              title={'404'}
              description={'Страница не найдена'}
              component={InternalServerError}
            />
            <MainRoute
              path='/404'
              title={'404'}
              description={'Страница не найдена'}
              component={InternalServerError}
            />
            <MainRoute
              path='/*'
              title={'404'}
              description={'Страница не найдена'}
              component={InternalServerError}
            />

          </Switch>
        </Route>
      </Router>
    )
  }
}
