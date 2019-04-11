import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './static/css/normalize.css'
import Login from './page/Login/Login';
import Home from './page/Home/Home';
import registerServiceWorker from './registerServiceWorker';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';

ReactDOM.render(
<HashRouter>
    <LocaleProvider locale={zhCN}>
        <Switch>
            <Route path="/Login" component={Login} />
            <Route path="/Home" component={Home} />
            <Route path="/" render={(props) =>
                <Home {...props}/>
            }>
            </Route>
        </Switch>
    </LocaleProvider>
</HashRouter>, 
document.getElementById('root'));
registerServiceWorker();
