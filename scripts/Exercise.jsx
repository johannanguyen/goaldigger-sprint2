import React, { useState, useEffect } from 'react';
import { clientSocket } from './Socket';

export default function Exercise() {
    
    return(
        <div>
            <h1>Exercise News Feed</h1>
            <p>List of goals only dealing with Exercise</p>
        </div>
    );
}