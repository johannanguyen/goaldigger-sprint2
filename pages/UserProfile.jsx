import * as React from 'react';

export default function UserProfile() {
    
    function ChangePage() {
        location.href="/" 
    }
    
    return(
        <div>
            <h1>User Profile</h1>
            <p>About Me, In-Progress Goals, Completed Goals, Groups</p>
            <button  onClick={ChangePage}>Go to the home page</button>
        </div>
    );
}
