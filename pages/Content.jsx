import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LandingPage from './LandingPage';
import HomePage from './HomePage';
import UserProfile from './UserProfile';
import AddGoal from './AddGoal';
import AddGroup from './AddGroup';
import Category from '../components/Category';
import { clientSocket } from '../scripts/Socket';
import GroupPage from './GroupPage';
import Cookies from 'js-cookie';

export default function Content() {
  const [user, setUser] = useState({});
  const [goals, setGoals] = useState({});
  const [userGoals, setUserGoals] = useState([]);
  const categories = ["Home", "Work", "School", "Exercise", "Food", "Art", "Lifestyle", "Finance", "Misc", "Groups"];


  const updateGoal = (category) => {
    return (data) => (setGoals(
      (prev) => {
        prev[category] = data;
        return prev;
      })
    );
  }

  useEffect(() => {
    clientSocket.on('google info received', (data) => {
      console.log('Received this in the add goal section: ', data);
      Cookies.set("user", data)
      Cookies.set("isLoggedIn", true)
      setUser(data);
    });
  }, []);

 
  useEffect(() => {
    clientSocket.on('user goals', setUserGoals);
    return () => {
      clientSocket.off('user goals', setUserGoals);
    };
  });
  
  
  
  
   function makeComplete(task) {
    //send index thorugh socket run alter table querary on backend where id = index
    clientSocket.emit('new complete input', {
      completion: task, // sends pName to socket
    });
    event.preventDefault();
    console.log(task);
  };

  function makeDelete(task) {
    clientSocket.emit('new delete input', {
      deletion: task, // sends pName to socket
    });
    event.preventDefault();
    console.log(task);
  };
  
  function Heart(task) {
    clientSocket.emit('new hearts input', {
      heart: task, // sends pName to socket
    });
    event.preventDefault();
    console.log(task);
  };
  
  function Smiley(task) {
    clientSocket.emit('new smileys input', {
      smiley: task, // sends pName to socket
    });
    event.preventDefault();
    console.log(task);
  };
  
  function Thumb(task) {
    clientSocket.emit('new thumbs input', {
      thumb: task, // sends pName to socket
    });
    event.preventDefault();
    console.log(task);
  };
  
  

  return (
    <Router>
      <Switch>
        <Route exact path="/"><LandingPage /></Route>
        <Route exact path="/add"><AddGoal user={user}/></Route>
        <Route exact path="/addgroup"><AddGroup /></Route>
        <Route exact path="/profile"><UserProfile goals={userGoals} user={user}/></Route>
        {categories.map((category) => {
          return (<Route exact path={`/${category.toLowerCase()}`}>
            <Category user={user} goals={goals} title={category} categories={categories}/>
          </Route>);
        })}
        <Route path="/landing"> <LandingPage /> </Route>
        <Route path="/:groupName" component={GroupPage}/>
      </Switch>
    </Router>
  );
}