import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LandingPage from './LandingPage';
import HomePage from './HomePage';
import GroupHome from './GroupHome'
import UserProfile from './UserProfile';
import AddGoal from './AddGoal';
import Category from '../components/Category';
import { clientSocket } from '../scripts/Socket';
import GroupPage from './GroupPage';
import Cookies from 'js-cookie';

export default function Content() {
  const [user, setUser] = useState({});
  const [goals, setGoals] = useState({});
  const [userGoals, setUserGoals] = useState([]);
  const [userGroupsNames, setUserGroupsNames] = useState([])
  const [uGroupsGoals, setUGroupsGoals] = useState([])
  const categories = ["Home", "Work", "School", "Exercise", "Food", "Art", "Lifestyle", "Finance", "Misc"];


  const updateGoal = (category) => {
    return (data) => (setGoals(
      (prev) => {
        prev[category] = data;
        return prev;
      })
    );
  }
  clientSocket.on("connect",()=>{
    if (Cookies.get("isLoggedIn")){
      Cookies.remove("isLoggedIn")
    }
    if (Cookies.get("user_id")){
      Cookies.remove("user_id")
    }
    if (Cookies.get("userObj")){
      Cookies.remove("userObj")
    }
  })

  useEffect(() => {
    clientSocket.on('google info received', (data) => {
      console.log('Google info received@Content: ', data);
      Cookies.set("user_id", data.primary_id)
      Cookies.set("userObj", data)
      setUser(data);
    });
  }, []);

 
  useEffect(() => {
    clientSocket.on('user goals', setUserGoals);
    return () => {
      clientSocket.off('user goals', setUserGoals);
    };
  });
  
  useEffect(()=>{
    clientSocket.on('user groups', (data)=>{
      console.log("users groups", data)
      setUserGroupsNames(data.user_groups_names)
      setUGroupsGoals(data.user_groups_goals)
    })
  })
  
  
  

  return (
    <Router>
      <Switch>
        <Route exact path="/"><LandingPage /></Route>
        <Route exact path="/add"><AddGoal user={user}/></Route>
        <Route exact path="/profile"><UserProfile goals={userGoals} user={user}/></Route>
        {categories.map((category) => {
          return (<Route exact path={`/${category.toLowerCase()}`}>
            <Category user={user} goals={goals} title={category} categories={categories}/>
          </Route>);
        })}
        <Route path="/landing"> <LandingPage /> </Route>
        <Route exact path="/groups"> <GroupHome gNames={userGroupsNames} gGoals={uGroupsGoals}/> </Route>
        <Route path="/groups/:groupName" component={GroupPage}/>
      </Switch>
    </Router>
  );
}