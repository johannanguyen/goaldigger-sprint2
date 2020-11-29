import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


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
  
  //will put landingpage code directly into content.jsx then check if it is visible or not, 
  //depending on that will depend on wheter or not to display the homepage
  
  return (
    <div>
    
      {/*Landing Page*/}
      <div id="land"> 
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
          <LandingPage />
      </div>
      
      {/*Home Page */}
      <div id="home" style={{ display: 'none' }}>
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
        <HomePage />
      </div>
      
      {/*User Profile */}
      <div id="prof" style={{ display: 'none' }}>
        <button
          variant="contained"
          size="large"
          color="white"
          onClick={Home}
          style={{
            backgroundColor: '0e99b6', minHeight: '60px', minWidth: '170px', border: '1px solid white',
          }}
        >
         Home
        </button>
        
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
        
        <UserProfile />
       </div>
      
      {/*Add Goal*/}
      <div id="goal" style={{ display: 'none' }}>
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