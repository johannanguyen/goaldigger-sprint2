import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LandingPage from './LandingPage';
import HomePage from './HomePage';
import UserProfile from './UserProfile';
import AddGoal from './AddGoal';
import Work from './Work';
import School from './School';
import Exercise from './Exercise';
import Food from './Food';
import Art from './Art';
import Lifestyle from './Lifestyle';
import Finance from './Finance';
import Misc from './Misc';
import GroupPage from './GroupPage';

export default function Content() {
  const All = () => 
  <div>
    <LandingPage />
    <HomePage />
    <UserProfile />
    <AddGoal />
    <Work />
    <School />
    <Exercise />
    <Food />
    <Art />
    <Lifestyle />
    <Finance />
    <Misc />
  </div>
  
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage}/>
        <Route path="/all" component={All} />
        <Route path="/home" component={HomePage} />
        <Route path="/user" component={UserProfile} />
        <Route path="/:groupName" component={GroupPage}/>
      </Switch>
    </Router>
  );
}