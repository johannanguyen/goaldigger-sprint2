import * as React from 'react';
import { clientSocket } from '../scripts/Socket';

export default function UserProfile() {
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
        </div>
      </div>
    </div>
  );
}