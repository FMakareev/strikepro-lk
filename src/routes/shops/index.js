import React, {Component} from 'react';

const withShops = (WrappedComponent) => {
    class AsyncComponent extends Component {

        componentWillMount = async () => {
           // Получаем данные
        };

        render() {
            const { user } = this.state;
            const newProps = { user };
            if (!user) return null; // если user ещё нет вернём null
            return (
                <WrappedComponent {...this.props} {...newProps} />
            )
        }
    }
    return AsyncComponent;
}