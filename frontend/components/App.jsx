import React from 'react';
import SignupFormContainer from './session/signup_form_container';
import LoginFormContainer from './session/login_form_container';
import { Route, Redirect, Switch, Link } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import HomePageContainer from './home_page/home_page_container';
import StockShowContainer from './stocks/stock_show_container';


const App = () => (
  <div>
    <Switch>
      <AuthRoute exact path='/signup' component={SignupFormContainer} />
      <AuthRoute exact path='/login' component={LoginFormContainer} />
      <ProtectedRoute exact path="/stocks/:ticker" component={StockShowContainer} />
      <Route exact path='/' component={HomePageContainer} />
      <Redirect to="/" />
    </Switch>
  </div>
);

export default App;