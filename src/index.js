import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import * as ROUTES from './constants/routes';
import HomePage from './pages/HomePage';

const AppBase = () => (
  <Switch>
    <Route
      exact
      path={ROUTES.LANDING}
      render={() => (
        // <WithFooter>
        //   <WithNavbar>
            <HomePage />
        //   </WithNavbar>
        // </WithFooter>
      )}
    />
    <Route
      path={ROUTES.PASSWORD_FORGET}
    />
    <Route
      path={ROUTES.ACCOUNT}
    />
    <Route
      path={ROUTES.FOODS}
    />
    <Route
      path={ROUTES.FOOD_DETAIL}
    />
    <Route
      path={ROUTES.ADD_FOOD}
    />
    <Route
      path={ROUTES.MY_FOOD_HISTORY}
    />
    <Route
      path={ROUTES.SIGN_UP}
    />
    <Route
      path={ROUTES.LOG_IN}
    />
    <Route
      path={ROUTES.EDIT_PROFILE}
    />
    <Route
      path={ROUTES.SETTINGS}
    />
  </Switch>
);

ReactDOM.render(
  <BrowserRouter>
    <AppBase />
  </BrowserRouter>,
  document.getElementById('root')
);
