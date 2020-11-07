import React, { useState, useEffect } from 'react';
import { clientSocket } from './Socket';

export default function Content() {
    const [num_users, setNumUsers] = React.useState(0);
    
    useEffect(() => {
      clientSocket.on("new_user", num_users => {
      setNumUsers(num_users);
      console.log("Received something", num_users);
      });
    });
    
    return(
        <div>
            <h1>Exercise News Feed</h1>
            Num_users: {num_users}
        </div>
    );
}