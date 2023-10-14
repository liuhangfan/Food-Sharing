import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './redux/store/index';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import * as ROUTES from './constants/routes';
import HomePage from './pages/HomePage';
import './index.css';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import SignInPage from './pages/SignInPage';
import Firebase, {FirebaseContext} from './components/Firebase';

const AppBase = () => (
    <Routes>
    <Route
      exact
      path={ROUTES.LANDING}
      element={
        <React.Fragment>
           <Navbar />
           <HomePage />
           <Footer />
        </React.Fragment>
       }
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
      element={
        <React.Fragment>
           <SignInPage />
           <Footer />
        </React.Fragment>
       }
    />
    <Route
      path={ROUTES.EDIT_PROFILE}
    />
    <Route
      path={ROUTES.SETTINGS}
    />
    </Routes>
);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <FirebaseContext.Provider value={new Firebase()}>
        <AppBase />
      </FirebaseContext.Provider>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
