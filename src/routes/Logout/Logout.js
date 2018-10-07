import React, { Component } from 'react';
import { connect as connectRestEasy} from '@brigad/redux-rest-easy';
import {
  UserLogOut
} from '../../store/reduxRestEasy/login'
import { Redirect } from 'react-router-dom';


@connectRestEasy(
   null,
    dispatch => ({
        UserLogOut: () => dispatch(UserLogOut()),
    })
)
export class Logout extends Component {
  componentDidMount () {
    localStorage.clear();
    this.props.UserLogOut();
  }
  render () {
    return <Redirect to={'/login'} />
  }
}

export default Logout
