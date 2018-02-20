import React from 'react';
import { Switch, Route, } from 'react-router-dom';
import App from './containers/App';
import DashboardContainer from './containers/Dashboard';

export default () => (
    <div>
        <Switch>
            <Route exact path="/" component={DashboardContainer} />
        </Switch>
    </div>
);
