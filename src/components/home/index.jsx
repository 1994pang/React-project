import React, {Component} from 'react';
import BasicLayout from '../basic-layout';
import withChaeckLogin from '../../contaniers/with-check-login'


@withChaeckLogin
class Home extends Component {
    render() {
        return<div>
        Home
        </div>

    }
};
export default Home;
