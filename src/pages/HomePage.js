import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose';

import {Link} from 'react-router-dom';
import * as ROUTES from '../constants/routes.js';

import {withFirebase} from '../components/Firebase';


const HomePage = props => (
    <div className="home-page">
      <div className="home-page-banner">
        <div className="home-banner-txt-container">
          <div className="inner">
            <h1>Why should you join Food Sharing</h1>
  
            <div className="inner-content">
              Food Sharing is one of the world's food sharing platforms. Feeding hungry people through food recovery is the best use for surplus food. Food Sharing aimed at efficiently redistributing surplus food to those who need it the most.
              If you want to contribute for a sustainable environment and mitigate the food waste issue, Food Sharing is for you.
            </div>
  
            <div className="banner-buttons">
              <Link to={ROUTES.SIGN_UP} className="btn btn-black btn-homepage">
                <span>Join Now</span>
              </Link>
              <Link to={ROUTES.FOODS} className="btn btn-find btn-homepage">
                <span>Find Foods</span>
              </Link>
            </div>
          </div>
        </div>
        <img
          className="home-img-banner"
          src={require('../images/food.png')}
          alt="Food homepage banner"
        />
      </div>
  
      <div className="homepage-cards">
        <div className="inner-card">
          <h2>Secure</h2>
          <div className="line-break" />
          <span>
            We ensure that every transaction is secure with a compliance
            procedure.
          </span>
        </div>
        <div className="inner-card">
          <h2>Easy</h2>
          <div className="line-break" />
          <span>
            Find the sharing food you most need, request to owner, and decide on when you can
            come pick it up.
          </span>
        </div>
        <div className="inner-card">
          <h2>Efficient</h2>
          <div className="line-break" />
          <span>
            Track your request without hassle. You will be notified for every
            process change.
          </span>
        </div>
        <div className="inner-card">
          <h2>Search</h2>
          <div className="line-break" />
          <span>
           We offer a wide variety of food options conveniently located near you.
          </span>
        </div>
      </div>
  
      <div className="title-section">How does Food Sharing work? </div>
      <div className="how-it-works-container">
        <img
          className="mockup-platform"
          src={require('../images/foodSaver.png')}
          alt="Food stack homepage banner"
        />
  
        <div className="how-it-works">
          <div>
            <div className="header-title">Find your food</div>
            Search the sharing food that you need. We provide a a wide variety of food options.
          </div>
          <div>
            <div className="header-title">Request the food</div>
            Request to get the food from the food's owner. We let the
            owner decide to give their surplus foods away.
          </div>
          <div>
            <div className="header-title">Meet the owner</div>
            Set the appointment to meet the owner to pickup the food. Our platform
            will only give the owner detail location once the request is approved.
          </div>
        </div>
      </div>
    </div>
  );
  
  HomePage.propTypes = {
    firebase: PropTypes.object
  };
  
  export default HomePage;