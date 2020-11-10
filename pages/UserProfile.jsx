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
        <div className="root_container">
          <div className="content_container">
              <h2>User Profile</h2>
              {
                users.map((data,index) => (
                  <div key={index}>
                    <b>Username {data["username"]}</b>
                    <img src={data["img_url"]} alt="User PFP"/>
                  </div>
                ))
              }
              <p>About Me, In-Progress Goals, Completed Goals, Groups</p>
          </div>
        </div>
    );
}
