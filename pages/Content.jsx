
//import * as React from 'react';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//import * as ReactDOM from 'react-dom';


import LandingPage from './LandingPage';
import HomePage from  './HomePage';
import UserProfile from './UserProfile';
import Navigation from './Navigation';

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
*/


export default function Content() {
    return (      
       <BrowserRouter>
        <div>
          <Navigation />
            <Switch>
            <Route path="/main" component={UserProfile}/>
            <Route path="/second" component={LandingPage}/>
            <Route path="/" component={HomePage}/>
           </Switch>
        </div> 
      </BrowserRouter>
    );
    
}
