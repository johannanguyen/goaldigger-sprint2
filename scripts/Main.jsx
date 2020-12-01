import React from 'react';
import * as ReactDOM from 'react-dom';
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Content from '../pages/Content';

// ReactDOM.render(<LandingPage/>, document.getElementById('LandingPage'));
// ReactDOM.render(<UserProfile/>, document.getElementById('UserProfile'));
ReactDOM.render(<Content />, document.getElementById('Content'));
// ReactDOM.render(<HomePage/>, document.getElementById('HomePage'));
