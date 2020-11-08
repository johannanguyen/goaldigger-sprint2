import * as React from 'react';
import { clientSocket } from '../scripts/Socket';

export default function UserProfile() {
    const [usernames, setUsernames] = React.useState([]);
    const [images, setImages] = React.useState([]);

    function getGoogleUserInfo() {
    React.useEffect(() => {
      clientSocket.on('google info received', (data) => {
        let allusernames = data['allusernames'];
        let allimages = data['allimages'];
        console.log("Received this google info from server, user: " + allusernames + "image: " + allimages);
        setUsernames(allusernames);
        setImages(allimages);
      });
    });
  }
  
    getGoogleUserInfo();
  
    return(
        <div>
            <h1>User Profile</h1>
            <div>
            <h2>Username {usernames} </h2>
            <img src={images} alt="User PFP"/>
            </div>
            <p>About Me, In-Progress Goals, Completed Goals, Groups</p>
        </div>
    );
}
