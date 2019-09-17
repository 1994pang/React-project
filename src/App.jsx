import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import NotMatch from './components/not-match';
import BasicLayout from './components/basic-layout';
import routes from './config/routes';
import Login from './contaniers/login';

class App extends Component {
    render() {
        return <Router>
            <Switch>
                <Route path="/login" component={ Login } exact/>
                <BasicLayout>
                    <Switch>
                        {
                            routes.map((route, index) => {
                                return <Route {...route} key={index}/>
                            })
                        }
                        <Route component={NotMatch}/>
                    </Switch>
                </BasicLayout>
            </Switch>
        </Router>

    }
}

export default App;