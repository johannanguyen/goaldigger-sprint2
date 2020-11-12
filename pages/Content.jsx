import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// import * as React from 'react';

import LandingPage from './LandingPage';
import HomePage from './HomePage';
import UserProfile from './UserProfile';
import AddGoal from './AddGoal';

import Exercise from '../scripts/Exercise';
import Art from '../scripts/Art';

export default function Content() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/Art" component={Art} />

          <Route path="/AddGoal" component={AddGoal} />
          <Route path="/UserProfile" component={UserProfile} />
          <Route path="/HomePage" component={HomePage} />
          <Route path="/" component={LandingPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
