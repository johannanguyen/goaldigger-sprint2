import * as React from 'react';
import { clientSocket } from '../scripts/Socket';

export default function UserProfile() {
    const [users, setUsers] = React.useState([]);
    const [goals, setGoals] = React.useState([]);
    const [progress, setProgress] = React.useState([]);

    function getGoogleUserInfo() {
    React.useEffect(() => {
      clientSocket.on('google info received', (data) => {
        console.log("Received this google info from server: ", data);
        setUsers(data);
      });
    });
  }
  
    function getGoalInfo() {
    React.useEffect(() => {
      clientSocket.on('goal_description', (data) => {
        console.log("Received goal info: ", data);
        setGoals(data);
      });
    });
  }
  
      function getProgressInfo() {
    React.useEffect(() => {
      clientSocket.on('goal_progress', (data) => {
        console.log("Received goal info: ", data);
        setProgress(data);
      });
    });
  }
  
  
  getGoogleUserInfo();
  getGoalInfo();
  getProgressInfo();
  
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
        </div>
    );
}