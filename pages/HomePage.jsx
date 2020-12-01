import React, { useState, useEffect } from 'react';
//import { CategoryButton } from '../scripts/CategoryButton'
//import { SelectedButton } from '../scripts/SelectedButton'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { clientSocket } from '../scripts/Socket';
import { GoogleOut } from '../scripts/GoogleLogout';
import ScrollToBottom from 'react-scroll-to-bottom';

import Work from './Work';
import School from './School';
import Exercise from './Exercise';
import Food from './Food';
import Art from './Art';
import Lifestyle from './Lifestyle';
import Finance from './Finance';
import Misc from './Misc';


export default function HomePage() {
  const [goals, setGoals] = useState([]);
  const [user, setUser] = useState({});

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 150,
    },
  }));
  
  function getGoals(){
    React.useEffect(() => {
      clientSocket.on('homepage', updateGoals)
      return () => {
        clientSocket.off('homepage', updateGoals)
      }
    })
  }
  
  function updateGoals(data) {
    setGoals(data)
  }
  
  function getGoogleUserInfo() {
    React.useEffect(() => {
      clientSocket.on('google info received', (data) => {
        console.log('Received this in the add goal section: ', data);
        setUser(data);
      });
    });
  }
  getGoogleUserInfo();
  getGoals();
  
  
  
  function Master() 
  {
    const homepage = document.getElementById('head');
    const button = document.getElementById('homebutton');
    const workpage = document.getElementById('work');
    const schoolpage = document.getElementById('school');
    const exercisepage = document.getElementById('exercise');
    const foodpage = document.getElementById('food');
    const artpage = document.getElementById('art');
    const lifepage = document.getElementById('life');
    const financepage = document.getElementById('finance');
    const miscpage = document.getElementById('misc');
    
    const pages = [homepage, button, workpage, schoolpage, exercisepage, foodpage, artpage, lifepage, financepage, miscpage];
    var i;
    for (i = 0; i < pages.length; i++) 
    {
      if (pages[i].style.display == 'block') 
      {
        pages[i].style.display = 'none';
      }
    }
  }
  
  function HomePage() {
    const homepage = document.getElementById('head');
    Master();
    homepage.style.display = 'block';
  }
  
  function WorkPage() {
    const homepage = document.getElementById('head');
    const button = document.getElementById('homebutton');
    const workpage = document.getElementById('work');
    
    Master();
    homepage.style.display = 'none';
    button.style.display = 'block';
    workpage.style.display = 'block'; 
  }
  
  function SchoolPage() {
    const homepage = document.getElementById('head');
    const button = document.getElementById('homebutton');
    const schoolpage = document.getElementById('school');
    
    Master();
    homepage.style.display = 'none';
    button.style.display = 'block';
    schoolpage.style.display = 'block'; 
  }
  
  function ExercisePage() {
    const homepage = document.getElementById('head');
    const button = document.getElementById('homebutton');
    const exercisepage = document.getElementById('exercise');
    
    Master();
    homepage.style.display = 'none';
    button.style.display = 'block';
    exercisepage.style.display = 'block'; 
  }
  
  function FoodPage() {
    const homepage = document.getElementById('head');
    const button = document.getElementById('homebutton');
    const foodpage = document.getElementById('food');
    
    Master();
    homepage.style.display = 'none';
    button.style.display = 'block';
    foodpage.style.display = 'block'; 
  }
  
  function ArtPage() {
    const homepage = document.getElementById('head');
    const button = document.getElementById('homebutton');
    const artpage = document.getElementById('art');
    
    Master();
    homepage.style.display = 'none';
    button.style.display = 'block';
    artpage.style.display = 'block'; 
  }
  
  function LifestylePage() {
    const homepage = document.getElementById('head');
    const button = document.getElementById('homebutton');
    const lifepage = document.getElementById('life');
    
    Master();
    homepage.style.display = 'none';
    button.style.display = 'block';
    lifepage.style.display = 'block'; 
  }
  
  function FinancePage() {
    const homepage = document.getElementById('head');
    const button = document.getElementById('homebutton');
    const financepage = document.getElementById('finance');
    
    Master();
    homepage.style.display = 'none';
    button.style.display = 'block';
    financepage.style.display = 'block'; 
  }
  
  function MiscPage() {
    const homepage = document.getElementById('head');
    const button = document.getElementById('homebutton');
    const miscpage = document.getElementById('misc');
    
    Master();
    homepage.style.display = 'none';
    button.style.display = 'block';
    miscpage.style.display = 'block'; 
  }
  

  return (
    <div>
      <div className="root_container">
        <GoogleOut/>
        <div className="category_menu">
          <br />
        
        {/*back to home catagory*/}  
        <button
          id="homebutton"
          variant="contained"
          size="large"
          color="primary"
          onClick={HomePage}
          style={{
            display: 'none', backgroundColor: '0e99b6', minHeight: '60px', minWidth: '170px', border: '1px solid white',
          }}
        >
          Home
        </button>
        
        {/*Work*/}  
        <button
          variant="contained"
          size="large"
          color="primary"
          onClick={WorkPage}
          style={{
            backgroundColor: '0e99b6', minHeight: '60px', minWidth: '170px', border: '1px solid white',
          }}
        >
         Work
        </button>
        
        {/*School*/}  
        <button
          variant="contained"
          size="large"
          color="primary"
          onClick={SchoolPage}
          style={{
            backgroundColor: '0e99b6', minHeight: '60px', minWidth: '170px', border: '1px solid white',
          }}
        >
         School
        </button>
        
        {/*Exercise*/}  
        <button
          variant="contained"
          size="large"
          color="primary"
          onClick={ExercisePage}
          style={{
            backgroundColor: '0e99b6', minHeight: '60px', minWidth: '170px', border: '1px solid white',
          }}
        >
         Exercise
        </button>
        
        {/*Food*/}  
        <button
          variant="contained"
          size="large"
          color="primary"
          onClick={FoodPage}
          style={{
            backgroundColor: '0e99b6', minHeight: '60px', minWidth: '170px', border: '1px solid white',
          }}
        >
         Food
        </button>
        
        {/*Art*/}  
        <button
          variant="contained"
          size="large"
          color="primary"
          onClick={ArtPage}
          style={{
            backgroundColor: '0e99b6', minHeight: '60px', minWidth: '170px', border: '1px solid white',
          }}
        >
         Art
        </button>
        
        {/*Lifestyle*/}  
        <button
          variant="contained"
          size="large"
          color="primary"
          onClick={LifestylePage}
          style={{
            backgroundColor: '0e99b6', minHeight: '60px', minWidth: '170px', border: '1px solid white',
          }}
        >
         Lifestyle
        </button>
        
        {/*Finance*/}  
        <button
          variant="contained"
          size="large"
          color="primary"
          onClick={FinancePage}
          style={{
            backgroundColor: '0e99b6', minHeight: '60px', minWidth: '170px', border: '1px solid white',
          }}
        >
         Finance
        </button>
        
        {/*Misc*/}  
        <button
          variant="contained"
          size="large"
          color="primary"
          onClick={MiscPage}
          style={{
            backgroundColor: '0e99b6', minHeight: '60px', minWidth: '170px', border: '1px solid white',
          }}
        >
         Misc
        </button>
        
        {/*Groups*/}  
        <button
          variant="contained"
          size="large"
          color="primary"
          //onClick={WorkPage}
          style={{
            backgroundColor: '0e99b6', minHeight: '60px', minWidth: '170px', border: '1px solid white',
          }}
        >
         Groups
        </button>
          
          {/*
          <SelectedButton category="Home" />
          <CategoryButton category="Work"click="WorkPage"/>
          <CategoryButton category="School" />
          <CategoryButton category="Exercise" />
          <CategoryButton category="Food" />
          <CategoryButton category="Art" />
          <CategoryButton category="Lifestyle" />
          <CategoryButton category="Finance" />
          <CategoryButton category="Misc" />
          <CategoryButton category="Groups" />
          */}
        </div>
        
        <div id="head">
          <div className="header_menu">
            <h2>Home</h2>
            
            <Avatar src={user.image} />
          </div>
    
          <div className="homepage_container">
            <ScrollToBottom>
            { goals.map((data, index) => (
              <div>
                <Avatar src={data.img_url} />
    
                {data.name}
                {' '}
                {data.progress}
                {' '}
                a goal in
                {' '}
                <b>{data.category}</b>
                :
                {' '}
                {data.description}
                <br />
                "
                {data.post_text}
                "
              </div>
            )) }
            </ScrollToBottom>
          </div>
        </div>
      
      
        <div id="work" style={{ display: 'none' }}>
          <Work />
        </div>
        
        <div id="school" style={{ display: 'none' }}>
          <School />
        </div>
        
        <div id="exercise" style={{ display: 'none' }}>
          <Exercise />
        </div>
        
        <div id="food" style={{ display: 'none' }}>
          <Food />
        </div>
        
        <div id="art" style={{ display: 'none' }}>
          <Art />
        </div>
        
        <div id="life" style={{ display: 'none' }}>
          <Lifestyle />
        </div>
        
        <div id="finance" style={{ display: 'none' }}>
          <Finance />
        </div>
        
        <div id="misc" style={{ display: 'none' }}>
          <Misc />
        </div>
        {/*
        <div id="groups">
          <Groups />
        </div>
        */}
      </div>
      
      
    </div>
  );
}
