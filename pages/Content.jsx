import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import LandingPage from './LandingPage';
import HomePage from './HomePage';
import UserProfile from './UserProfile';
import AddGoal from './AddGoal';

/*
import Work from './Work';
import School from './School';
import Exercise from './Exercise';
import Food from './Food';
import Art from './Art';
import Lifestyle from './Lifestyle';
import Finance from './Finance';
import Misc from './Misc';
*/

export default function Content() {
  
  function User() {
    const prof = document.getElementById('prof');
    const home = document.getElementById('home');
    const goal = document.getElementById('goal');
    
    prof.style.display = 'block';
    home.style.display = 'none'; 
    goal.style.display = 'none';
  }
  
  function Home() {
    const prof = document.getElementById('prof');
    const home = document.getElementById('home');
    const land = document.getElementById('land');
    
    prof.style.display = 'none';
    land.style.display = 'none';
    home.style.display = 'block'; 
  }
  
  function Goal() {
    const prof = document.getElementById('prof');
    const goal = document.getElementById('goal');
    
    prof.style.display = 'none';
    goal.style.display = 'block'; 
  }
  
  return (
    <div>
      {/*Home Page */}
      <button
            variant="contained"
            size="large"
            color="white"
            onClick={Home}
            style={{
              backgroundColor: '0e99b6', minHeight: '60px', minWidth: '170px', border: '1px solid white',
            }}
          >
            HomePage
      </button>
    
      {/*User Profile */}
      <button
          variant="contained"
          size="large"
          color="white"
          onClick={User}
          style={{
            backgroundColor: '0e99b6', minHeight: '60px', minWidth: '170px', border: '1px solid white',
          }}
        >
          User Profile
      </button>
      
      {/*Add Goal */}
      <button
          variant="contained"
          size="large"
          color="white"
          onClick={Goal}
          style={{
            backgroundColor: '0e99b6', minHeight: '60px', minWidth: '170px', border: '1px solid white',
          }}
        >
         Goal
      </button>
      
      
      <div id="land"> 
          <LandingPage />
      </div>
      
      <div id="home" style={{ display: 'none' }}>
        <HomePage />
      </div>
      
      
      <div id="prof" style={{ display: 'none' }}>
        <UserProfile />
       </div>
      
      <div id="goal" style={{ display: 'none' }}>
        <AddGoal />
      </div>
      
    </div>
  );
  
  
  
  /*
  return (
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
  );
  */
}