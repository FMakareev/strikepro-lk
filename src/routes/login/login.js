import React, {Component} from 'react';
import {FormAuth} from "../../blocks/form/form_auth/form_auth";


/*
* http://reactnative.vn/create-redux-middle-ware-to-refresh-token-in-react-native-app/
* https://www.npmjs.com/package/redux-refresh-token
* https://stackoverflow.com/questions/37963545/using-oauth2-refresh-token-in-react-redux-app
* https://stackoverflow.com/questions/37963545/using-oauth2-refresh-token-in-react-redux-app
* https://stackoverflow.com/questions/36948557/how-to-use-redux-to-refresh-jwt-token
* */

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    get initialState() {
        return {}
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4 col-lg-4 col-md-offset-4 col-lg-offset-4">

                    <a className="hvr-pulse-grow">
                        <img src="images/flat-avatar.png" className="user-avatar"/>
                    </a>

                    <h1>Strikepro</h1>

                    <FormAuth/>
                </div>
            </div>
        )
    }
}

Login.propTypes = {};

Login.defaultProps = {};

export {Login};