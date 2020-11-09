import * as React from 'react';
import { clientSocket } from '../scripts/Socket';

export default function UserProfile() {
    const [users, setUsers] = React.useState([]);

    function getGoogleUserInfo() {
    React.useEffect(() => {
      clientSocket.on('google info received', (data) => {
        console.log("Received this google info from server: ", data.allusers);
        setUsers(data['allusers']);
      });
    });
  }
  
  getGoogleUserInfo();
  
    return(
        <div>
            <h1>User Profile</h1>
            {
              users.map((data,index) => (
                <div key={index}>
                  <h2>Username {data["username"]}</h2>
                  <img src={data["img_url"]} alt="User PFP"/>
                </div>
              ))
            }
            <p>About Me, In-Progress Goals, Completed Goals, Groups</p>
        </div>
    );
}
