import React from 'react';
import { Switch, Route } from 'react-router-dom';

import BarList from './BarList'
import BarInfo from './BarInfo'
import BarMap from './BarMap'

const Layout = () => (
    <div>
        <Switch>
            <Route exact path='/' component={BarList} />
            <Route path='/:id' component={BarInfo} />
            <Route exact path='/map' component={BarMap} />
        </Switch>
    </div>
)

export default Layout