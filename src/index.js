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
import SignInPageFB from './pages/SignInPageFB';
import {AuthUserProvider} from './components/Firebase/auth';
import MyFoodPage from './pages/MyFoodPage';
import AllFoodsPage from './pages/AllFoodsPage';
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
      element={
        <React.Fragment>
           <Navbar />
           <MyFoodPage />
           <Footer />
        </React.Fragment>
       }
    />
    <Route
      path={ROUTES.FOODS}
      element={
        <React.Fragment>
           <Navbar />
           <AllFoodsPage />
           <Footer />
        </React.Fragment>
       }
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
           <SignInPageFB />
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
    <AuthUserProvider>
        <AppBase />
    </AuthUserProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
