import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';
import React from 'react';

import App from "./view/home/App";
import Login from "./view/home/Login";
import Register from "./view/home/Register";


export default class CSRouter extends React.Component {
    render() {
        return (
            (
                <Router>
                    <div>
                    <Switch>
                    <Route path="/login" component={Login}></Route> 
                    <Route path="/register" component={Register}></Route>
                    <Route path="/" component={App}></Route>   
                    </Switch>            
                    </div>
                </Router>
            )
        )
    }
}