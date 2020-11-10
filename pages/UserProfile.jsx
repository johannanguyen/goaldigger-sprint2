import * as React from 'react';
import { clientSocket } from '../scripts/Socket';

export default function UserProfile() {
    const [users, setUsers] = React.useState([]);

    function getGoogleUserInfo() {
    React.useEffect(() => {
      clientSocket.on('google info received', (data) => {
        console.log("Received this google info from server: ", data);
        setUsers(data);
      });
    });
  }
  
  getGoogleUserInfo();
  
    return(
        <div className="root_container">
          <div className="content_container">
              <h2>User Profile</h2>
              
              {users["username"]} <br />
              
              <img src={users["image"]}></img> <br />
              
              USER ID: {users["user_id"]}
              
              <p>About Me, In-Progress Goals, Completed Goals, Groups</p>
          </div>
        </div>
    );
}
