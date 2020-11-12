import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//import * as React from 'react';

import LandingPage from './LandingPage';
import HomePage from  './HomePage';
import UserProfile from './UserProfile';
import AddGoal from './AddGoal';
import Exercise from '../scripts/Exercise';


export default function Content() {
    return (      
       <BrowserRouter>
        <div>
            <Switch>
            <Route path="/AddGoal" component={AddGoal}/>
            <Route path="/UserProfile" component={UserProfile}/>
            <Route path="/HomePage" component={HomePage}/>
            <Route path="/" component={LandingPage}/>
           </Switch>
        </div> 
      </BrowserRouter>
    );
    
}




/*
export default function Content() {
    
    return(
        <div>
            <LandingPage />
            <HomePage />
            <UserProfile />
            <AddGoal />
        </div>
    );
}
*/





/*
//import * as React from 'react';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//import * as ReactDOM from 'react-dom';


import LandingPage from './LandingPage';
import HomePage from  './HomePage';
import UserProfile from './UserProfile';
*/

/*
export default function Content() {
    //<HomePage />
    //<UserProfile />
    return(
        <div>
            <h1>THIS IS CONTENT</h1>
            <UserProfile />
        </div>
    );
}
// <Navigation />
*/

/*
export default function Content() {
    return (      
       <BrowserRouter>
        <div>
            <Switch>
            <Route path="/main" component={UserProfile}/>
            <Route path="/second" component={LandingPage}/>
            <Route path="/" component={HomePage}/>
           </Switch>
        </div> 
      </BrowserRouter>
    );
    
}
*/
