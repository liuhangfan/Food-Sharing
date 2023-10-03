import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import * as ROUTES from './constants/routes';
import HomePage from './pages/HomePage';
import './index.css';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import ComplexNavbar from './components/Navbar/ComplexNavbar';
// const WithFooter = ({children}) => (
//   <React.Fragment>
//     {children}
//     <Footer />
//   </React.Fragment>
// );

const AppBase = () => (
    <Routes>
    <Route
      exact
      path={ROUTES.LANDING}
      element={
        <React.Fragment>
           <ComplexNavbar />
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
    <AppBase />
  </BrowserRouter>,
  document.getElementById('root')
);
