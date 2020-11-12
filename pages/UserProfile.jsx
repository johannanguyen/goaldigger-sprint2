import React, { useState, useEffect } from 'react';
import { clientSocket } from '../scripts/Socket';
import Fab from '@material-ui/core/Fab';

export default function UserProfile() {
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
        </div>
    );
}