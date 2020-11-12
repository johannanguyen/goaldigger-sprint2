import React, { useState, useEffect } from 'react';
import { clientSocket } from '../scripts/Socket';
import Fab from '@material-ui/core/Fab';

export default function UserProfile() {
<<<<<<< HEAD
    const [users, setUsers] = useState([]);
    const [goals, setGoals] = useState([]);
    const [progress, setProgress] = useState([]);

    useEffect(() => {
      clientSocket.on('google info received', (data) => {
        console.log("Received this google info from server: ", data);
        setUsers(data);
      });
    });
  
    useEffect(() => {
      clientSocket.on('goal_description', (data) => {
        console.log("Received goal info: ", data);
        setGoals(data);
      });
    });
  
    useEffect(() => {
      clientSocket.on('goal_progress', (data) => {
        console.log("Received goal info: ", data);
        setProgress(data);
      });
    });

  
    return(
        <div className="root_container">
          <div className="content_container">
              <h1>{users["username"]}</h1>
               <br />
              
              <img src={users["image"]}></img>
              <br />
              <br />
              
              <h3>Here's a list of my goals:</h3>

              <div className="goal_container">
                 { progress.map((data, index) => (
                  <div>
                      <b>{data}:</b> {goals[index]}
                      <br />
                  </div>)) }
              </div>
          </div>
          
          <div align="right">
              <Fab color="primary" size="small" style={{backgroundColor: "0e99b6"}}>
                +
              </Fab>
          </div>
=======
    const [user, setUser] = React.useState([]);
    const [goals, setGoals] = React.useState([]);
    const [progress, setProgress] = React.useState([]);

    function getGoogleUserInfo() {
      React.useEffect(() => {
        clientSocket.on("google info received", updateGoogleUserInfo)
        return () => {
          clientSocket.off("google info received", updateGoogleUserInfo)
        }
      })
    }
    
    function updateGoogleUserInfo(data) {
      setUser(data)
    }
  
    function getGoalInfo() {
      React.useEffect(() => {
        clientSocket.on('user goals', updateGoalInfo)
        return () => {
          clientSocket.off('user goals', updateGoalInfo)
        }
      })
    }
      
    function updateGoalInfo(data) {
      console.log("Received goal info: ", data)
      setGoals(data)
    }

  getGoogleUserInfo();
  getGoalInfo();
  
  return(
    <div className="root_container">
      <div className="content_container">
        <h1>{user["username"]}</h1>
        <br />
        
        <img src={user["image"]}></img>
        <br />
        <br />
        
        <h3>Here's a list of my goals:</h3>
        <div className="goal_container">
        { goals.map((data, index) =>
          <div>
            <b>{data.progress}:</b> {data.description}
            <br />
          </div>
        )}
>>>>>>> profile
        </div>
      </div>
    </div>
  );
}