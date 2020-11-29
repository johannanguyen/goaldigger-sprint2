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
  const All = () => <div>something</div>
  function Home() {
  return <h2>Home</h2>;
}
  
  return (
    <Router>
      <Switch>
        <Route path="/"> <HomePage /> </Route>
        
      </Switch>
    </Router>
  );
}
  /*
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
  */
